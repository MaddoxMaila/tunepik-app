<template>

		<div class="wrapper">
			
			<div class="media">
				
				<div class="media-left ml-2">

					<Picture :width="36" :height="36" :user="comment"></Picture>
					
				</div>
				<div class="media-body pl-3">
					
					<div class="media pb-1">
						
						<div class="media-body pl-1">
							
							<router-link v-bind:to="{ name : 'profile', params : { username : comment.getBasic().handle } }">
							 	<a @click="SET_PROFILE(post)">
									<user-name :user="comment"></user-name>
								</a>
							</router-link>

						</div>
						<div class="media-right align-self-start m-1">
							<a class="post-header-icon" @click="show = !show">
        
			          <!-- <svg-vue icon="arrowdown" class="app-icon" style="width:20px;height:20px;" ></svg-vue> -->
			          <Icon :icon="'arrowdown'" :height="20" :width="20"></Icon>

			        </a>

			        <div class="overlay-wrap" v-show="show">
			        	
			        	<div class="main-wrap card no-border" v-show="show">
			        		
			        		<div class="card-header media">
			        			
			        			<Picture :width="40" :height="40" :user="comment"></Picture>
			        			<div class="media-body align-self-center pl-3">
			        				
			        				<span class="app-max-text">Options</span>
			        				<span class="block-text app-grey-text-lg">
				        				@{{ comment.getBasic().handle }}
				        			</span>

			        			</div>
			        			<div class="media-right align-self-center">
			        				
			        				<a @click="show = !show">
				                <i class="fa fa-times app-fa"></i>
				              </a>

			        			</div>

			        		</div>

			        		<div class="card-body no-pad no-border">
			        			
			        			<CommentOptions :comment="comment"></CommentOptions>

			        		</div>

			        	</div>

			        </div>

						</div>

					</div>

					<div class="media">
						
						<div class="media-body">
							
							<template v-if="comment.getPost().type == 'deleted'">
						
								<DeletedBodyBuilder :post="comment"></DeletedBodyBuilder>

							</template>
							<template v-else>
								
								<TextBodyBuilder :post="comment" class="pl-1"></TextBodyBuilder>

							</template>

							<MediaBodySwitch :post="comment" v-if="comment.getPost().type != 'deleted' && comment.getPost().type != 'text'"></MediaBodySwitch>

						</div>

					</div>

					<div class="media">
						
						<div class="media-body align-self-center">
							<span class="app-grey-text-sm pl-1" style="display:block">{{ comment.getPost().now }}</span>
						</div>

						<div class="media-right align-self-center m-1">
					
							<CommentReact :comment="comment"></CommentReact>

						</div>

					</div>

				</div>
				
			</div>

		</div>
	
</template>

<script>

	import globs from '../../../tunepik/attack.js'
	import {mapMutations} from 'vuex'
  import DeletedBodyBuilder from '../postBuilders/DeletedBodyBuilder'
  import TextBodyBuilder from '../postBuilders/TextBodyBuilder'
  import MediaBodySwitch from '../postBuilders/MediaBodySwitch'
  import CommentReact from './CommentReact'
  import CommentOptions from '../popupBuilders/CommentOptions'
	
	export default {

		name 				: "CommentBodyBuilderTwo",
		components 	: {

			DeletedBodyBuilder,
			TextBodyBuilder,
			MediaBodySwitch,
			CommentReact,
			CommentOptions

		},
		props 			: ['comment'],
		data    		: () => {

      return {

        screen : globs.app.isMobile,
        show : false

      }

    },
    methods : {

    	...mapMutations('profile', ['SET_PROFILE'])

    }

	};
	
</script>

<style scoped>
	
	.comment-icon{

		width : 15px;
		height : 15px;

	}

	.list-group-item{

	}

</style>