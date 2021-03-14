<template>
	
	<div class="wrapper card no-border">
		
		<Navigation v-if="screen">
			
			<div class="media-body align-self-center">
				
					<span class="app-max-text">
						Display
					</span>

			</div>
			<div class="media-right align-self-center">
				
				<v-button @click="history.back()" class="btn-top" :type="'primary'">
					Done
				</v-button>

			</div>

		</Navigation>
		<div class="card-header" v-else>
			
			<center>
				<span class="app-max-text">
					Display
				</span>
			</center>

		</div>
		<div class="card-body">

			<div class="space-large visible-xs"></div>
			<div class="space-medium visible-xs"></div>
			<div class="space-large"></div>

				<div class="background-theme grey-matter m-1">
					<br />
				<span class="app-max-text p-3">
					Theme Modes
				</span>

				<center>
					<div class="row-wrap pt-2 pb-2">
						
						<a class="theme-chooser" @click="toggleTheme('theme-light')">
							<div class="block-inline item-block mr-1 light">
								<span class="app-bolder-text it-text" style="color:#111;">
									
									Snow

								</span>
							</div>
						</a>

						<a class="theme-chooser" @click="toggleTheme('theme-dark')">
							<div class="ml-1 block-inline item-block dark">
								<span class="app-bolder-text it-text" style="color:#fff;">
									
									Dark

								</span>
							</div>
						</a>

						<a class="theme-chooser" @click="toggleTheme('theme-dim')">
							<div class="ml-1 block-inline item-block dark">
								<span class="app-bolder-text it-text" :style="{ color : theme.colors.white }">
									
									Nighty

								</span>
							</div>
						</a>

					</div>
				</center>
			</div>

			<div class="space-medium"></div>

			<div class="icon-picker m-1 grey-matter p-2">

				<div class="media p-2">
					
					<div class="media-body align-self-center">
						
						<span class="app-max-text">
							Primary Colors
						</span>

					</div>
					<div class="media-right align-self-center">
						
						<v-button v-on:click="toggleColors('default')" :type="'primary'">
							Default
						</v-button>

					</div>

				</div>

				<div class="space-medium"></div>
				
				<center>
					
					<div class="row-wrap">

						<a @click="toggleColors('default')">
							<div class="circle-block block-inline" :class="[{border : theme.icons.type == 'default'}]" :style="{ backgroundColor : theme.colors.primary[3] }">

							</div>
						</a>
						
						<a @click="toggleColors('first')">
							<div class="circle-block block-inline" :class="[{border : theme.icons.type == 'first'}]" :style="{ backgroundColor : theme.colors.primary[0] }">

							</div>
						</a>

						<a @click="toggleColors('second')">
							<div class="circle-block block-inline" :class="[{border : theme.icons.type == 'second'}]" :style="{ backgroundColor : theme.colors.primary[1] }">
								


							</div>
						</a>

						<a @click="toggleColors('third')">
							<div class="circle-block block-inline" :class="[{border : theme.icons.type == 'third'}]" :style="{ backgroundColor : theme.colors.primary[2] }">

								

							</div>
						</a>

					</div>

				</center>

			</div>

			<div class="space-medium"></div>

			<div class="button-picker">
				
				<div class="grey-matter card no-border">
					
					<div class="card-header no-border pl-2">
						
						<span class="app-max-text">
							Buttons Appearance
						</span>

					</div>
					<div class="card-body no-border">
						
						<center>
							
							<v-button @click.native="() => {}" :type="'primary'" :large="true" :block="true">
								 Button
							</v-button>

						</center>
						<div class="space-medium"></div>

						<center>
							<div class="range-picker" style="width:75%">
								
								
									<clipper-range v-model="button.range" :min="4" :max="20"></clipper-range>
								

							</div>
						</center>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script type="text/javascript">
	
	import Navigation from '../../../components/mobile/root/Navigation'
	import globs from '../../../tunepik/attack.js'
	import { mapGetters, mapActions, mapMutations } from 'vuex'

	export default {

		name 		: "Display",
		data 		: () => {

			return {

				screen   : globs.app.isMobile,
				border 	 : 'border'

			};

		},
		components : {

			Navigation

		},
		computed : {
			...mapGetters("tunepik", ['theme', 'button']),

		},
		methods  : {

			...mapMutations('tunepik', ['SET_BUTTON_STYLE']),
			...mapActions("tunepik", ['toggleTheme', 'toggleColors'])

		},
		watch : {

			'button.range' : function(Range){

				 this.SET_BUTTON_STYLE({type : null, range : Range})

			}

		}

	};

</script>

<style type="text/scss" scoped>

  .circle-block{

  	width: 75px;
  	height: 75px;
  	border-radius: 34.5px;


  }
	
	@media only screen and (max-width: 700px){

		.item-block{

			width: 80px;
			height: 80px;
			padding-top: 30px;
			border-radius: 10px;

		}

		.wrapper{
			z-index: 9999 !important;
			position: fixed;
			top : 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			overflow-y: auto;
			background-color: #fff;

		}

	}

	@media only screen and (min-width: 700px){

		.item-block{

			width: 100px;
			height: 100px;

		}
		
	}

	.dark{

		background-color: #111

	}

	.light{

		background-color: #fff;

	}

	.border{

		border: 1em solid #5bc0de;

	}

	.block-inline{
		display: inline-block;
	}

	.dark > .app-bolder-text{

		color: #fff;

	}

	.light > .app-bolder-text{
		color: #111;
	}

	.it-text{
		margin-top: auto;
	}

</style>