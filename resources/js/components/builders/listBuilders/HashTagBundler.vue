<template>


	<div class="" v-if="tags.length > 0">
		
		<div class="list-group" v-for="(tag, key) in tags">
			
			<router-link class="list-group-item list-group-item-action b-under" :to="{ name : 'results', query : { type : 'posts' }, params : { term : tag.getHash().hash } }">

			<div class="media">
				
				<div class="align-self-center hash-tag-wrap">
					<center>
						<span class="app-max-text">
							#
						</span>
					</center>
				</div>
				<div class="media-body align-self-center pl-3">
					<span class="block-text app-bold-text">{{ tag.getHash().hash }}</span>
					<span class="app-grey-text-sm">{{ tag.getHash().message }}</span>
				</div>

			</div>

		</router-link>

	</div>

	</div>
	<div class="app-deleted-post grey-matter" v-else>
		
		<center>
			<span class="app-post-text">{{ message }}</span>
		</center>

	</div>
	
</template>

<script>

	export default {

		name 			: "HashTagBundler",
		props 		: ['tags', 'message']

	};
	
</script>

<style scoped>

	.hash-tag-wrap{

		width: 50px;
		height: 50px;
		border-radius: 25px;
		background-color: rgba(211, 211, 211, .125);

	}
	
</style>