<template>

	<div class="wrap">

		<HeaderBodyBuilder :post="post"></HeaderBodyBuilder>

		<MediaBodySwitch :post="post"></MediaBodySwitch>
              
    <DeletedBodyBuilder :post="post" v-if="post.getPost().type == 'deleted'"></DeletedBodyBuilder>
    
    <TextBodyBuilder class="" :post="post" v-else></TextBodyBuilder>

	  <template v-if="!post.getStats().isOriginal">

	    <div class="space-small"></div>

	    <ShareBodyBuilder :post="post.getShare().model"></ShareBodyBuilder>

	  </template>

	  <!-- Reaction Body Wrapper -->
	  <div class="pl-1">

	  	<span class="app-grey-text pl-2">{{ post.getPost().appName }}</span>
	    <ReactionBodyBuilder :post="post"></ReactionBodyBuilder>
	    
	  </div>

	</div>
	
</template>

<script type="text/javascript">

  import globs from '../../tunepik/attack.js'
  import HeaderBodyBuilder from './postBuilders/HeaderBodyBuilder'
  import MediaBodySwitch from './postBuilders/MediaBodySwitch'
  import TextBodyBuilder from './postBuilders/TextBodyBuilder'
  import DeletedBodyBuilder from './postBuilders/DeletedBodyBuilder'
  import ReactionBodyBuilder from './postBuilders/ReactionBodyBuilder'
  import ShareBodyBuilder from './postBuilders/ShareBodyBuilder'

	export default {

		name  : "CommentPost",
		props : ['post'],
		components  : {

          MediaBodySwitch,
          TextBodyBuilder,
          DeletedBodyBuilder,
          ReactionBodyBuilder,
          HeaderBodyBuilder,
          ShareBodyBuilder,

        }

	};
	
</script>

<style type="text/css" scoped>
	.wrap{
		border-bottom: .05em solid rgba(211, 211, 211, .175);
	}

	@media only screen and (min-width : 700px){

    .app-media-body{
      width :100%;
      height: auto;
      background-color: transparent;
    }

  }

</style>