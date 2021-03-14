<?php

namespace App\Http\Controllers;

use App\Events\UserCounter;
use App\NotifCounter;
use App\Notification;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationModelController extends Controller
{

    function __construct()
    {
        $this->middleware('auth');
    }

    protected $LoggedIn = 0;

    public function showNotifications(Request $request){

        $this->setId();

        if($this->LoggedIn == 0) return response()->json($this->error('Unauthorized Request'));

        $mNotifications = Notification::all()
                                            ->sortByDesc('notif_holder_id')
                                            ->where('owner_id', $this->LoggedIn);

        if($mNotifications->count() == 0) return response()->json([
            'error'     => false,
            'notifs'    => false,
            'list'      => false,
            'message'   => 'Your Notifications Will Appear Here, You Have No Notifications At The Moment!'
        ]);

        return response()->json($this->buildHolderNotifications($mNotifications->toArray()));

    }

    public function buildNotificationCounts(){

        $this->setId();

        if($this->LoggedIn == 0) return response()->json($this->error('Unauthorized Request'));

        $mNotifications = Notification::all()
                                            ->where('owner_id', $this->LoggedIn)
                                            ->where('seen', '=','0');

        return ['count' => $mNotifications->count()];


    }


    /**n_counter_id
     *
     * All Methods Below Are Helper Methods.
     * They Don't Interact With Requests Directly Only When Called Within Methods
     * That Are Defined In The api.php Routes File!
     * Essentially This Methods Are The Brains Behind The Responses Given To The
     * Requests
     *
     *****************************************************************************/

    protected function buildHolderNotifications(array $Notifications){

        /*
         * For This Method, There Will Have To Be Notifications!
         * */
        $response['notifs']     = true;
        $response['error']      = false;
        $response['message']    = "Here Are Your Notifications";

        /*
         * Iterate Through All Notifications
         * */
        foreach ($Notifications as $notification){

            $mNotification = new Notification($notification);

            $response['notifications'][] = $this->ModelNotificationHolder($mNotification);

        }

        $response['list'] = empty($response['notifications']) ? false : true;

        /*
         * Return All Notifications!
         * */
        return $response;

    }

    protected function builderCounterNotifications(array $NotifCounters){

        $response = [];

        foreach ($NotifCounters as $notifCounter){

            $response['notif_counters'][] = $this->ModelNotificationCounter(new NotifCounter($notifCounter));

        }

        /*
         * return Modelled Response
         * */
        return $response;

    }

    protected function ModelNotificationCounter(NotifCounter $mNotifCounter){

        return [

            /*
             * Model User Data!
             * */
            'user_info'         => (new UserModelController)->buildUser($mNotifCounter->user_id),

            /*
             * Model Notification Counter!
             * */
             'notif_counter'    => [
                 'user_id'          => $mNotifCounter->user_id,
                 'post_id'          => $mNotifCounter->post_id,
                 'type'             => $mNotifCounter->type,
                 'notif_counter_id' => $mNotifCounter->n_counter_id
             ]


        ];

    }

    protected function ModelNotificationHolder(Notification $mNotification){

        $counter = 0;
        $respCounter = null;
        $respShared  = null;

            switch ($mNotification->notif_type){

                case 'like'     :
                case 'comment'  :

                    /*
                     * Get All Users Who Like|Commented On The Post Or Comment!
                     * */
                    $mNotifCounter = NotifCounter::all()
                        ->where('user_id', $this->LoggedIn)
                        ->where('post_id', $mNotification->post_id)
                        ->where('type', $mNotification->type)
                        ->sortByDesc('n_counter_id');

                    $counter = $mNotifCounter->count();

                    if($counter > 0){

                        $respCounter = $this->builderCounterNotifications($mNotifCounter->toArray());

                    }

                  break;

                case 'share'    :

                    /*
                     * Get The New Shared Post
                     * */
                    $mPost = Post::all()
                                    ->where('shared_from_id', $mNotification->post_id)
                                    ->where('user_id', $mNotification->user_id);

                    if($mPost->count() == 1){

                        $respShared = (new PostModelController())->makePostModel($mPost->first());

                    }

                  break;

                default        :
                    break;


            }

            /*
             * Model The Returned Notifications Data Individually And Dynamically
             * */

        return [

            /*
             * Get User Data
             * */
            'info'          => (new UserModelController)->buildUser($mNotification->user_id),

            /*
             * Model Notification!
             * */
            'notif_holder'  => [

                'user_id'           => $mNotification->user_id,
                'post_id'           => $mNotification->post_id,
                'owner_id'          => $mNotification->owner_id,
                'notif_type'        => $mNotification->notif_type,
                'seen'              => $mNotification->seen,
                'type'              => $mNotification->type,
                'notif_holder_id'   => $mNotification->notif_holder_id

            ],

            'count'             => $counter,
            'notif_extra_type'  => $mNotification->notif_type,
            'notif_extras'      => $respCounter,

            /*
             * Share Post
             * */
            'notif_share_post'  => $respShared,

            /*
             * Original Post That The Notification Was Done On!
             * */
            'notif_post'        => $mNotification->post_id == 0 ? null : (new PostModelController)->getSinglePost($mNotification->post_id)

        ];

    }

    protected function setId(){

        $this->LoggedIn = (new AuthController)->authenticate();

    }

    protected function error($e){

        /*
         * Handle And Return All Generic Errors
         * */
        return [
            'error'     => true,
            'message'   => $e
        ];

    }

    /**
     *
     * Methods That Follow Are For Adding Notifications!
     *
     ****************************************************************/

    public function addLikePostNotification($postId){

        $this->setId();

        $mPost = Post::all()
                            ->where('media_id', $postId);

        if($mPost->count() == 0) return 0;

        $mPost = $mPost->first();

        /*
         * Check For Notification If Exists In Holder Table
         * */
        $mNotification = Notification::all()
                                    ->where('post_id', $mPost->media_id)
                                    ->where('owner_id', $mPost->user_id)
                                    ->where('notif_type', 'like');

        $newNotif = [
            'user_id'       => $this->LoggedIn,
            'post_id'       => $mPost->media_id,
            'owner_id'      => $mPost->user_id,
            'notif_type'    => 'like',
            'seen'          => 0,
            'type'          => $mPost->type,
            'notif_holder_id'=> null
        ];

        if($mNotification->count() == 0){

            /*
             * Doesn't Exist In Holder, Add Notification
             * */

            $this->insertNotification($newNotif);

        }else{

            if(DB::table('notif_holder')
                                    ->where('post_id', $mPost->media_id)
                                    ->where('owner_id', $mPost->user_id)
                                    ->where('notif_type', 'like')
                                    ->delete() == 1){

                $this->insertNotification($newNotif);

            }else{

                return 0;

            }

        }

    }

    public function addMentionedNotification($postId, $type){

        $this->setId();

        $mPost = Post::all()->where('media_id', $postId);

        if($mPost->count() == 0) return 0;

        $mPost = $mPost->first();

        if(empty($mPost->text)) return 0;

            $postTexts = explode(' ', $mPost->text);
            $userId = 0;

            foreach ($postTexts as $text){

                if(substr($text, 0, 1) == '@'){

                    $mUser = User::all()->where('user_athandle', substr($text, 1));

                    if($mUser->count() != 1) continue;

                    $this->insertNotification([
                        'user_id'       => $this->LoggedIn,
                        'post_id'       => $mPost->media_id,
                        'owner_id'      => $mUser->first()->user_id,
                        'notif_type'    => $type,
                        'seen'          => 0,
                        'type'          => 'account',
                        'notif_holder_id'=> null
                    ]);

                }

            }
    }

    public function addSharedPostNotification($postId){

        $this->setId();

        $mPost = Post::all()
                            ->where('media_id', $postId);

        if($mPost->count() == 0) return 0;

        $mPost = $mPost->first();

        $this->insertNotification([
            'user_id'       => $this->LoggedIn,
            'post_id'       => $mPost->media_id,
            'owner_id'      => $mPost->user_id,
            'notif_type'    => 'share',
            'seen'          => 0,
            'type'          => $mPost->type,
            'notif_holder_id'=> null
        ]);

    }

    public function addFollowNotification($userId, $type){

        $this->setId();

        $this->insertNotification([
            'user_id'       => $this->LoggedIn,
            'post_id'       => 0,
            'owner_id'      => $userId,
            'notif_type'    => $type,
            'seen'          => 0,
            'type'          => 'account',
            'notif_holder_id'=> null
        ]);

    }

    public function addCommentedNotification($userId, $postId){

        $this->setId();

        $this->insertNotification([
            'user_id'       => $this->LoggedIn,
            'post_id'       => $postId,
            'owner_id'         => $userId,
            'notif_type'    => 'comment',
            'seen'          => 0,
            'type'          => Post::all()->where('media_id', $postId)->first()->type,
            'notif_holder_id'=> null
        ]);

    }

    public function insertNotification(array $NotificationItem){

        (new Notification($NotificationItem))->save();

        (new NotifCounter([
            'user_id'       => $NotificationItem['user_id'],
            'post_id'       => $NotificationItem['post_id'],
            'type'          => $NotificationItem['type'],
            'n_counter_id'  => null
        ]))->save();

        event(new UserCounter(auth()->user()));

    }

}
