<template>

  <div class="media pl-1 pr-1 mt-2 mb-2">

    <!-- User Image -->
    <Picture class="pl-1" :height="40" :width="40" :user="post" ></Picture>
          
   <!--  <img  height="35" width="35" :src="'' + post.getImgs().profile" /> -->

    <div class="media-body ml-3 align-self-center">
      
      <router-link v-bind:to="{ name : 'profile', params :{ username : post.getBasic().handle } }">

        <a @click="SET_PROFILE(post)">
         <!-- <span class="app-bolder-text">{{ post.getBasic().name }}</span>
         <span class="profile-user-handle app-post-text" style="display: block;line-height: 1;">
            @{{ post.getBasic().handle }}
          </span> -->
          <user-name :user="post"></user-name>
        </a>

      </router-link>

      <!-- <span class="app-grey-text-lg">&middot; {{ post.getPost().now }}</span> -->

    </div>

    <!-- User Options Button -->

    <div class="post-header-icon-wrapper "> <!-- pr-2 align-self-center b-media -->
      
      <div class="options-round">
        
        <a class="post-header-icon" @click="show = !show">
        
          <!-- <svg-vue icon="arrowdown" class="app-icon" style="width:20px;height:20px;" ></svg-vue> -->
          <Icon :icon="'arrowdown'" :height="20" :width="20"></Icon>

        </a>

      </div>

      <!-- Insert PopUp Window -->
      <div class="overlay-wrap" v-show="show">
        
        <div class="main-wrap card no-border" v-show="show" :class="[ show ? 'fade-in' : 'fade-out']">
          
          <div class="media card-header no-border">
            
            <div class="media-left align-self-center">
              
              <Picture :height="30" :width="30" :user="post"></Picture>

            </div>

            <div class="media-body pl-3 align-self-center">
              
              <span class="app-max-text">
                Options <!-- {{ headerText }} -->
              </span>
              <span class="block-text app-grey-text-lg">
                (@{{ post.getBasic().handle }})
              </span>

            </div>
            <div class="align-self-center media-right">
              
              <a @click="show = !show">
                <i class="fa fa-times app-fa"></i>
              </a>

            </div>

          </div>
          <div class="card-body no-pad no-border">
            
            <PostOptions :post="post"></PostOptions>

          </div>

        </div>

      </div>

    </div>

  </div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import PostOptions from '../popupBuilders/PostOptions'
  import { mapMutations } from 'vuex'

    export default {

        name        : "HeaderBodyBuilder",
        components  : {

          PostOptions

        },
        data        : () => {

          return {

            screen : globs.app.isMobile,
            header : '',
            show   : false

          }

        }, 
        props   : ['post'],
        methods  : {

          ...mapMutations('profile', ['SET_PROFILE']),

        },
        computed : {

          headerText : function(){

              this.header = `@${this.post.getBasic().handle} Post Options`;
              return this.header;

          },

        }

    };
</script>

<style scoped>

  .options-round{

    border-radius: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;

  }

</style>
