<template>

	<span class="like-wrapper">
	
		<a @click="like()">

			<Icon :icon="'heart'" :width="iconSize" :height="iconSize" :color="'red'" v-if="comment.getStats().isLiked"></Icon>

			<Icon :icon="'heartEmpty'" :width="iconSize" :height="iconSize" v-else></Icon>

		</a>
		<span class="app-grey-text-sm" v-if="comment.getStats().likeCount > 0">{{ comment.getStats().likeCount }}</span>

	</span>
	
</template>

<script type="text/javascript">

	import { mapGetters, mapActions, mapMutations }from 'vuex'
	import axios from 'axios'

	export default {

		name 		: "CommentReact",
		data 		: () => ({

			animate : false,
			iconSize : 16

		}),
		props   : ['comment'],
		methods : {

			...mapMutations('tunepik', ['SNACK_BAR']),
			like : async function(){

				if(this.comment.getStats().isLiked){

					this.comment.getStats().likeCount -= 1
					this.comment.getStats().isLiked = !this.comment.getStats().isLiked

				}else{

					this.comment.getStats().likeCount += 1
					this.comment.getStats().isLiked = !this.comment.getStats().isLiked

					this.animate = true

					setTimeout(() => {

						this.animate = false

					}, 500)

				}

				const { data } = await axios.get(`/api/react/like/${this.comment.getPost().id}/?type=comment`)

				if(data.error){

					this.SNACK_BAR({ isOpen : true, message : data.message, theme : 'danger' })

				}else{

					this.comment.getStats().likeCount = data.count


				}


			}

		}


	};
	
</script>

<style type="text/css" scoped>
	
</style>