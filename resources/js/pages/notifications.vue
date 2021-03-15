<template>

	<div class="wrapper">

		<div v-if="screen">

			<Navigation>
					
					<div class="media-body align-self-start">
							
							<span class="app-max-text">
								Notifications
							</span>
							<span class="profile-user-handle app-post-text block-text" style="line-height: 1;">
                for (@{{ model.getBasic().handle }})
              </span>

					</div>
					<div class="media-right align-self-center">

						<a @click="show = !show">
							<i class="app-fa fa fa-trash"></i>
						</a>

						<div class="overlay-wrap" v-show="show">
							
							<div class="main-wrap card no-border" v-show="show">
								
								<div class="card-header media no-border">
									
									<Picture :height="40" :width="40" :user="model"></Picture>
									<div class="media-body pl-3 align-self-center">
										
										<span class="app-max-text">Delete All Notifications</span>
										<span class="block-text app-grey-text-lg">(@{{ model.getBasic().handle }})</span>

									</div>
									<div class="media-right align-self-center">
										
										<a @click="show = !show">
                
			                <i class="fa fa-times app-fa"></i>

			              </a>

									</div>

								</div>
								<div class="card-body no-border list-group">

									<div class="list-group-item no-border">
										
										<center>
											<span class="app-small-text">Are You Sure You Want To Delete All Your Notifications?</span>
										</center>

									</div>
									
									<div class="list-group-item no-border">
                
		                <v-button :loading="loading" @click.native="deleteNotifications()" :type="'danger'" class="mobile-share-control-btn yes">
		        
		                  Delete&nbsp;<i class="fa fa-times app-fa"></i>

		                </v-button>
		                <v-button @click.native="show = !show" :type="'primary'" class="mobile-share-control-btn no">
		                  Cancel
		                </v-button>

		              </div>

								</div>

							</div>

						</div>

					</div>

			</Navigation>
			<div class="space-large"></div>
			<div class="space-medium"></div>
			<!-- SHOW NOTIFICATIONS -->

			<NotificationsBundler :notifications="notifications"></NotificationsBundler>

		</div>
		<div class="list-group" v-else>

			<div class="list-group-item item-header">
				
				<!-- DESKTOP NOTIFS HEADER -->

			</div>
			<!-- ADD MORE NOTIFICATIONS -->
			<NotificationsBundler :notifications="notifications"></NotificationsBundler>

		</div>

	</div>
	
</template>

<script>

   import { mapGetters, mapActions, mapMutations } from 'vuex'
   import globs from '../tunepik/attack.js'
   import Navigation from '../components/mobile/root/Navigation'
   import NotificationsBundler from '../components/builders/notifBuilders/NotificationsBundler'
   import axios from 'axios'

   export default {

   	 name : "Notifications",
   	 scrollToTop : false,
   	 data : () => ({
   	 	screen : globs.app.isMobile,
   	 	show   : false,
   	 	loading : false,
   	 	message : ''
   	 }),
   	 components : {

   	 	Navigation,
   	 	NotificationsBundler

   	 },
   	 methods : {

   	 	...mapActions('notifications', ['getNotifications']),
   	 	...mapMutations('notifications', ['setNotifications']),
   	 	...mapMutations('tunepik', ['SNACK_BAR']),
   	 	deleteNotifications : async function(){

   	 		/* Start Request */
   	 		this.loading = true

   	 	 	 axios.get('/api/notif/delete').then( data => {

   	 	 	 		this.setNotifications({

   	 	 	 			list 		: false,
							error 	: data.error,
							message : data.message,
							notificationsList : []

   	 	 	 		})

   	 		    this.loading = false
   	 		    this.SNACK_BAR({ isOpen : true, message : data.message, theme : 'success' })

   	 	 	 }).catch(e => {

   	 	 	 		this.SNACK_BAR({ isOpen : true, message : e.toString(), theme : 'success' })

   	 	 	 })

   	 	}

   	 },
   	 computed : {

   	 	...mapGetters('notifications', ['notifications']),
   	 	...mapGetters('auth', ['model'])

   	 },

   	 created(){

   	 	this.getNotifications();

   	 }

   };
	

</script>


<style scoped>
	

</style>