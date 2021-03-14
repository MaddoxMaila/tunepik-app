<template>

	<div class="button-wrapper">
		
		<!-- Follow Button -->

    <template v-if="user.getActivity().me">
      
        <router-link :to="{ name : 'profile', params : { username : user.getBasic().handle } }">
          
          <v-button @click.native="SET_PROFILE(user)" :block="true" :type="'primary'">
            Your Profile
          </v-button>

        </router-link>

    </template>
    <template v-else>
      
      <!-- If user Is Following! -->
      <!-- <template v-if="model.getActivity().following">



      </template>
      <template v-else>
        
      </template> -->


      <!-- Confirm Unfollow Pop Up Box -->

      <div class="overlay-wrap" v-show="show" v-if="user.getActivity().following" >
        
        <div class="main-wrap card no-border" v-show="show" :class="[ show ? 'fade-in' : 'fade-out']">
          
          <div class="media card-header no-border">

            <div class="media-left align-self-center">
              
              <Picture :width="40" :height="40" :user="user"></Picture>

            </div>
            
            <div class="media-body align-self-center pl-3">
              
              <span class="app-max-text">
                Unfollow
              </span>
              <span class="block-text app-grey-text-lg">
                @{{ user.getBasic().handle }}
              </span>

            </div>
            <div class="media-right align-self-center">
              
              <a @click="show = !show">
                
                <i class="fa fa-times app-fa"></i>

              </a>

            </div>

          </div>
          <div class="card-body no-border">
            
            <div class="list-group">
          
              <div class="list-group-item">
                <center>
                  <span class="app-small-text">
                    Are You Sure You Want To Unfollow 
                    <span class="app-bolder-text">
                    @{{ user.getBasic().handle }}?
                  </span>
                  </span>
                </center>
              </div>
              <div class="list-group-item">
                
                <v-button :loading="loading" @click.native="followed()" :type="'primary'" class="mobile-share-control-btn yes">
        
                  Unfollow 

                </v-button>
                <v-button @click.native="show = !show" :type="'danger'" class="mobile-share-control-btn no">
                  Cancel
                </v-button>

              </div>

            </div>

          </div>

        </div>

      </div>


<!--       <PopUpWindow :headerText="headerText" :show="overlay.confirm.isOpen" v-if="user.getActivity().following">
        
        

      </PopUpWindow> -->



      <!-- Follow Buttons -->

      <v-button @click.native="show = !show" :loading="loading" :block="true" :type="'primary'" v-if="user.getActivity().following">
        
          {{ Message }}

      </v-button>

      <v-button :loading="loading" :nativeType="'button'" :block="true" @click.native="followed()" v-else>
        
        {{ Message }}

      </v-button>

      <!-- <button v-on:click="toggleConfirm()" class="btn btn-info" v-bind:class="[classes]" v-if="user.getActivity().following">

        <div class="spinner-grow text-success spinner-grow-sm" role="status" aria-hidden="true" v-if="user.loading"></div>
        
        <span class="" v-if="!user.loading">
          {{ Message }}
        </span>

      </button>

      <button v-on:click="followuser(user)" class="btn btn-default" v-bind:class="[classes]" v-else>

        <div class="spinner-grow text-success spinner-grow-sm" role="status" aria-hidden="true" v-if="user.loading"></div>

        <span class="" v-if="!user.loading">
          {{ Message }}
        </span>

      </button> -->

    </template>

	</div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import {mapGetters, mapActions, mapMutations } from 'vuex'
  import PopUpWindow from '../popupBuilders/PopUpWindow'
  import axios from 'axios'

    export default {

        name    : "FollowButton",
        components : {

          PopUpWindow

        },
        data    : () => {

          return {

            screen      : globs.app.isMobile,
            loading      : false,
            classActive : '',
            message     : '',
            show        : false,

          }

        },
        props   : ['user', 'classes'],

        methods : {

          ...mapActions("follow", ['setFollowState', 'followuser']),
          ...mapActions('tunepik', ['toggleConfirm']),
          ...mapMutations('profile', ['SET_PROFILE']),
          ...mapMutations('tunepik', ['SNACK_BAR']),
          followed : async function(){

            this.loading = true

            const { data } = await axios.post(`${globs.api}follow/followuser/${this.user.getBasic().id}`)

             if(data.error){

              this.SNACK_BAR({ isOpen : true, message : data.message, theme : 'danger' })

             }else{

              this.user.getActivity().followers = data.followers
              this.user.getActivity().follows   = data.following
              this.user.getActivity().following = data.follow
            }

            this.loading = false

            console.log(this.loading)

            if(this.show) this.show = !this.show

          }

        },
        computed : {

          ...mapGetters("follow", ["follow"]),
          ...mapGetters('tunepik', ['overlay']),
          headerText : function(){

            return `Unfollow`; /*@${this.user.getBasic().handle}*/

          },
          btnStyle : function(){

            this.classActive = this.class;

            return this.classActive;

          },
          Message : function(){

            this.message = this.user.getActivity().following ? 'Following' : 'Follow';

            return this.message;

          }

        }

    };
</script>

<style scoped>

  .button-wrapper{
    margin : 0;
    padding : 0;
    width: 100%;
  }

  .list-group-item{
    border : 0;
  }




</style>
