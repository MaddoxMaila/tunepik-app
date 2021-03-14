<template>
  
  <div class="row">
    <div class="col-lg-8 m-auto">
      <div class="wrapper">
      <div class="space-large visible-lg"></div>
      <div class="space-large visible-lg"></div>
      <div class="space-large visible-lg"></div>
      <div class="space-large visible-lg"></div>

      <div class="card no-border">
        
        <div class="card-header no-border" v-if="!screen">

          <div class="media">
            
            <div class="media-body align-self-center">
              
              <span class="app-max-text">Login Into Your TunePik Account</span>
              <div class="space-small"></div>
              <span class="app-grey-text-sm">Login With A Registered TunePik Account To Unlock Full Features</span>

            </div>
            <div class="media-right align-self-center">
                
                <v-button @click.native="toRegister()" :type="'primary'">
                  
                  Create Account

                </v-button>

            </div>

          </div>

        </div>
        <div class="card-body no-border">

          <div class="wrapper" v-if="screen">

            <div class="media">
              <div class="media-left">
                <Name></Name>
              </div>
              <div class="media-body align-self-center ml-2">
                
                

              </div>
              <div class="media-right align-self-center">

                <v-button @click.native="toRegister()" :type="'primary'">
                  Create Account
                </v-button>

              </div>

            </div>

          <div class="space-large visible-xs"></div>
          
          <div class="text-wrapper p-2 pl-1">
              
              <span class="app-max-text">Login Into Your TunePik Account</span>
              <div class="space-small"></div>
              <span class="app-grey-text">Login With A Registered TunePik Account To Unlock Full Features</span>

          </div>
          

          </div>
          
          <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('email') }}</label>
            <div class="col-md-7">
              <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" type="email" name="email">
              <has-error :form="form" field="email" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('password') }}</label>
            <div class="col-md-7">
              <input v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }" class="form-control" type="password" name="password">
              <has-error :form="form" field="password" />
            </div>
          </div>

          <!-- Remember Me -->
          <div class="form-group row">
            <div class="col-md-3" />
            <div class="col-md-7 d-flex">
              <checkbox v-model="remember" name="remember">
                {{ $t('remember_me') }}
              </checkbox>

              <router-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                {{ $t('forgot_password') }}
              </router-link>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <div class="media">
                
                <div class="media-left">
                  
                  <v-button :loading="form.busy" :type="'primary'">
                    {{ $t('login') }}
                  </v-button>

                </div>
                <div class="media-body"></div>
                <div class="media-right pl-2">
                  
                  <router-link :to="{ name : 'selfie' }" >
                    <v-button @click.native="" :type="'primary'">
                      Selfie ID Login &nbsp; <i class="fa fa-camera app-fa"></i>
                    </v-button>
                  </router-link>

                </div>

              </div>


              <!-- GitHub Login Button -->
              <!-- <login-with-github /> -->
            </div>
          </div>
        </form>

        <div class="space-large visible-xs"></div>
        <div class="space-large visible-xs"></div>
        <div class="space-large visible-xs"></div>

        </div>

      </div>
    </div>

  </div>
 </div>
</template>

<script>
import Form from 'vform'
import LoginWithGithub from '~/components/LoginWithGithub'
import globs from '../../tunepik/attack.js'

export default {
  middleware: 'guest',

  components: {
    LoginWithGithub
  },

  metaInfo () {
    return { title: this.$t('login') }
  },

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false,
    screen  : globs.app.isMobile
  }),

  methods: {
    async login () {
      // Submit the form.
      const { data } = await this.form.post('/api/login')

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.$router.push({ name: 'home' })
    },

    toRegister : function(){

      this.$router.push({ name : 'register.username' });

    }

  }
};
</script>

<style type="text/scss" scoped="">
  
  @media only screen and (min-width: 700px){



  }

  @media only screen and (max-width: 700px){

    .card-body,
    .card{
      width: 100%;
      height: 100%;
      min-width: 100%;
    }

    .card{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99999 !important;
    }

  }

</style>
