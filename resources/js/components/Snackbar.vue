<template>

	<div class="snackbar" v-show="snackbar.isOpen" :style="{ backgroundColor : bgColor }" >
		
		<div class="media">
			
			<div class="media-body pl-2 align-self-center">
				
				<span class="snackbar-text app-small-text">
					{{ snackbar.message }}
				</span>

			</div>
			<div class="media-right align-self-center b-media">
				
				<a class="remove-btn" @click="SNACK_BAR({ isOpen : false })">
					
					<i class="fa fa-times app-fa" ></i>

				</a>

			</div>

		</div>

	</div>
	
</template>

<script type="text/javascript">
	
	import { mapGetters, mapMutations } from 'vuex'

	export default {

		name 		: 'Snackbar',
		methods  : {

			...mapMutations('tunepik', ['SNACK_BAR']),

		},
		computed : {

			...mapGetters('tunepik', ['overlay', 'theme']),
			snackbar : function(){
				return this.overlay.snackbar
			},
			bgColor : function(){

				return this.theme.icons.color == this.theme.colors.dark ? this.theme.colors.blue : this.theme.icons.color

			}

		}

	};
	
</script>

<style type="text/css" scoped>

	.danger{

		background-color: red;

	}

	.info{

		background-color: #5bc0de;

	}

	.app-fa{
		width : 16px;
		height: 16px;
	}

	@media only screen and (min-width: 700px){

		.snackbar{
    width: 23%;
    position: fixed;
    bottom: 30px;
    left: 38%;
    background-color: #5bc0de;
    z-index: 9999 !important;
    height: auto;
    padding-bottom: 0.5%;
    padding-top: 0.5%;
    border-radius: 2px;
    -webkit-animation: fadein 0.3s;
    animation: fadein 0.3s;
  }

/*  .app-fade{
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }*/

  .snackbar-text{
    color: #fff;
    font-size: 11pt;
    font-weight: 600;
  }
  


  /*  END OF NEW STYLES*/

	  @-webkit-keyframes fadein {
	  from {bottom: 0; opacity: 0;} 
	  to {bottom: 30px; opacity: 1;}
		}

		@keyframes fadein {
		  from {bottom: 0; opacity: 0;}
		  to {bottom: 30px; opacity: 1;}
		}

	}

	@media only screen and (max-width: 700px){

	.snackbar{
    width: 98%;
    position: fixed;
    top: 48px;
    left: 4px;
    z-index: 99999 !important;
    height: auto;
    padding: 0;
    /*border-radius: 25px;
    box-shadow: 0px 1px 1px 1px rgba(211, 211, 211, .25);*/
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }

  @-webkit-keyframes fadein {
  from {top: 0; opacity: 0;} 
  to {top: 60px; opacity: 1;}
	}

	@keyframes fadein {
	  from {top: 0; opacity: 0;}
	  to {top: 60px; opacity: 1;}
	}


	}
	
</style>