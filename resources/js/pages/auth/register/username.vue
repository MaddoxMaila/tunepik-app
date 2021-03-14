<template>

	<div class="reg-wrapper card no-border">
		
		<form @submit.prevent="next()" @keydown="form.onKeydown($event)">
			
			<Navigation>
				 
				<div class="media-body ml-3">
					<span class="app-max-text">
						Choose Your Username
					</span>
				</div>
				<div class="media-right align-self-center">
					
					<span class="app-small-text">
						1 of 3
					</span>

				</div>

			</Navigation>
			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>

			<div class="over-wrap card-body no-border">
				<div class="form-group row">
		      <label class="col-md-3 col-form-label text-md-right">
		      	Your Username
		      </label>
		      <div class="col-md-7">
		        <input v-model="form.name" placeholder="username" :class="{ 'is-invalid': form.errors.has('name') }" class="form-control" type="text" name="name" />
		        <has-error :form="form" field="name" ></has-error>
		      </div>
		    </div>

		    <div class="form-group row">
		      <div class="col-md-7 offset-md-3 d-flex">
		        <!-- Submit Button -->
		        <v-button :loading="form.busy" :block="true" :type="'primary'">
		          Next
		        </v-button>
		      </div>
		    </div>
	  </div>
		</form>

		<div class="space-large"></div>
		<div class="space-large"></div>
		<div class="space-large"></div>
		<div class="space-large"></div>

	</div>
	
</template>

<script type="text/javascript">
	
	import Form from 'vform'
	import Navigation from '../../../components/mobile/root/Navigation'
	import { mapMutations, mapGetters } from 'vuex'
	import axios from 'axios'

	export default {

		name 		: 'username',
		data 		: function(){

			return { 

				 response : {

				 	error 		: false,
				 	unique 		: '',
				 	message		: ''

				 },

			}

		},
		components : {
			Navigation
		},
		methods : {

			...mapMutations("auth", ['username']),
			next :  function(){

				// if(this.form.name === '') return this.form.errors.set('name', 'You Must Have A Username')

				

			 this.form.get(`/api/verify/username/${this.form.name}`).then(({ data }) => {

				 	this.response = data

				 	this.username(this.form.name.toString().trim())

				 //  if(this.response.error) return this.form.errors.set('name', this.response.error)

					// if(!this.response.unique) return this.form.errors.set('name', this.response.message)

					this.$router.push({ name : 'register.email' })

			 })

			},

		},
		computed : {

			...mapGetters("auth", ['register']),
			form : function(){
				return new Form({ name : this.register.username })
			}

		}

	};
	
</script>

<style type="text/css" scoped>
	
	@media only screen and (max-width: 700px){

		.card-body,
		.card-header,
    .card{
      width: 100%;
      height: 100%;
      min-width: 100%;
      border : 0;
    }

		.card {

			width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99999 !important;
			background-color: #fff;

		}

		.next-btn{
			position: relative;
			top: -4px;
		}

	}

	@media only screen and (min-width: 700px){}

</style>