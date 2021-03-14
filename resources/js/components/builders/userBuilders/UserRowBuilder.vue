<template>

	<!-- Root Level Wrapper -->
	<div class="list-group-item">
		
		<div class="media">
			
			<!-- User Image! -->

			<Picture :height="40" :width="40" :user="user" ></Picture>

			<div class="media-body ml-3 pr-1">

        <div class="media">
          
          <div class="media-body align-self-center">
            
            <span class="name-wrapper">
          
              <router-link :to="{ name : 'profile', params : { username : user.getBasic().handle } }">
                
                  <a @click="SET_PROFILE(user)">
                    <!-- <span class="app-bold-text">
                    {{ trim(user.getBasic().name, 20) }}
                    </span> -->
                    <user-name :user="user"></user-name>
                  </a>
                

              </router-link>

            </span>

          </div>

          <!-- User Follow Btn Wrapper -->
          <div class="user-follow-btn align-self-center">

            <BlockButton :user="user" :classes="'btn-sm btn-block'" v-if="user.getActivity().youBlock"></BlockButton>
            <FollowButton :user="user" :classes="'btn-sm btn-block'" v-else></FollowButton>

          </div>

        </div>
			

				<div class="text-breaker"></div>
				<span class="app-grey-text" v-if="user.getInfo().bio == null">
					<i class="app-fa fas fa-calendar-alt mr-1"></i>
					Joined {{ user.getBasic().date }}
				</span>
				<span class="app-post-text" v-else>

					{{ trim(user.getInfo().bio, 45) }}

				</span>

			</div>

		</div> <!-- End Of Header Media -->

	</div> <!-- End Of Root Level Wrapper -->

       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import FollowButton from './FollowButton'
  import BlockButton from './BlockButton'
  import { mapMutations } from 'vuex'

    export default {

        name    : "UserRowBuilder",
        components :{

        	FollowButton,
        	BlockButton

        },
        data    : () => {

          return {

            screen : globs.app.isMobile,
            trim : globs.trim

          }

        },
        props : ['user'],
        methods : {

        	...mapMutations('profile', ['SET_PROFILE']),

        }

    };
</script>

<style scoped>

  .list-group-item{
  	/*padding-left: 15px;
  	padding-right: 15px;
  	padding-bottom: 5px;
  	padding-top: 5px;*/
  	border : 0;
  	/*border-bottom : .04em solid rgba(211, 211, 211, .4);*/
  }
  .text-breaker{

  	height: 0;

  }

  .app-fa{
  	color : rgba(211, 211, 211, 1);
  }

</style>
