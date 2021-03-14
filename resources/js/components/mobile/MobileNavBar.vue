<template>

  <div class="navbar app-nav navbar-expand-sm fixed-bottom">
    <table class="nav-table">
      <tr>
        <td class="">
          <center>
            <router-link :to="{ name : 'home' }" >
              <span class="app-home-icon app-nav-span" :style="{backgroundColor : `rgba(${bg.home}, 0.3)`}">
                <a @click="makeColor('home')">
                  <Icon :icon="'home'" :width="iconSize" :height="iconSize" :color="colors.home" ></Icon>
                </a>
              </span>
            </router-link>
          </center>
        </td>
        <td class="">
            <center>
                <router-link :to="{ name : 'search' }" class="app-search-btn" >
                    <span class="app-search-xs app-nav-span" :style="{backgroundColor : bg.search}">
                     <a @click="makeColor('search')">
                      <Icon :icon="'search'" :width="iconSize" :height="iconSize" :color="colors.search"></Icon>
                     </a>
                    </span>
                    <span class="app-badge msg-badge icon-text icon-badge"></span>
                </router-link>
            </center>
        </td>
        <td class="">
          <center>
            <router-link :to="{ name : 'createPost' }" class="app-messages-btn" >
              <span class="app-message-icon app-nav-span" :style="{backgroundColor : bg.add}">
                <a @click="makeColor('add')">
                  <Icon :icon="'add'" :width="iconSize" :height="iconSize" :color="colors.add"></Icon>
                </a>
                </span>
            </router-link>
          </center>
        </td>
        <td class="">
            <center>
                <router-link :to="{ name : 'chats' }" class="app-search-btn" >
                    <span class="app-search-xs app-nav-span" :style="{backgroundColor : bg.messages}">
                     <a @click="makeColor('messages')">
                      <Icon :icon="'messages'" :width="iconSize" :height="iconSize" :color="colors.messages"></Icon>
                     </a>
                    </span>
                    <span class="app-badge msg-badge icon-text icon-badge" :style="{backgroundColor : indicatorColor}">
                      {{ counter.messages }}
                    </span>
                    <!-- <span class="app-grey-text-sm visible-lg visible-xs icon-text">Search</span> -->
                </router-link>
            </center>
        </td>
        <td class="">
          <center>
            <router-link :to="{ name : 'notifications' }" class="app-notification-btn">
              <span class="app-nav-span" :style="{backgroundColor : bg.notifications}">
                <a @click="makeColor('notifications')" >
                  <Icon :icon="'notifications'" :width="iconSize" :height="iconSize" :color="colors.notifications" ></Icon>
                </a>
              </span>
                <span class="app-badge notif-badge icon-text icon-badge" :style="{backgroundColor : indicatorColor}">
                  {{ counter.notifications }}
                </span>
                <!-- <span class="app-grey-text-sm visible-lg visible-xs icon-text">Notifs
                </span> -->

            </router-link>
          </center>
        </td>
<!--         <td class="app-nav-tab profile-tab app-tab visible-xs">
          <center>
            <div class="space-small"></div>
            <div class="img-loading skeleton-shimmer" v-if="loading"></div>
            <div class="" v-else>

              <div class="" v-if="check">

                  <router-link :to="{ name : 'profile', params : { username : model.getBasic().handle } }" class="nav-user-link">

                    <img class="img-circle rounded-circle nav-user-img" :src="'' + model.getImgs().profile" width="30" height="30" />
                    <span class="app-grey-text-sm visible-lg visible-xs nav-user-handle"></span>

                  </router-link>
              </div>

            </div>
          </center>
        </td> -->

      </tr>
    </table>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name : "MobileNavBar",
  data: () => ({

    appName: window.config.appName,
    iconSize : 30,
    colors : {
      home  : '',
      message : '',
      notifications : '',
      add : '',
      search : ''
    },
    bg : {
      home  : '',
      message : '',
      notifications : '',
      add : '',
      search : ''
    },
    indicatorColor : '',
    counter : {
      notifications : '',
      messages : ''
    },
    pathname : window.location.pathname,

  }),

  computed: {

    ...mapGetters("tunepik", ['theme']),
    ...mapGetters("auth", ['model']),
    path : function(){return this.pathname},

  },
  methods: {
    makeColor : function(icon){

      let keys = ['home', 'search', 'messages', 'add', 'notifications']

      for(let i = 0; i <= 4; i++){

        if(keys[i] === icon) {

          this.colors[keys[i]] = this.theme.icons.type === 'default' ? this.theme.colors.blue : this.theme.icons.color

          this.bg[keys[i]] = `rgba(211, 211, 211, .125)`

          this.indicatorColor = this.colors[keys[i]]

        }else {

            this.colors[keys[i]] = this.theme.type === 'theme-dark' || this.theme.type === 'theme-dim' ? (this.theme.icons.type === 'default' ? this.theme.colors.light : this.theme.colors.lightgrey) : this.theme.colors.darkgrey
            this.bg[keys[i]] = 'transparent'/*this.colors[keys[i]]*/

          }

      }

    },
    counterChannel : function () {

      if(!this.model) return

      window.Echo
        .private(`counter.${this.model.getBasic().id}`)
        .listen('.user-counter', data => {

          this.counter.notifications = data.notifications.count === 0 ? '' : data.notifications.count
          this.counter.messages = data.messages.count === 0 ? '' : data.messages.count

        })
    }
  },
  watch : {

    '$route.path' : function(newval, oldval){

      if(newval === oldval) return

      switch (newval) {

        case '/home':

            this.makeColor('home')

          break;

        case '/messages':

            this.makeColor('messages')

          break;

        case '/notifications':

            this.makeColor('notifications')

          break;

        case '/create/post':

            this.makeColor('add')

          break;

        case 'search' :

            this.makeColor('search')

        default:

          this.makeColor('none')

          break;
      }

    }

  },
  mounted : function(){
    this.$nextTick(function () {
      this.makeColor('home')
      this.counterChannel()
    })
  }
};
</script>

<style scoped>


  .nav-table{
    width : 100%;
  }

  .app-icon{
    height : 28px;
    width : 28px;
  }

  .app-nav-table{

    position: relative;
    top: -5px;

  }

/*  .app-nav{
    height: auto;
  }
*/
  .img-loading{

    width: 30px;
    height: 25px;
    border-radius: 5px;

  }

  .app-nav-span{
    padding : 5px;
    border-radius: 45%;
  }

  .app-badge{
    position: fixed;
    left: 4px;
  }

</style>
