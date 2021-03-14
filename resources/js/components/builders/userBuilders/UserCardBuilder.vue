<template>

		 
		<div class="user-card-wrapper mt-1">

			<!-- User Image! -->
				<div class="user-image-wrap pt-2">
				   
				   <center>
				   	 
				   	 <Picture :height="60" :width="60" :user="user" ></Picture>

				   	  <div class="user-name-wrap mt-1">
				   	  	
				   	  	<router-link :to="{ name : 'profile', params : { username : user.getBasic().handle } }" >

				              <a @click="SET_PROFILE(user)">
						   	  			<user-name :user="user" :limit="14"></user-name>
						   	  		</a>

				   	  	</router-link>

				   	  </div>
				   	  <span class="app-grey-text-sm" > <!-- v-if="user.getInfo().bio == null" -->
								<i class="app-fa fas fa-calendar-alt mr-1"></i>
								Joined {{ user.getBasic().date }}
							</span>
							<!-- <span class="app-post-text" v-else>

								{{ trim(user.getInfo().bio, 30) }}

							</span> -->

				   </center>

				   <div class="space-small"></div>

				   <!-- Follow Button Place -->
				   <div class="user-follow-btn pl-2 pr-2" style="width: 100%;">
				   	
				   		<center>
				   			<FollowButton :user="user" :classes="'btn-sm btn-block'"></FollowButton>
				   		</center>

				   </div>

				   <div class="space-medium"></div>
				   
				   <!-- User Stats -->
				   <!-- <div class="user-stats-wrapper m-0 grey-matter">
				   	
				   		<table class="table">
				   				<tr>
				   					<td class="">
				   						
				   						<center>
				   							
				   							<span class="icon-wrap">
				   							
					   							<svg-vue icon="gallery" class="app-icon user-list-icon"></svg-vue>

					   						</span>
					   						<br />
					   						<span class="app-grey-text-lg">
					   							{{ user.getMedia().images }}
					   						</span>

				   						</center>

				   					</td>
				   					<td class="">
				   						
				   						<center>
				   							
				   							<span class="icon-wrap">
				   							
					   							<svg-vue icon="video" class="app-icon user-list-icon"></svg-vue>

					   						</span>

					   						<br />

					   						<span class="app-grey-text-lg">
					   							{{ user.getMedia().videos }}
					   						</span>

				   						</center>

				   					</td>
				   					<td class="">
				   						
				   						<center>
				   							<span class="icon-wrap">
				   							
					   							<svg-vue icon="audio" class="app-icon user-list-icon"></svg-vue>

					   						</span>

					   						<br />
					   						<span class="app-grey-text-lg">
					   							{{ user.getMedia().audios }}
					   						</span>

				   						</center>

				   					</td>
				   				</tr>
				   		</table>

				   </div> -->

				</div>


		</div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import FollowButton from './FollowButton'
  import { mapMutations } from 'vuex'

    export default {

        name       : "UserCardBuilder",
        data : () => ({
        	
        }),
        components : {

        	FollowButton

        },
        data       : () => {

          return {

            screen : globs.app.isMobile,
            trim  : globs.trim,

          }

        },
        props : ['user'],
        methods : {

        	...mapMutations('profile', ['SET_PROFILE'])

        }

    };
</script>

<style scoped>

		@media screen only and (min-width: 700px){

			.user-card-wrapper{
				  width  : 200px;
				  height : 260px;
				  /*border : .05em solid lightgrey;*/
				  -webkit-box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
	        box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
	        border-radius: 12px;
			}

		}

		@media screen only and (max-width: 700px){

			.user-card-wrapper{
				  width  : 49.5%;
				  max-height : 200px;
				  min-height: 200px;
				  /*border : .05em solid lightgrey;*/
				  -webkit-box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
	        box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
	        border-radius: 12px;
	        background-color: rgba(211, 211, 211, .125);
			}

		}

		.user-list-icon{

			width  : 18px;
			height : 18px;

		}
		.user-bio{
			width : 95%;
			height : 36px;
			/*max-height : 35px;*/
			overflow : hidden;
		}

</style>
