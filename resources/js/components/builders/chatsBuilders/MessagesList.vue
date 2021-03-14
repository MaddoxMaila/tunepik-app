<template>

	<div class="wrapper card no-border">
		
		<!-- LOADING FOR USER FETCHING -->
		<template v-if="user.loading">
			
		</template>
		<template v-else>
			<div class="make-one">
			<Navigation v-if="screen">
			
				<div class="media-body">

						<div class="media">
							
							<!-- <div class="media-left align-self-center">
								
								<Picture :height="30" :width="30" :user="user.model" class="ml-2"></Picture>

							</div> -->
							<div class="media-body ml-2 align-self-center">
								
								<span class="app-max-text text-top">
									<router-link :to="{ name : 'profile', params : { username : userName } }">
										<!-- <span class="profile-user-name app-max-text">
			                {{ trim(user.model.getBasic().name, 12) }}
			              </span>
			              <span class="profile-user-handle app-post-text" style="display: block;line-height: 1;">
			                @{{ user.model.getBasic().handle }}
			              </span> -->
			              <user-name :user="user.model" :limit="12"></user-name>
									</router-link>
								</span>

							</div>

						</div>

				</div>
				<div class="media-right align-self-center">

					<span class="icon-wrapper p-1">
						
						<a class="options" @click="show = !show">
							<i class="fa fa-cog app-fa"></i>
						</a>

					</span>

					<div class="overlay-wrap" v-show="show">
						
						<div class="main-wrap card no-border" v-show="show" :class="[show ? 'fade-in' : 'fade-out']">
							
							<div class="media card-header no-border">
								
								<div class="media-left align-self-center">
									
									<Picture :width="35" :height="35" :user="user.model"></Picture>

								</div>
								<div class="media-body align-self-center pl-3">
									
									Message Options

								</div>
								<div class="media-right">
									
									<a @click="show = !show">
										<i class="fa fa-times app-fa"></i>
									</a>

								</div>

							</div>
							<div class="card-body no-border">
								
								<MessageOptions :user="user.model"></MessageOptions>

							</div>

						</div>

					</div>
					
				</div>

			</Navigation>
			<div class="card-header no-border" v-else></div>
							
				<div class="card-body no-border">
					<div class="visible-xs space-large"></div>
					<div class="visible-xs space-medium"></div>

					<div class="p-2" v-if="message.error || user.error">
						
						<center>
							<h3>
								{{ message.message || user.message }}
							</h3>
						</center>

					</div>
					<div v-else>

						<div class="profile-wrapper p-2">
						
						<center>
							
							<!-- <div class="profile-wrap mb-1">
								<router-link :to="{ name : 'profile', params : { username : user.model.getBasic().handle } }">
								
									<Picture :width="90" :height="90" :user="user.model"></Picture>
								</router-link>

							</div>
							<span class="app-bolder-text">
								{{ trim(user.model.getBasic().name, 15) }}
							</span>
							<UserFollowsBuilder :user="user.model"></UserFollowsBuilder>

							<div class="user-bio m-2" style="width: 90%;">
        
		            <span class="app-post-text">
		              
		              {{ user.model.getInfo().bio }}

		            </span>

		          </div> -->

		          <UserCardBuilder :user="user.model"></UserCardBuilder>

						</center>

						<hr />

					</div>
						
						<MessageSkeleton v-if="message.loading"></MessageSkeleton>
						<div class="list-group" v-else>

						<div class="list-group-item p-1" v-for="(text, i) in message.messages" :key="i">
								
							<TextBubble :text="text"></TextBubble>

						</div>

						</div>

					</div>

				</div>

			<!-- </template> -->

			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>

			<div class="file-wrapper bg-white" v-if="file">
				
				<WorkFiles :round="false"></WorkFiles>

			</div>

			<TextInput class="text-input-msg"></TextInput>
				
			</div>
		</template>

	</div>
	
</template>

<script type="text/javascript">

		import { mapActions, mapGetters, mapMutations } from 'vuex'
	  import globs from '../../../tunepik/attack.js'
		import Navigation from '../../mobile/root/Navigation'
		import TextBubble from './TextBubble'
		import TextInput from './TextInput'
		import MessageSkeleton from '../skeletonBuilders/MessageSkeleton'
		import UserFollowsBuilder from '../profileBuilders/UserFollowsBuilder'
		import WorkFiles from '../uploadBuilders/WorkFiles'
		import MessageOptions from '../popupBuilders/MessageOptions'
		import UserCardBuilder from '../userBuilders/UserCardBuilder'

		export default {

			name 			: "MessagesList",
			scrollToTop : false,
			data 			: function(){

				return {

					screen  : globs.app.isMobile,
					trim    : globs.trim,
					show 		: false,
				
				}

			},
			components : {

				Navigation,
				UserFollowsBuilder,
				TextBubble,
				MessageSkeleton,
				WorkFiles,
				MessageOptions,
				TextInput,
				UserCardBuilder

			},
			methods    : {

				...mapActions("messages", ['getMessages', 'getUser']),
				...mapMutations("messages", ['FETCH_MESSAGES']),
				messagesChannel : function(){

					console.log(window.Echo
										.private(`messages-event.${this.ID.from}.${this.ID.to}`))
					
					console.log(this.ID)

					window.Echo
										.private(`messages-event.${this.ID.from}.${this.ID.to}`)
										.listen('.incoming-messages', messages => {

										console.log(messages)
										this.FETCH_MESSAGES(messages)

					})

				},
		},
			computed   : {

				...mapGetters("files", ['image', 'checks', 'file']),
				...mapGetters('messages', ['user', 'message']),
				...mapGetters('auth', ['model']),
				userName : function(){

					return this.$route.params.username;

				},
				ID : function(){
					return {
						from : this.model.getBasic().id,
						to : this.user.model ? this.user.model.getBasic().id : 0
					}
				}
			},
			created     : function(){

				if(!this.user.model) this.getUser(this.userName);

				this.getMessages(this.userName);

				this.$nextTick(function(){
					
					if(this.user.model) this.messagesChannel()

				});

			},
			mounted : function(){},
			watch : {

				'user.model' : function(user){

					if(user){
						this.messagesChannel()
					}

				}

			}
			

		};
	
</script>

<style type="text/css" scoped>


		@media only screen and (max-width: 700px){

			.text-input-msg{
				z-index: 9999 !important;
			}

			.overlay-wrap,
			.main-wrap{
				z-index: 99999 !important;
			}

			.file-wrapper{

				height: 100%;
				width: 100%;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;


			}

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

		.list-group-item{
			border : 0;
		}

		.app-message-bubble{
			border: .05em solid rgba(211, 211, 211, .5);
			border-radius: 15px;
			width: auto;
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
		.navbar{
			/*padding-left: 4px;
			padding-top: 2px;
			padding-bottom: 2px;*/
		}

</style>