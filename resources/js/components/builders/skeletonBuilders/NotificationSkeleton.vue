<template>

	<div class="wrapper list-group">
		
		<template v-for="item in limit">

			<div class="list-group-item skeleton-wrapper">
				
				<div class="media align-self-center">
					
					<div class="skeleton-image skeleton-shimmer align-self-center"></div>

					<div class="media-body pl-3 align-self-center">

						<div class="media">
							
							<div class="media-body align-self-center">
								
								<div class="notif-text"></div>

							</div>
							<div class="notif-icon align-self-center media-right"></div>

						</div>
						
						<!-- Single Post Skeleton -->
						<SinglePostSkeleton></SinglePostSkeleton>

					</div>

				</div>

			</div>

		</template>

	</div>
	
</template>

<script>

		import globs from '../../../tunepik/attack.js'
		import SinglePostSkeleton from './SinglePostSkeleton'
		
		export default {

			name 			: "NotificationSkeleton",
			data 			: function(){
				return {
					limit : globs.limit,
				};
			},
			components : {
				SinglePostSkeleton
			}

		};

</script>

<style scoped>


	.list-group-item{

			border : 0;
			border-bottom: .04em solid rgba(211, 211, 211, .125);

		}

		.bio-shade{
			width: 80%;
			height: 35px;
			border-radius: 14px;
		}

		.notif-text{
			height: 20px;
			width: 65%;
			border-radius: 8px;
		}

	
</style>