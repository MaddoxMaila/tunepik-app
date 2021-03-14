/*

   Javascript Frame To Make Coding In Javascript Easier

*/


  // Class To Handle All Network Connections
  class Http {

    // Define Class Constructor
    __constructor(){

      this.xhr = null;
      this.form = null;
      this.url = null;
      this.method = null;

    } // End OF Constructor


    // Method For Setting Class Variables
    set(method, url, form){

      this.method = method;
      this.url = url;
      this.form = form;
      this.xhr = new XMLHttpRequest();

      return this;
    } // End Of Set

    requestAbort(callback){

      this.xhr.abort();

      callback();

    }

    progressbar(args){

      var progress = 0;
      this.xhr.upload.onprogress = (e) => {

        var done = e.position || e.loaded, total = e.totalSize || e.total;

        progress = (Math.floor(done / total * 1000) / 10 );

        args.progressCall({size : progress});

      } // End Of Arrow Function

    } // End Of ProgressBar

    getNetMessage(text){
      return `<center>${Icons.noNetwork({color : '', width : 30, height : 30})}<br /><span class="app-max-text">${text}</span></center>`;
    }

    // Method For Sending The Actual Request, Accepts A Callback Function And A Tag For Progress Bar
    request(callback, args){

      var self = this;

      let eMessage = '';

      let xhrError = {

         error : true,
         message : ``

       }

       // Check If Online By The Time Of API Request

       /*if(!window.navigator.onLine){

          eMessage = `No Internet Connection`;
          xhrError.message = this.getNetMessage(eMessage);

          // callback(JSON.stringify(xhrError));

          // return;

       }*/

      // Handle Error That May Arise
       try {

         self.xhr.onreadystatechange = () => {

            if(self.xhr.readyState == 4){

              switch (self.xhr.status) {

                case 200 :

                   // On Successful API response

                   callback(self.xhr.responseText);

                  break;

                case 500 :
                case 501 :
                case 502 :
                case 503 :

                    // On Server Side Errors

                    xhrError.message = `<span class="app-grey-text-lg">Opps, Error Encountered On Our Side, Our Engineerers Are On It!</spa>`

                    callback(JSON.stringify(xhrError));

                  break;

                default :

                  // Catch All Other Errors Under One Umbrella

                   eMessage = `Slow Internet Connection, Request Timed Out`;
                   xhrError.message = this.getNetMessage(eMessage);

                   // On UnSuccessful API response, Like TimeOut Or OTHER Error Statuses

                   callback(JSON.stringify(xhrError));

                  break;

              } // End Of Switch

            } // End Of If

         } // End Of Arrow Function

         if(args.need_progress_bar){

           self.progressbar(args);

         }

         self.xhr.open(self.method, self.url, true);

         if(localStorage.getItem('key') != null){

           self.xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('key')}`);

         }

         self.xhr.setRequestHeader('X-CSRF-TOKEN', $.get('.app-token').getAttribute('content'))
         self.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
         self.xhr.send(self.form);

       } catch(e) {

         // statements
         console.log(e);

         xhrError.message = 'Encountered An Error Displaying This Page : ' + e.toString();

         callback(JSON.stringify(xhrError));

       } // End OF Try-Catch

    } // End Of Request Method

  } // End Of Class

  // Class To Easily Access And Create HTML Tags With Added Attributes In Javascript

  class Element{

    // Class Constructor
    constructor(dom){

      this.dom = dom;

      this.isMobile = (screen.width > 699) ? false : true;

    } // End Of Constructor

    // For Getting An Element
    get(identifiier){

      return document.querySelector(identifiier);

    } // End Of get()

    // For Getting Elements Of The Same Identifier
    gets(identifier){

       return document.querySelectorAll(identifier);

    } // End Of gets()

    getAll(identifier){
      return document.querySelectorAll(identifier);
    }

    // Gets Value Of A Field
    value(identifier){

       return this.get(identifier).value;

    } // End Of val()

    val(identifier, value){

      this.get(identifier).value = value;

    }


    span(args){

      let span = this.create('span', args.class);

      span.innerHTML = args.text;

      return span;

    }

    center(obj){

      let center = this.create('center', '');

      center.append(obj);

      return center;
    }

    // For Writing Inside HTML tags
    html(identifier, content){

       this.get(identifier).innerHTML = content;

    } // End Of html()

    removeLoader(){

      this.get('.req-loader').remove();

    }

    addLoader(args){
      let wrapper = this.create('div', 'req-loader');
      let center = this.create('center', 'load-center');
      let Loader = this.create('div', 'app-loader');



      center.appendChild(Loader);
      wrapper.append($.create('div', 'space-small'), center);

      if(args.elem){

        args.elem.append(wrapper);

        return;

      }


      if(args.logo){

        wrapper.append($.create('div', 'space-medium'), Icons.TunePikLogo({
          view : args.view,
          width : 150,
          height : 40,
          return : true
        }));

        wrapper.append($.create('div', 'space-large'));

      }

      this.get(args.view).append(wrapper);

    } // End Of Loader



    req(args, callback){

      HTTP.set(args.method, args.url, args.form).request((response) => {

        try {

            callback(JSON.parse(response));

        } catch(e) {

           this.toast({text : e.toString(), time : 4000});
           console.log(e);

        }

      }, args.bar);

    }

    tooltip(args){

      this.get(arg.obj).setAttribute('data-toggle', 'tooltip');

      this.get(args.obj).setAttribute('title',args.title);

    } // End Of Tool Tip

    toast(args){

      this.html('.toast-text', args.text);
      this.get('.app-toast').style.display = 'block';

      // Clear The Toast After 3000ms, 1000ms = 1s
      setTimeout(

        () => {

         this.get('.app-toast').style.display = 'none';

      },
      args.time);

    } // End of toast()

    // For Creating Element And Its Class
    create(name, classes){

       let Tag = document.createElement(name);

       Tag.setAttribute('class', classes);

       return Tag;

    } // End Of element()

  } // End Of Class


  /******************************************************************************************************************************************
  *
  *                         Class Data Models
  *
  *********************************************************************************************************************************************/

 class UserModel{

   // Constructor

   constructor(args){

    if(args.toString().length == 0){
      return
    }
    this.basic = {

       name   : args.basic_info.user_name,
       handle : args.basic_info.user_athandle,
       email  : args.basic_info.user_email,
       id     : args.basic_info.user_id,
       date   : args.basic_info.user_date,
       hasFace: args.basic_info.has_face_map,
       url    : `${DOMAIN}${args.basic_info.user_athandle}`

      } // Basic User Info

    this.info = {

        bio      : args.info.bio,
        color    : args.info.color,
        location   : args.info.res,
        course   : args.info.course,
        place    : args.info.frequent_place, // Frequent Place
        verified : args.info.verified
        
      } // User Biography Info

    this.images = {

      profile : args.images.profileImg,
      cover   : args.images.coverImg

    }

    this.activity = {

      me        : args.activity.me, // Boolean
      following : args.activity.following, // Boolean
      followers : args.activity.followers,
      follows   : args.activity.follows,
      blocked   : args.activity.blocked, // Boolean
      youBlock  : args.activity.you_blocked // Boolean

     } // User's Activity In The App

    this.media = {

      count  : args.media.totCount,
      images : args.media.imgCount,
      videos : args.media.vidCount,
      audios : args.media.audCount

    }

   } // End Of Constructor

   getBasic(){ return this.basic; }
   getInfo(){ return this.info; }
   getImgs(){ return this.images; }
   getMedia(){ return this.media; }
   getActivity(){ return this.activity; }

} // End Of Class

class HashTags {

  constructor(args){

    this.hash = {

      count : args.trend_count,
      hash  : args.trend_hash,
      message : args.message

    }

  } // End Of Constructor

  getHash(){ return this.hash; } // End Of getHash

} // End HashTags

class UserAnalytics extends UserModel {

  constructor(args /* For Analytics */, mUserModel){

    super(mUserModel);

    this.media_interaction = {

      wallVisits : args.profile_visits,
      videoPlays : args.video_plays,
      audioPlays : args.audio_plays

    }

    this.theme = {

      hasTheme : args.has_theme,
      theme    : args.theme_data == "" ? {} : args.theme_data.posts[0]

    }

    this.hashes = {

      hashes : args.user_trending

    }

  } // End Of Constructor

  getHashes(){ return this.hashes; } // End Of Get Hashes
  getTheme(){ return this.theme; } // End Of Get Stats

  getMediaInteraction(){ return this.media_interaction; } // End Of Media Interaction

} // End Of UserAnalytics

class PostModel extends UserModel{
  // Constructor
  constructor(args){

    //this.user = new UserModel(args.user); // Create User Object

    super(args.user);

    this.post = {

      id   : args.post.media_id,
      url  : args.post.media_url,
      thumbUrl : args.post.thumbnail_url,
      type : args.post.type,
      date : args.post.media_date,
      time : args.post.media_time,
      now  : args.post.now,
      appName : args.post.app_name,
      text : args.post.text

    }

    this.post_data = {

      comCount   : args.commentCount,
      likeCount  : args.likesCount,
      isLiked    : args.isLiked,
      isCommented: args.is_commented,
      isShared   : args.is_shared,
      likedBy    : {

        follow   : args.liked_by == "" ? "" : args.liked_by.follow,
        user     : args.liked_by == "" ? "" : new UserModel(args.liked_by.user)

      },
      views      : args.views,
      isOriginal : args.is_original_post

    }

    this.shared_post = {

      list  : args.is_original_post,
      model : args.is_original_post ? "" : new PostModel(args.original_post)

    }

    this.comment = {

      has     : args.comments.list,
      comment : args.comments.list ? new CommentModel(args.comments) : []

    }

  } // End Of Constructor

  getPost(){ return this.post; }
  getStats(){ return this.post_data; }
  getShare(){ return this.shared_post; }
  getComment(){ return this.comment; }

  setStats(args){

    this.post_data = {

      comCount  : args.commentCount,
      likeCount : args.likesCount,
      isLiked   : args.isLiked,
      views     : args.views

    }

  }

} // End Of Class

class NotificationModel extends UserModel{

  constructor(args){

    super(args.info);

    this.notif = {

       userId    : args.notif_holder.user_id,
       postId    : args.notif_holder.post_id,
       ownerId   : args.notif_holder.owner_id,
       notifType : args.notif_holder.notif_type,
       seen      : args.notif_holder.seen,
       type      : args.notif_holder.type,
       notifId   : args.notif_holder.notif_holder_id,
       count     : args.count

    }

    this.extras = {

      post        : args.notif_post ? new globs.model.post(args.notif_post) : null,
      sharedPost  : args.notif_share_post ? new globs.model.post(args.notif_share_post) : null,
      extraType   : args.notif_extra_type,


    }

  } // End Of Constructor

  setSeen(){

  }

  getNotification(){ return this.notif; }

  getExtra(){ return this.extras }

} // End Of Class

class CommentModel extends UserModel{

  constructor(args){

     super(args.user_info);

     this.comment = {

        id     : args.comment_info.comment_id,
        postId : args.comment_info.post_id,
        userId : args.comment_info.user_id,
        text   : args.comment_info.comment_text,
        url    : args.comment_info.comment_url,
        thumbUrl : args.comment_info.thumbnail_url,
        date   : args.comment_info.comment_date,
        time   : args.comment_info.comment_time,
        now    : args.comment_info.now,
        appName : args.comment_info.app_name,
        type   : args.comment_info.comment_type

     }

     this.stats = {

        views    : 0,
        comCount : 0,
        isLiked   : args.isLiked,
        likeCount : args.likesCount

     }

  } // End Of Constructor

  getPost(){ return this.comment; }
  setStats(args){}
  getStats(){ return this.stats; }

} // End Of Class

class ChatsModel extends UserModel {

  constructor(args){

     super(args.user_info);

     this.chat = {

      message : args.chat.message,
      seen    : args.chat.seen,
      count   : args.chat.count == 0 ? "" : args.chat.count,
      id      : args.chat.chat_id,
      now     : args.chat.now,
      time    : args.chat.time,
      date    : args.chat.date,
      type    : args.chat.type

     }

  } // End OF Constructor

  getChat(){ return this.chat; }

} // End Of Class

class MessagesModel extends UserModel {

  constructor(args){

    super(args.user_info);

    this.message = {

      id      : args.message.msg_id,
      idOne   : args.message.user_id_one,
      idTwo   : args.message.user_id_two,
      date    : args.message.msg_date,
      time    : args.message.msg_time,
      now     : args.message.now,
      message : args.message.message,
      url     : args.message.url,
      type    : args.message.type,
      seen    : args.message.seen

    }

    this.post = {
      text    : args.message.message,
      url     : args.message.url,
      type    : args.message.type.toString().trim(),
    }

  } // End Of Constructor

  getMessage(){ return this.message; }

  getPost(){ return this.post; }

} // End Of Class

function response(response){

  if(response.request.readyState == 4){

      switch (response.request.status) {

        case 200 :

           // On Successful API response

            return response.data;

          break;

        case 500 :
        case 501 :
        case 502 :
        case 503 :

            // On Server Side Errors
            return {

              error   : true,
              message : `Opps, We've Encountered An Error From Our Side... Our Engineerers Are On It!
`
            }

          break;

        default :

          // Catch All Other Errors Under One Umbrella
          // On UnSuccessful API response, Like TimeOut Or OTHER Error Statuses

          return {

              error   : true,
              message : `Opps, You Might Want To Check Your Internet Connection!`

            }

          break;

      } // End Of Switch

    } // End Of If

}


class Timer{

  time(args){

    let minutes = Math.floor(args.currentTime / 60); // Get Minutes, Divide By 60s
    let seconds = Math.floor(args.currentTime - ( minutes * 60)); // Get Seconds Left, Multiply By 60s

    if(minutes < 10 && seconds < 10 ){

       args.view = `0${minutes}:0${seconds}`;

    }else if(minutes < 10 && seconds >= 10 ){

      args.view = `0${minutes}:${seconds}`;

    }else if(minutes >= 10 && seconds < 10 ){

      args.view = `${minutes}:0${seconds}`;

    }else if(minutes >= 10 && seconds >= 10){

      args.view = `${minutes}:${seconds}`;

    } // Zeroed Ended If

  }

}



 const HTTP = new Http();
  // const DOM = new Element(document);
 const Elem = new Element(document);

 const DOMAIN = `${window.location.origin}/`;

 const API_URL = `${DOMAIN}api/`;

 const mTimer = new Timer();

 const globs = {

  app     : Elem,
  url     : DOMAIN,
  api     : API_URL,
  resp    : response,
  trim    : function(string, limit){

    if(string == undefined) return string;

    return string.toString().length > limit ? `${string.toString().substring(0, limit)}...` : string.toString();

  },
  reg     : function(text){

    let handleText = text.replace(/@+([a-zA-Z0-9_]+)/g, (x , y) => {

        return `<router-link :to="{ name : 'profile', params : { username : ${y}} }" class='app-tag'>${x}</router-link>`;

    }); // End Of Handle Replace

    return handleText.replace(/#+([a-zA-Z0-9_]+)/g, (x, y) => {

        return `<a class='app-hash' href='${DOMAIN}browse/?tag=${y}'>${x}</a>`;

     }); // End Of Hash Replace
  },
  limit   : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  timer   : mTimer,
  model   : {

    user            : UserModel,
    post            : PostModel,
    comment         : CommentModel,
    notification    : NotificationModel,
    tag             : HashTags,
    chat            : ChatsModel,
    message         : MessagesModel

  }

}

 export default globs;

  // export default {

  //    app,
  //    DOMAIN,
  //    API_URL

  // }

