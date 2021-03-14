<template>

	<div class="media">

		<div class="user-img-wrapper align-self-start">
 			 	
	 	  <Picture :height="35" :width="35" :user="notification"></Picture>

	 </div>

	 <div class="media-body align-self-center">
	 	
	 	<div class="media">
	 		
	 		<div class="media-body pl-3 align-self-center">
		 	 			
			  <span class="app-grey-text-lg" v-if="notification.getNotification().count - 1 <= 0">
		 			
		 			<span class="app-bolder-text">{{ notification.getBasic().name }}</span>
		 			 Has Commented Your Post
		 		</span>
		 		<span class="app-grey-text-lg" v-else>
		 			
		 			 <span class="app-bolder-text">{{ notification.getBasic().name }}</span> and 
		 			 <span class="app-bolder-text">{{ notification.getNotification().count - 1 }} Others</span>
		 			 Commented Your Post
		 		</span>

			</div>

			<div class="media-right align-self-center">
				
				<Icon :icon="'comment'" :width="16" :height="16" ></Icon>

			</div>

	 	</div>

	 	<div class="space-medium"></div>
	 	<ShareBodyBuilder :post="notification.getExtra().post" v-if="notification.getExtra().post"></ShareBodyBuilder>

	 </div>
	

	</div>
	
</template>

<script type="text/javascript">

	import ShareBodyBuilder from '../postBuilders/ShareBodyBuilder'
	
	export default {

		name : 'CommentNotification',
		props : ['notification'],
		components : {
			ShareBodyBuilder
		}

	};

</script>

<style type="text/css" scoped></style>