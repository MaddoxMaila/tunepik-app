<template>

		<div class="wrapper">

			
			
			<button :class="[classes, user.getActivity().youBlock ? danger : success]" class="btn" @click="user.getActivity().youBlock ? (show = !show) : blocker()">
				<div class="spinner-grow text-success spinner-grow-sm" role="status" aria-hidden="true" v-if="block.loading"></div>
				<span v-else>
					{{ user.getActivity().youBlock ? 'Unblock' : 'Block' }}
				</span>

			</button>



			<div class="overlay-wrap" v-show="show" v-if="user.getActivity().youBlock" >
        
        <div class="main-wrap card no-border" v-show="show" :class="[ show ? 'fade-in' : 'fade-out']">
          
          <div class="media card-header no-border">

            <div class="media-left align-self-center">
              
              <Picture :width="35" :height="35" :user="user"></Picture>

            </div>
            
            <div class="media-body align-self-center pl-3">
              
              <span class="app-max-text">
                Block
              </span>
              <span class="block-text app-grey-text-lg">(@{{ user.getBasic().handle }})</span>

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
                  <span class="app-grey-text-lg">
                    Are You Sure You Want To Unblock
                    <span class="app-bolder-text">
                    @{{ user.getBasic().handle }}?
                  </span>
                  </span>
                </center>
              </div>
              <div class="list-group-item">
                
                <v-button :loading="loading" @click.native="blocker()" :type="'primary'" class="mobile-share-control-btn yes">
        
                  Unfollow 

                </v-button>
                <v-button @click="show = !show" :type="'danger'" class="mobile-share-control-btn no">
                  Cancel
                </v-button>

              </div>

            </div>

          </div>

        </div>

      </div>


		</div>
	
</template>

<script type="text/javascript">

		import axios from 'axios'
		import PopUpWindow from '../popupBuilders/PopUpWindow'

		export default {

			name  			: "BlockButton",
			components  : {

				PopUpWindow

			},
			data 				: function(){

				return {

				  success : 'btn-danger',
				  danger  : 'btn-danger',
				  show    : false,
					block : {

							loading : false,
							message : '',
							error   : false,

					}

				}

			},
			props    : ['User', 'classes'],
			methods  : {

				blocker  : async function(){

						this.block.loading = true

						const { data } = await axios.post(`/api/react/block/${this.user.getBasic().id}`);

						this.block.error = data.error;
						this.block.message = data.message;

						this.user.getActivity().youBlock = data.blocked;

						this.block.loading = false;

				}

			},
			computed : {

				user  : {

					get(){

						return this.User;

					},
					set(user){

						this.User = user;

					}

				},
				header : function(){

					return `Unblock @${this.user.getBasic().handle}`;

				}


			}

		};
	
</script>

<style type="text/css" scoped>

  .list-group-item{

  	border: 0;

  }
	
</style>