<template>

	<div class="wrapper p-2">
	   
	   <masonry
			   :cols="squares"
			   :gutter="{default : '3px', 700 : '3px', 400 : '3px'}"
					>
	   		
	   		<div class="skeleton-shimmer p-3" :class="[classes]" v-for="(item, i) in list"></div>

	   </masonry>

	</div>
	
</template>

<script>

  import globs from '../../../tunepik/attack.js'

  export default {

  	name 		 : "GridSkeleton",
  	data 		 : function(){

  		return {

  			list  : globs.limit,
  			three : 'three-cols',
  			two   : 'two-cols',

  		}

  	},
  	props : ['cols'],
  	computed : {

  		squares : function(){

  			return {
  				  default : 2, 
	  			  1000 : 3, 
	  			  700 : this.cols ? this.cols : 3, 
	  			  400 : this.cols ? this.cols : 3
  		  }

  		},
  		classes : function(){

  			return (this.cols ? (this.cols == 2 ? 'two-cols' : 'three-cols') : 'three-cols')

  		}

  	}


  };
	
</script>

<style scoped>

		@media only screen and (min-width: 700px){

			.three-cols{
				width: 100%;
				height: 250px;
				margin: 1.5px;
				border-radius: 15px;
			}

			.two-cols{
				width : 100%;
				height: 250px;
				margin: 1.5px;
				border-radius: 15px;
			}

		}

		@media only screen and (max-width: 700px){

			.three-cols{
				width: 100%;
				height: 160px;
				margin: 0 0 3px 0;
				border-radius: 5px;
			}

			.two-cols{
				width : 100%;
				height: 160px;
				margin: 0 0 3px 0;
				border-radius: 5px;
			}

		}
	
</style>