<template>

	<div class="navbar fixed-bottom wrapper" v-if="screen">
						
		<div class="media-wrapper" style="width:100%;">
			
			<form style="width:100%;" @submit.prevent="sendMessage(formDATA)">
				
				<div class="media " style="width:100%;">

					<div class="media-left align-self-center" v-if="record.isRecording">
						
						<a class="icon-wrapper p-1" @click="cancel()">
							
							<i class="fa fa-times app-fa"></i>

						</a>

					</div>
				
					<div class="media-body input-wrapper align-self-center mr-2 " v-if="!record.isRecording">
						
						<textarea @keyup="ontype($event.target.value)" placeholder="message..." v-model='form.text' class="upload-text app-input-field">
						</textarea>

					</div>
					<div class="media-body" style="width:100%;" v-else>
						
						<center>
							<div class="skeleton-shimmer record-timer">
								<samp class="app-max-text">{{ record.time }}</samp>
							</div>
						</center>

					</div>
					<div class="media-right align-self-center" >

						<!-- <span class="icon-wrapper p-1" v-if="!record.done">
							
							<a @click="doneRecording()" class="save-voice">
								
								<i class="fa fa-check app-fa"></i>

							</a>

						</span> -->

						<span class="icon-wrapper p-1" v-if="typing || record.isRecording">
							
							<button class="send-btn" type="submit">
								
								<i class="fa fa-paper-plane app-fa"></i>

							</button>

						</span>
						
						<span v-else><!--  || record.done -->
						 <span class="icon-wrapper p-1">
						 	<clipper-upload style="display:inline-block" class="camera-btn" v-model="image.src">
						 	 <i class="fa fa-camera app-fa"></i>
						 	</clipper-upload>
						 </span>
						 <span class="icon-wrapper p-1">
						 	<a class="mic-btn" @click="toggleRecording()">
						 	 <i class="fa fa-microphone app-fa"></i>
						 	</a>
						 </span>
						</span>
						
					</div>

				</div>

			</form>

		</div>

	</div>
	
</template>

<script>

	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import globs from '../../../tunepik/attack.js'
	
	export default {

		name 			: 'TextInput',
		data 			: () => ({
			screen : globs.app.isMobile,
			form 		: {
						text 	: '',
						media : null,
			},
			typing : false,
			recordText : '',
			show : false,
		}),
		methods    : {

				...mapActions("recorder", ['init', 'toggleRecording', 'startRecording', 'stopRecording']),
				...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),
				...mapActions("upload", ['userUpload']),
				sendMessage	 	: async function(data){

					 // Check If Still Recording
					 if(this.record.isRecording){

					 		await this.toggleRecording(); // Stop The Recording And Save The File!

					 		console.log({data});

					 		this.form.media = this.uploadedFile;

					 		this.userUpload(data);

					 		console.log({data});

					 }else{

					 		this.userUpload(data);

					 }

				},
				/*doneRecording : function(){

					this.stopRecording();

					this.cancelRecording();

				},*/
				ontype   : function(text){

					this.typing = text != '';

				},
				cancel   : function(){

					this.done(true);
					this.stopRecording();

				},

			},
			computed   : {


				...mapGetters("messages", ['message', 'user']),
				...mapGetters("recorder", ['record']),
				...mapGetters("files", ['image', 'checks', 'file']),
				...mapGetters("upload", ['upload']),
				uploadedFile : function(){

						if(this.record.audio.file == null && this.image.file == null){

							console.log('NULLLLL')

						 	 return ''

						 }else{

						 	console.log('IS THERERERER')

						 	 return this.record.audio.file || this.image.file;

						 }

				},
				formDATA  : function(){

					return {

						text 	: this.form.text,
						media : this.form.media,
						url   : `/api/chats/messages/send/${this.user.model.getBasic().id}`,

					}

				},

			},
			mounted : function(){

				this.$nextTick(function(){
					this.init()
				})

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

					console.log('CHANGED!');
					this.form.media = val;

					console.log(this.form);

				}

			}

	};

</script>

<style scoped type="text/css">
	

		@media only screen and (max-width: 700px){


		}

		.upload-text{
			width: 100%;
	    border: none;
	    font-size: 11pt;
	    float: left;
	    /*color: #63717f;*/
	    padding-left: 4px;
	    -webkit-border-radius: 5px;
	    -moz-border-radius: 5px;
	    border-radius: 2px;
	    outline : 0;
	    background-color: transparent;
		}

		.navbar{

			box-shadow: 0 0 0 0 transparent;
			border: 0;

		}

		.app-fa{
			width: 19px;
			height: 19px;
		}

		.input-wrapper{
			border-radius: 15px;
		}

		.send-btn{
			border: 0;
			background-color: transparent;
		}

		.record-timer{
			padding-top: 3px;
			padding-bottom: 3px;
			padding-right: 3px;
			padding-left: 3px;
			width: 30%;
			border-radius: 10px;
			background-color: rgba(211, 211, 211, .4);
		}
		.fixed-bottom{
			height: 50px
		}

</style>