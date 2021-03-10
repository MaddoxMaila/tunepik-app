const DOMAIN = `${window.location.origin}/`;
exports.API_URL = `${DOMAIN}api/`;

// eslint-disable-next-line no-unused-vars
exports.appTheme =  {
	 colors: {

	   black 			 : '#111',
	   blueDark 	 : '#191970',
	   blue  			 : '#5bc0de',
	   grey  			 : 'lightgrey',
	   white 			 : '#fff',
	   red 	 			 : 'red',
	   green 			 : '#5cb85c',
	   transparent : 'transparent'

	 }

} // End Of App Theme

exports.user = class UserModel{

	 // Constructor

	 constructor(args){

	 	if(args.toString().length == 0){
	 		return
	 	}
	 	this.basic = {

	 		 name 	: args.basic_info.user_name,
	 		 handle : args.basic_info.user_athandle,
	 		 email  : args.basic_info.user_email,
	 		 id 	  : args.basic_info.user_id,
	 		 date 	: args.basic_info.user_date,
	 		 link 	: `${DOMAIN}${args.basic_info.user_athandle}`

	 	  } // Basic User Info

	 	this.info = {

	 		  bio 		 : args.info.bio,
	 		  color 	 : args.info.color,
	 		  location   : args.info.res,
	 		  course 	 : args.info.course,
	 		  place 	 : args.info.frequent_place // Frequent Place

	 	  } // User Biography Info

	 	this.images = {

	 		profile : args.images.profileImg,
	 		cover 	: args.images.coverImg

	 	}

	 	this.activity = {

	 		me 				: args.activity.me, // Boolean
	 		following : args.activity.following, // Boolean
	 		followers : args.activity.followers,
	 		follows 	: args.activity.follows,
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


exports.hashTags = class HashTags {

	constructor(args){

		this.hash = {

			count : args.trend_count,
			hash  : args.trend_hash

		}

	} // End Of Constructor

	getHash(){ return this.hash; } // End Of getHash

} // End HashTags

exports.analyseUser = class UserAnalytics extends UserModel {

	constructor(args /* For Analytics */, mUserModel){

		super(mUserModel);

		this.media_interaction = {

			wallVisits : args.profile_visits,
			videoPlays : args.video_plays,
			audioPlays : args.audio_plays

		}

		this.theme = {

			hasTheme : args.has_theme,
			theme 	 : args.theme_data == "" ? {} : args.theme_data.posts[0]

		}

		this.hashes = {

			hashes : args.user_trending

		}

	} // End Of Constructor

	getHashes(){ return this.hashes; } // End Of Get Hashes
	getTheme(){ return this.theme; } // End Of Get Stats

	getMediaInteraction(){ return this.media_interaction; } // End Of Media Interaction

} // End Of UserAnalytics

exports.posts = class PostModel extends UserModel{
	// Constructor
	constructor(args){

		//this.user = new UserModel(args.user); // Create User Object

		super(args.user);

		this.post = {

			id 	 : args.post.media_id,
			url  : args.post.media_url,
			type : args.post.type,
			date : args.post.media_date,
			time : args.post.media_time,
			text : args.post.text

		}

		this.post_data = {

			comCount 	 : args.commentCount,
			likeCount  : args.likesCount,
			isLiked 	 : args.isLiked,
			views 		 : args.views,
			isOriginal : args.is_original_post

		}

		this.shared_post = {

			list  : args.is_original_post,
			model : args.is_original_post ? "" : new PostModel(args.original_post)

		}

		this.comment = {

	 		has 		: args.comments.list,
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
			isLiked 	: args.isLiked,
			views 		: args.views

		}

	}

} // End Of Class

exports.notifications = class NotificationModel extends UserModel{

	constructor(args){

		super(args.info);

		this.notif = {

			 userId 	 : args.notif_holder.user_id,
			 postId 	 : args.notif_holder.post_id,
			 ownerId 	 : args.notif_holder.owner_id,
			 notifType : args.notif_holder.notif_type,
			 seen 		 : args.notif_holder.seen,
			 type  		 : args.notif_holder.type,
			 notifId   : args.notif_holder.notif_holder_id,
			 count 		 : args.count

		}

	} // End Of Constructor

	setSeen(){

	}

	getNotif(){ return this.notif; }

} // End Of Class

exports.comments = class CommentModel extends UserModel{

	constructor(args){

		 super(args.user_info);

		 this.comment = {

		 	  id 		 : args.comment_info.comment_id,
		 	  postId : args.comment_info.post_id,
		 	  userId : args.comment_info.user_id,
		 	  text 	 : args.comment_info.comment_text,
		 	  url 	 : args.comment_info.comment_url,
		 	  date 	 : args.comment_info.comment_date,
		 	  time 	 : args.comment_info.comment_time,
		 	  type 	 : args.comment_info.comment_type

		 }

		 this.stats = {

		 	  views 	 : 0,
			  comCount : 0,
		 	  isLiked 	: args.isLiked,
		 	  likeCount : args.likesCount

		 }

	} // End Of Constructor

	getPost(){ return this.comment; }
	setStats(args){}
	getStats(){ return this.stats; }

} // End Of Class

exports.chats = class ChatsModel extends UserModel {

	constructor(args){

		 super(args.user_info);

		 this.chat = {

		 	message : args.chat.message,
		 	seen 		: args.chat.seen,
		 	count 	: args.chat.count == 0 ? "" : args.chat.count,
		 	id 			: args.chat.chat_id,
		 	time 		: args.chat.time,
		 	date 		: args.chat.date

		 }

	} // End OF Constructor

	getChat(){ return this.chat; }

} // End Of Class

exports.messages = class MessagesModel extends UserModel {

	constructor(args){

		super(args.user_info);

		this.message = {

			id 			: args.message.msg_id,
			idOne 	: args.message.user_id_one,
			idTwo 	: args.message.user_id_two,
			date 		: args.message.msg_date,
			time 		: args.message.msg_time,
			message : args.message.message,
			url 		: args.message.url,
			type 		: args.message.type,
			seen 		: args.message.seen

		}

		this.post = {
			text 		: args.message.message,
			url 		: args.message.url,
			type 		: args.message.type.toString().trim(),
		}

	} // End Of Constructor

	getMessage(){ return this.message; }

	getPost(){ return this.post; }

} // End Of Class


class AppIcons{

	constructor(args){

		this.color = args.color;
		this.svgNode = null;
		this.path = null;

	}

	getColor(){return this.color;}

	svg(args){

		this.svgNode = $.create('svg', 'svg-icon');
		this.svgNode.setAttribute('xmlns', "http://www.w3.org/2000/svg");
		this.svgNode.setAttribute('viewBox', '0 0 24 24');
		this.svgNode.setAttribute('width', args.width);
		this.svgNode.setAttribute('height', args.height);

		return this.svgNode;
	}

	icon(args){

		return `<svg class="app-real-icon" id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${args.width}" height="${args.height}"><path fill="${args.fill == '' ? this.color : args.fill}" fill-opacity="1" d="${args.data}" /></svg>`;
	}

	fire(args){

		return this.icon({fill : args.color, data : "M13.5,0.67s0.74,2.65 0.74,4.8c0,2.06 -1.35,3.73 -3.41,3.73 -2.07,0 -3.63,-1.67 -3.63,-3.73l0.03,-0.36C5.21,7.51 4,10.62 4,14c0,4.42 3.58,8 8,8s8,-3.58 8,-8C20,8.61 17.41,3.8 13.5,0.67zM11.71,19c-1.78,0 -3.22,-1.4 -3.22,-3.14 0,-1.62 1.05,-2.76 2.81,-3.12 1.77,-0.36 3.6,-1.21 4.62,-2.58 0.39,1.29 0.59,2.65 0.59,4.04 0,2.65 -2.15,4.8 -4.8,4.8z", width : args.width, height : args.height});

	}

	comment(args){

		return this.icon({fill : args.color, data : "M21,6h-2v9L6,15v2c0,0.55 0.45,1 1,1h11l4,4L22,7c0,-0.55 -0.45,-1 -1,-1zM17,12L17,3c0,-0.55 -0.45,-1 -1,-1L3,2c-0.55,0 -1,0.45 -1,1v14l4,-4h10c0.55,0 1,-0.45 1,-1z", width : args.width, height : args.height});


	}
	commentAlt(args){

		return this.icon({fill : args.color, data : "M20,2L4,2c-1.1,0 -2,0.9 -2,2v18l4,-4h14c1.1,0 2,-0.9 2,-2L22,4c0,-1.1 -0.9,-2 -2,-2zM20,16L6,16l-2,2L4,4h16v12z", width : args.width, height : args.height});

	}

	video(args){

		return this.icon({fill : args.color, data : "M21,3L3,3c-1.11,0 -2,0.89 -2,2v12c0,1.1 0.89,2 2,2h5v2h8v-2h5c1.1,0 1.99,-0.9 1.99,-2L23,5c0,-1.11 -0.9,-2 -2,-2zM21,17L3,17L3,5h18v12zM16,11l-7,4L9,7z", width : args.width, height : args.height});



	}

	audio(args){

		return this.icon({fill : args.color, data : "M21,3L3,3c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h18c1.1,0 2,-0.9 2,-2L23,5c0,-1.1 -0.9,-2 -2,-2zM21,19L3,19L3,5h18v14zM8,15c0,-1.66 1.34,-3 3,-3 0.35,0 0.69,0.07 1,0.18L12,6h5v2h-3v7.03c-0.02,1.64 -1.35,2.97 -3,2.97 -1.66,0 -3,-1.34 -3,-3z", width : args.width, height : args.height});

	}

	gallery(args){

		return this.icon({fill : args.color, data : "M22,16L22,4c0,-1.1 -0.9,-2 -2,-2L8,2c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2zM11,12l2.03,2.71L16,11l4,5L8,16l3,-4zM2,6v14c0,1.1 0.9,2 2,2h14v-2L4,20L4,6L2,6z", width : args.width, height : args.height});

	}

	home(args){

		return this.icon({fill : args.color, data : "M10,20v-6h4v6h5v-8h3L12,3 2,12h3v8z", width : args.width, height : args.height});

	}

	message(args){

		return this.icon({fill : args.color, data : "M20,4L4,4c-1.1,0 -1.99,0.9 -1.99,2L2,18c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2L22,6c0,-1.1 -0.9,-2 -2,-2zM20,18L4,18L4,8l8,5 8,-5v10zM12,11L4,6h16l-8,5z", width : args.width, height : args.height});

	}

	notification(args){

		return this.icon({fill : args.color, data : "M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.9,2 2,2zM18,16v-5c0,-3.07 -1.63,-5.64 -4.5,-6.32L13.5,4c0,-0.83 -0.67,-1.5 -1.5,-1.5s-1.5,0.67 -1.5,1.5v0.68C7.64,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2zM16,17L8,17v-6c0,-2.48 1.51,-4.5 4,-4.5s4,2.02 4,4.5v6z", width : args.width, height : args.height});

	}

	search(args){

		return this.icon({fill : args.color, data : "M22,16L22,4c0,-1.1 -0.9,-2 -2,-2L8,2c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2zM11,12l2.03,2.71L16,11l4,5L8,16l3,-4zM2,6v14c0,1.1 0.9,2 2,2h14v-2L4,20L4,6L2,6z", width : args.width, height : args.height});

	}

	grid(args){

		return this.icon({fill : args.color, data : "M13,13v8h8v-8h-8zM3,21h8v-8L3,13v8zM3,3v8h8L11,3L3,3zM16.66,1.69L11,7.34 16.66,13l5.66,-5.66 -5.66,-5.65z", width : args.width, height : args.height});

	}

	back(args){

		return this.icon({fill : args.color, data : "M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z", width : args.width, height : args.height});

	}
	heart(args){
		return this.icon({fill : args.color, data : "M12,21.35l-1.45,-1.32C5.4,15.36 2,12.28 2,8.5 2,5.42 4.42,3 7.5,3c1.74,0 3.41,0.81 4.5,2.09C13.09,3.81 14.76,3 16.5,3 19.58,3 22,5.42 22,8.5c0,3.78 -3.4,6.86 -8.55,11.54L12,21.35z", width : args.width, height : args.height});
	}
	heartEmpty(args){
		return this.icon({fill : args.color, data : "M16.5,3c-1.74,0 -3.41,0.81 -4.5,2.09C10.91,3.81 9.24,3 7.5,3 4.42,3 2,5.42 2,8.5c0,3.78 3.4,6.86 8.55,11.54L12,21.35l1.45,-1.32C18.6,15.36 22,12.28 22,8.5 22,5.42 19.58,3 16.5,3zM12.1,18.55l-0.1,0.1 -0.1,-0.1C7.14,14.24 4,11.39 4,8.5 4,6.5 5.5,5 7.5,5c1.54,0 3.04,0.99 3.57,2.36h1.87C13.46,5.99 14.96,5 16.5,5c2,0 3.5,1.5 3.5,3.5 0,2.89 -3.14,5.74 -7.9,10.05z", width : args.width, height : args.height});
	}
	remove(args){
		return this.icon({fill : args.color, data : "M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12z", width : args.width, height : args.height});
	}
	delete(args){
		return this.icon({fill : args.color, data : "M6,19c0,1.1 0.9,2 2,2h8c1.1,0 2,-0.9 2,-2L18,7L6,7v12zM8.46,11.88l1.41,-1.41L12,12.59l2.12,-2.12 1.41,1.41L13.41,14l2.12,2.12 -1.41,1.41L12,15.41l-2.12,2.12 -1.41,-1.41L10.59,14l-2.13,-2.12zM15.5,4l-1,-1h-5l-1,1L5,4v2h14L19,4z", width : args.width, height : args.height});
	}
	search(args){
		return this.icon({fill : args.color, data : "M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zM9.5,14C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z", width : args.width, height : args.height});
	}
	more(args){
		return this.icon({fill : args.color, data : "M13,7h-2v4L7,11v2h4v4h2v-4h4v-2h-4L13,7zM12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10,-4.48 10,-10S17.52,2 12,2zM12,20c-4.41,0 -8,-3.59 -8,-8s3.59,-8 8,-8 8,3.59 8,8 -3.59,8 -8,8z", width : args.width, height : args.height});
	}
	refresh(args){
		return this.icon({fill : args.color, data : "M12,6v3l4,-4 -4,-4v3c-4.42,0 -8,3.58 -8,8 0,1.57 0.46,3.03 1.24,4.26L6.7,14.8c-0.45,-0.83 -0.7,-1.79 -0.7,-2.8 0,-3.31 2.69,-6 6,-6zM18.76,7.74L17.3,9.2c0.44,0.84 0.7,1.79 0.7,2.8 0,3.31 -2.69,6 -6,6v-3l-4,4 4,4v-3c4.42,0 8,-3.58 8,-8 0,-1.57 -0.46,-3.03 -1.24,-4.26z", width : args.width, height : args.height});

	}
	friends(args){
		return this.icon({fill : args.color, data : "M16.5,13c-1.2,0 -3.07,0.34 -4.5,1 -1.43,-0.67 -3.3,-1 -4.5,-1C5.33,13 1,14.08 1,16.25L1,19h22v-2.75c0,-2.17 -4.33,-3.25 -6.5,-3.25zM12.5,17.5h-10v-1.25c0,-0.54 2.56,-1.75 5,-1.75s5,1.21 5,1.75v1.25zM21.5,17.5L14,17.5v-1.25c0,-0.46 -0.2,-0.86 -0.52,-1.22 0.88,-0.3 1.96,-0.53 3.02,-0.53 2.44,0 5,1.21 5,1.75v1.25zM7.5,12c1.93,0 3.5,-1.57 3.5,-3.5S9.43,5 7.5,5 4,6.57 4,8.5 5.57,12 7.5,12zM7.5,6.5c1.1,0 2,0.9 2,2s-0.9,2 -2,2 -2,-0.9 -2,-2 0.9,-2 2,-2zM16.5,12c1.93,0 3.5,-1.57 3.5,-3.5S18.43,5 16.5,5 13,6.57 13,8.5s1.57,3.5 3.5,3.5zM16.5,6.5c1.1,0 2,0.9 2,2s-0.9,2 -2,2 -2,-0.9 -2,-2 0.9,-2 2,-2z", width : args.width, height : args.height});
	}

	attach(args){
		return this.icon({fill : args.color, data : "M16.5,6v11.5c0,2.21 -1.79,4 -4,4s-4,-1.79 -4,-4V5c0,-1.38 1.12,-2.5 2.5,-2.5s2.5,1.12 2.5,2.5v10.5c0,0.55 -0.45,1 -1,1s-1,-0.45 -1,-1V6H10v9.5c0,1.38 1.12,2.5 2.5,2.5s2.5,-1.12 2.5,-2.5V5c0,-2.21 -1.79,-4 -4,-4S7,2.79 7,5v12.5c0,3.04 2.46,5.5 5.5,5.5s5.5,-2.46 5.5,-5.5V6h-1.5z", width : args.width, height : args.height});
	}

	mic(args){
		return this.icon({fill : args.color, data : "M12,14c1.66,0 2.99,-1.34 2.99,-3L15,5c0,-1.66 -1.34,-3 -3,-3S9,3.34 9,5v6c0,1.66 1.34,3 3,3zM10.8,4.9c0,-0.66 0.54,-1.2 1.2,-1.2 0.66,0 1.2,0.54 1.2,1.2l-0.01,6.2c0,0.66 -0.53,1.2 -1.19,1.2 -0.66,0 -1.2,-0.54 -1.2,-1.2L10.8,4.9zM17.3,11c0,3 -2.54,5.1 -5.3,5.1S6.7,14 6.7,11L5,11c0,3.41 2.72,6.23 6,6.72L11,21h2v-3.28c3.28,-0.48 6,-3.3 6,-6.72h-1.7z", width : args.width, height : args.height});
	}
	micFill(args){

		return this.icon({fill : args.color, data : "M12,14c1.66,0 2.99,-1.34 2.99,-3L15,5c0,-1.66 -1.34,-3 -3,-3S9,3.34 9,5v6c0,1.66 1.34,3 3,3zM17.3,11c0,3 -2.54,5.1 -5.3,5.1S6.7,14 6.7,11L5,11c0,3.41 2.72,6.23 6,6.72L11,21h2v-3.28c3.28,-0.48 6,-3.3 6,-6.72h-1.7z", width : args.width, height : args.height});

	}

	list(args){
		return this.icon({fill : args.color, data : "M2,21h19v-3H2v3zM20,8H3c-0.55,0 -1,0.45 -1,1v6c0,0.55 0.45,1 1,1h17c0.55,0 1,-0.45 1,-1V9c0,-0.55 -0.45,-1 -1,-1zM2,3v3h19V3H2z", width : args.width, height : args.height});

	}

	upload(args){
		return this.icon({fill : args.color, data : "M19.35,10.04C18.67,6.59 15.64,4 12,4 9.11,4 6.6,5.64 5.35,8.04 2.34,8.36 0,10.91 0,14c0,3.31 2.69,6 6,6h13c2.76,0 5,-2.24 5,-5 0,-2.64 -2.05,-4.78 -4.65,-4.96zM14,13v4h-4v-4H7l5,-5 5,5h-3z", width : args.width, height : args.height});
	}

	wallpaper(args){
		return this.icon({fill : args.color, data : "M4,4h7L11,2L4,2c-1.1,0 -2,0.9 -2,2v7h2L4,4zM10,13l-4,5h12l-3,-4 -2.03,2.71L10,13zM17,8.5c0,-0.83 -0.67,-1.5 -1.5,-1.5S14,7.67 14,8.5s0.67,1.5 1.5,1.5S17,9.33 17,8.5zM20,2h-7v2h7v7h2L22,4c0,-1.1 -0.9,-2 -2,-2zM20,20h-7v2h7c1.1,0 2,-0.9 2,-2v-7h-2v7zM4,13L2,13v7c0,1.1 0.9,2 2,2h7v-2L4,20v-7z", width : args.width, height : args.height});
	}

	optionsVert(args){
		return this.icon({fill : args.color, data : "M12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,10c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2zM12,16c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2z", width : args.width, height : args.height});
	}

	optionsHorz(args){
		return this.icon({fill : args.color, data : "M6,10c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2zM18,10c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2zM12,10c-1.1,0 -2,0.9 -2,2s0.9,2 2,2 2,-0.9 2,-2 -0.9,-2 -2,-2z", width : args.width, height : args.height});
	}

	copy(args){
		return this.icon({fill : args.color, data : "M16,1L4,1c-1.1,0 -2,0.9 -2,2v14h2L4,3h12L16,1zM19,5L8,5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h11c1.1,0 2,-0.9 2,-2L21,7c0,-1.1 -0.9,-2 -2,-2zM19,21L8,21L8,7h11v14z", width : args.width, height : args.height});
	}

	chevronUp(args){
		return this.icon({fill : args.color, data : "M12,8l-6,6 1.41,1.41L12,10.83l4.59,4.58L18,14z", width : args.width, height : args.height});
	}

	chevronDown(args){
		return this.icon({fill : args.color, data : "M16.59,8.59L12,13.17 7.41,8.59 6,10l6,6 6,-6z", width : args.width, height : args.height});
	}

	faceFrown(args){

		return this.icon({fill : args.color, data : "M11.99,2C6.47,2 2,6.47 2,12s4.47,10 9.99,10S22,17.53 22,12 17.52,2 11.99,2zM12,20c-4.42,0 -8,-3.58 -8,-8s3.58,-8 8,-8 8,3.58 8,8 -3.58,8 -8,8zM16.18,7.76l-1.06,1.06 -1.06,-1.06L13,8.82l1.06,1.06L13,10.94 14.06,12l1.06,-1.06L16.18,12l1.06,-1.06 -1.06,-1.06 1.06,-1.06zM7.82,12l1.06,-1.06L9.94,12 11,10.94 9.94,9.88 11,8.82 9.94,7.76 8.88,8.82 7.82,7.76 6.76,8.82l1.06,1.06 -1.06,1.06zM12,14c-2.33,0 -4.31,1.46 -5.11,3.5h10.22c-0.8,-2.04 -2.78,-3.5 -5.11,-3.5z", width : args.width, height : args.height});

	}

	TunePikLogo(args){

		let a = $.create('a', 'icon-home-link');

		a.href = `${DOMAIN}home/`;

		let Img = new Image();
		Img.width = args.width;
		Img.height = args.height;
		Img.setAttribute('class', 'app-icon-icon');
		Img.src = this.color == '#111' ? `${DOMAIN}static/assets/logo23.png` : `${DOMAIN}static/assets/logo23.png`;

		a.append(Img);

		if(args.return){

			return $.center(a);

		}else{

			$.html(args.view, '');
			$.get(args.view).append($.center(a));

		}

	}

	menu(args){

		return this.icon({fill : args.color, data : "M3,18h18v-2L3,16v2zM3,13h18v-2L3,11v2zM3,6v2h18L21,6L3,6z", width : args.width, height : args.height});

	}

	lightBulbOn(args){

		return this.icon({fill : args.color, data : "M13.5,0.67s0.74,2.65 0.74,4.8c0,2.06 -1.35,3.73 -3.41,3.73 -2.07,0 -3.63,-1.67 -3.63,-3.73l0.03,-0.36C5.21,7.51 4,10.62 4,14c0,4.42 3.58,8 8,8s8,-3.58 8,-8C20,8.61 17.41,3.8 13.5,0.67zM11.71,19c-1.78,0 -3.22,-1.4 -3.22,-3.14 0,-1.62 1.05,-2.76 2.81,-3.12 1.77,-0.36 3.6,-1.21 4.62,-2.58 0.39,1.29 0.59,2.65 0.59,4.04 0,2.65 -2.15,4.8 -4.8,4.8z", width : args.width, height : args.height});

	}

	lightBulbOff(args){

		return this.icon({fill : args.color, data : "M3.55,18.54l1.41,1.41 1.79,-1.8 -1.41,-1.41 -1.79,1.8zM11,22.45h2L13,19.5h-2v2.95zM4,10.5L1,10.5v2h3v-2zM15,6.31L15,1.5L9,1.5v4.81C7.21,7.35 6,9.28 6,11.5c0,3.31 2.69,6 6,6s6,-2.69 6,-6c0,-2.22 -1.21,-4.15 -3,-5.19zM20,10.5v2h3v-2h-3zM17.24,18.16l1.79,1.8 1.41,-1.41 -1.8,-1.79 -1.4,1.4z", width : args.width, height : args.height});

	}

	checkBoxOn(args){

		return this.icon({fill : args.color, data : "M19,3L5,3c-1.11,0 -2,0.9 -2,2v14c0,1.1 0.89,2 2,2h14c1.11,0 2,-0.9 2,-2L21,5c0,-1.1 -0.89,-2 -2,-2zM10,17l-5,-5 1.41,-1.41L10,14.17l7.59,-7.59L19,8l-9,9z", width : args.width, height : args.height});

	}

	checkBoxOff(args){

		return this.icon({fill : args.color, data : "M19,5v14H5V5h14m0,-2H5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2V5c0,-1.1 -0.9,-2 -2,-2z", width : args.width, height : args.height});

	}

	lock(args){

		return this.icon({fill : args.color, data : "M12,17c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,8h-1L17,6c0,-2.76 -2.24,-5 -5,-5S7,3.24 7,6v2L6,8c-1.1,0 -2,0.9 -2,2v10c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2L20,10c0,-1.1 -0.9,-2 -2,-2zM8.9,6c0,-1.71 1.39,-3.1 3.1,-3.1s3.1,1.39 3.1,3.1v2L8.9,8L8.9,6zM18,20L6,20L6,10h12v10z", width : args.width, height : args.height});

	}

	link(args){

		return this.icon({fill : args.color, data : "M3.9,12c0,-1.71 1.39,-3.1 3.1,-3.1h4L11,7L7,7c-2.76,0 -5,2.24 -5,5s2.24,5 5,5h4v-1.9L7,15.1c-1.71,0 -3.1,-1.39 -3.1,-3.1zM8,13h8v-2L8,11v2zM17,7h-4v1.9h4c1.71,0 3.1,1.39 3.1,3.1s-1.39,3.1 -3.1,3.1h-4L13,17h4c2.76,0 5,-2.24 5,-5s-2.24,-5 -5,-5z", width : args.width, height : args.height});

	}

	musicNote(args){

		return this.icon({fill : args.color, data : "M12,3v10.55c-0.59,-0.34 -1.27,-0.55 -2,-0.55 -2.21,0 -4,1.79 -4,4s1.79,4 4,4 4,-1.79 4,-4V7h4V3h-6z", width : args.width, height : args.height});

	}

	musicNoteBars(args){

		return this.icon({fill : args.color, data : "M15,6L3,6v2h12L15,6zM15,10L3,10v2h12v-2zM3,16h8v-2L3,14v2zM17,6v8.18c-0.31,-0.11 -0.65,-0.18 -1,-0.18 -1.66,0 -3,1.34 -3,3s1.34,3 3,3 3,-1.34 3,-3L19,8h3L22,6h-5z", width : args.width, height : args.height});

	}

	noNetwork(args){

		return this.icon({fill : args.color, data : "M19.35,10.04C18.67,6.59 15.64,4 12,4c-1.48,0 -2.85,0.43 -4.01,1.17l1.46,1.46C10.21,6.23 11.08,6 12,6c3.04,0 5.5,2.46 5.5,5.5v0.5H19c1.66,0 3,1.34 3,3 0,1.13 -0.64,2.11 -1.56,2.62l1.45,1.45C23.16,18.16 24,16.68 24,15c0,-2.64 -2.05,-4.78 -4.65,-4.96zM3,5.27l2.75,2.74C2.56,8.15 0,10.77 0,14c0,3.31 2.69,6 6,6h11.73l2,2L21,20.73 4.27,4 3,5.27zM7.73,10l8,8H6c-2.21,0 -4,-1.79 -4,-4s1.79,-4 4,-4h1.73z", width : args.width, height : args.height});

	}

	merge(args){

		return this.icon({fill : args.color, data : "M17,20.41L18.41,19 15,15.59 13.59,17 17,20.41zM7.5,8H11v5.59L5.59,19 7,20.41l6,-6V8h3.5L12,3.5 7.5,8z", width : args.width, height : args.height});

	}

	barz(args){

		return this.icon({fill : args.color, data : "M7,18h2L9,6L7,6v12zM11,22h2L13,2h-2v20zM3,14h2v-4L3,10v4zM15,18h2L17,6h-2v12zM19,10v4h2v-4h-2z", width : args.width, height : args.height});

	}

	arrowDown(args){

		return this.icon({fill : args.color, data : "M7.41,7.84L12,12.42l4.59,-4.58L18,9.25l-6,6 -6,-6z", width : args.width, height : args.height});

	}

	arrowUp(args){

		return this.icon({fill : args.color, data : "M7.41,15.41L12,10.83l4.59,4.58L18,14l-6,-6 -6,6z", width : args.width, height : args.height});

	}

	extShare(args){

		return this.icon({fill : args.color, data : "M18,16.08c-0.76,0 -1.44,0.3 -1.96,0.77L8.91,12.7c0.05,-0.23 0.09,-0.46 0.09,-0.7s-0.04,-0.47 -0.09,-0.7l7.05,-4.11c0.54,0.5 1.25,0.81 2.04,0.81 1.66,0 3,-1.34 3,-3s-1.34,-3 -3,-3 -3,1.34 -3,3c0,0.24 0.04,0.47 0.09,0.7L8.04,9.81C7.5,9.31 6.79,9 6,9c-1.66,0 -3,1.34 -3,3s1.34,3 3,3c0.79,0 1.5,-0.31 2.04,-0.81l7.12,4.16c-0.05,0.21 -0.08,0.43 -0.08,0.65 0,1.61 1.31,2.92 2.92,2.92 1.61,0 2.92,-1.31 2.92,-2.92s-1.31,-2.92 -2.92,-2.92z", width : args.width, height : args.height});

	}

	video2(args){

		return this.icon({fill : args.color, data : "M17,10.5V7c0,-0.55 -0.45,-1 -1,-1H4c-0.55,0 -1,0.45 -1,1v10c0,0.55 0.45,1 1,1h12c0.55,0 1,-0.45 1,-1v-3.5l4,4v-11l-4,4z", width : args.width, height : args.height});
	}

}

let Icons = new AppIcons(({color : '#111'}));

exports.icon = Icons;

/*
(() => {

	 let Cover = $.create('div', 'app-render-cover');
	 $.get('#body').append(Cover);

	 let LogoWrap = $.create('div', 'cover-logo-wrap');

	 Cover.append(LogoWrap);

	 if($.isMobile){

	 	 LogoWrap.append(Icons.TunePikLogo({
		  view : $.isMobile ? '.icon-wrapper-sm' :'.app-icon-tab',
		  width : 150,
		  height : 40,
		  return : true
		 }));

	 }else{

	 	 $.addLoader({view : '.cover-logo-wrap'});

	 }

	 let x = 0;
	 let opacity = 1;

	 let CoverInterval = setInterval(() => {

	   opacity -= 0.1
	 	 Cover.style.opacity = `${$.isMobile ? '1' : '1'}`;

        if(x == 1500){

        	clearInterval(CoverInterval);
        	Cover.style.display = 'none';

        }
       x += 100;

	 }, 100);

	 // setTimeout(() => {

	 // 	 Cover.style.display = 'none';

	 // }, 2000);

})();
*/
