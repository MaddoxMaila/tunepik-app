<template>

	<div class="media">
		
		<!-- Image Wrapper For Each Notification Item -->
	 <div class="user-img-wrapper align-self-start">
	 	
	 	  <Picture :height="35" :width="35" :user="notification"></Picture>

	 </div>

	 <div class="media-body align-self-center">
	 	
	 		<div class="media pl-3">

				 <!-- Show Like Notification -->
				 <div class="media-body align-self-start">
				 	
				 		<span class="app-grey-text-lg" v-if="notification.getNotification().count - 1 <= 0">
				 			
				 			<span class="app-small-text">{{ notification.getBasic().name }}</span>
				 			 Has Liked Your Post
				 		</span>
				 		<span class="app-grey-text-lg" v-else>
				 			
				 			 <span class="app-small-text">{{ notification.getBasic().name }}</span> and 
				 			 <span class="app-small-text">{{ notification.getNotification().count - 1 }} Others</span>
				 			 Liked Your Post
				 		</span>

				 </div>

				 <div class="media-right align-self-center">
				 	
				 		<Icon :icon="'heart'" :height="16" :width="16" :color="'red'"></Icon>

				 </div>
	 			
	 		</div>
	 		<div class="space-medium"></div>
	 		<ShareBodyBuilder v-if="notification.getExtra().post" :post="notification.getExtra().post"></ShareBodyBuilder>

	 </div>

	</div>
	
</template>

<script type="text/javascript">

	import ShareBodyBuilder from '../postBuilders/ShareBodyBuilder'
	
	export default {

		name : 'LikesNotification',
		props : ['notification'],
		components : {

			ShareBodyBuilder,

		}

	};

</script>

<style type="text/css" scoped></style>