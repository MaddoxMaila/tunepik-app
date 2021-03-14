<template>

	<div class="media">

		<div class="user-img-wrapper align-self-start">
 			 	
	 	  <Picture :height="35" :width="35" :user="notification"></Picture>

	 </div>
		
		<div class="media-body">
			
			<div class="media">
				
				<div class="media-body pl-2">
		 	 			
		 			<span class="app-grey-text-lg">
		 				<span class="app-bolder-text">{{ notification.getBasic().name }}</span>
		 				Has {{ notification.getNotification().notifType }}
		 			</span>

		 		</div>

			</div>

			<div class="space-medium"></div>

			<ShareBodyBuilder :post="notification.getExtra().post"></ShareBodyBuilder>

		</div>

	</div>
	
</template>

<script type="text/javascript">

	import ShareBodyBuilder from '../postBuilders/ShareBodyBuilder'
	
	export default {

		name : 'MentionNotification',
		props : ['notification'],
		components : {

			ShareBodyBuilder

		}

	};

</script>

<style type="text/css" scoped></style>