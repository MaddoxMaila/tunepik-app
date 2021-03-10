<template>

	<div class="add-post-root wrapper">

		<form @submit.prevent="userUpload(data)">

			<input type="file" @change="getVideo" class="video-input" name="video-input" id="video-input" />
		
		 <Navigation v-if="record.done && checks.done">
		 	
		 		<div class="media-body align-self-center">
		 			
		 				<span class="app-max-text text-top">
		 					What You Thinking?
		 				</span>

		 		</div>

		 		<div class="media-right align-self-center">
		 			
		 			<v-button class="btn-top" :type="'primary'" :nativeType="'submit'">
		 				Publish
		 			</v-button>

		 		</div>

		 </Navigation>
		 <div class="space-large"></div>
		 <div class="space-large"></div>
		 <div class="space-large"></div>

		 <WorkFiles :round="false" v-if="file"></WorkFiles>
		 <AudioRecorder v-else></AudioRecorder>

		 <UploadCover></UploadCover>



		 <!-- Bottom Navigation! -->

		 <div class="navbar fixed-bottom mobile-share-control p-2" style="width:100%;" v-if="record.done && checks.done">

		 	<div class="share-box-wrapper p-2">
		 		
		 		<div class="media">
		 			
		 			<div class="media-left align-self-center mapGetters-2">
		 				
		 				<image-loader 
				        height="35px"
				        width="35px"
				        class="rounded-circle"
				        :placeholder="'' + model.getImgs().profile"
				        :src="''+model.getImgs().profile" />

		 			</div>
		 			<div class="media-body align-self-center pl-2">
		 				
		 				<textarea class="share-box" placeholder="Add Text/@Mentions" v-model="data.text"></textarea>

		 			</div>

		 		</div>


		 	</div>


		 		<div class="media pt-2 pb-2" style="width:100%;">
		 			
		 			<div class="media-left align-self-center">
		 				
		 				<clipper-upload v-model="image.src">
		 					
		 					<Icon :icon="'gallery'" :height="24" :width="24"></Icon>

		 				</clipper-upload>

		 			</div>
		 			<div class="media-body align-self-center pl-2" style="width:100%;"></div>
		 			<div class="media-right align-self-center">
		 				
		 				<label for="video-input">
		 					<Icon :icon="'vidupload'" :height="24" :width="24"></Icon>
		 				</label>

		 			</div>

		 		</div>

			</div>

		</form>

	</div>


</template>


<script>

		import { mapGetters, mapActions, mapMutations } from 'vuex'
		import globs from '../../../tunepik/attack.js'
		import Form from 'vform'
		import Navigation from './Navigation'
		import AudioRecorder from '../../builders/uploadBuilders/AudioRecorder'
		import WorkFiles from '../../builders/uploadBuilders/WorkFiles'
		import UploadCover from '../../builders/uploadBuilders/UploadCover'

		export default {

			name 				: "AddPost",
			scrollToTop : false,
			data 				: function(){

				return {

					/*data : {
						text  	: '',
						media 	: this.uploadedFile,
						url     : '/api/upload/post'
					}*/

				};

			},
			components 	: {

				Navigation,
				AudioRecorder,
				WorkFiles,
				UploadCover

			},
			methods 		: {

				...mapActions("recorder", ['init', 'toggleRecording', 'startRecording', 'stopRecording']),
				...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),
				...mapActions("upload", ['userUpload']),
				...mapMutations("tunepik", ['SNACK_BAR']),
				...mapActions("files", ['getVideo']),

			},
			computed 		: {

				...mapGetters("recorder", ['record']),
				...mapGetters("files", ['image', 'checks', 'file', 'video']),
				...mapGetters("upload", ['upload']),
				...mapGetters("auth", ['model']),
				data : function(){
					return {
						text  	: '',
						media 	: this.uploadedFile,
						url     : '/api/upload/post'
					}
				},
				uploadedFile : function(){

						if(this.record.audio.file == null && this.image.file == null && this.video.file == null){

							console.log('NULLLLL')

						 	 return ''

						 }else{

						 	console.log('IS THERERERER')

						 	 return this.record.audio.file || this.image.file || this.video.file;

						 }

				}

			},
			watch 			 : {

				'image.src' : function(val){

				 	/*this.$store.commit('files/isSet', val != "");
				 	this.$store.commit('files/chosen', val != "")*/

				 	this.isFile(val != "");
				 	this.done(val == "")
					this.isSet(val != "");
					this.chosen(val != "");

				},
				uploadedFile : function(val){

					this.data.media = val;

				},
				'upload.data' : function(data){

					this.SNACK_BAR({

							isOpen  : true,
							message : data.message,
							theme 	: data.error ? 'danger' : 'info'

						})

					if(!data.error && data.uploaded && data.shared.list){

						let post = globs.model.post(data.shared.posts)

						this.$router.push({ 

							name : 'comment', 
							params : {

								username : post.getBasic().handle,
								type 		 : post.getPost().type,
								id 			 : post.getPost().id

							} 

						})

					}

				}

			}

		};
	
</script>

<style>

  .add-post-root{

  	z-index: 9999 !important;
  	position: fixed;
  	top: 0;
  	bottom: 0;
  	right: 0;
  	left: 0;
  	height: 100%;
  	width: 100%;

  }

  .input-wrapper-xs{
  	border-bottom: .05em solid rgba(211, 211, 211, .6);
  }

  .mobile-share-control{
  	width: 100%;
  	height: auto;
  	background-color: rgba(211, 211, 211, .175);
  	border: 0;
  }	

  .b-media{
		padding: 10px;
		border-radius: 50%;
		background-color: rgba(211, 211, 211, .25); 
	}

  .share-box-wrapper{
		border-bottom : .04em solid rgba(211, 211, 211, .5);
		background-color: rgba(211, 211, 211, .175);
		height: 60px;
		width: 100%;
	}

	.share-box:active{

		.share-box-wrapper{
			border-bottom : #5bc0de;
		}

	}

	.share-box{
		width: 100%;
		height: 50px;
    border: none;
    font-size: 11pt;
    float: left;
    color: #63717f;
    padding-left: 4px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 2px;
    outline : 0;
    background-color: transparent;
	}
</style>