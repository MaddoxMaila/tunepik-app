<template>

	<div class="list-group">
		
		<a class="list-group-item list-group-item-action b-under" @click="SET_REPORT(comment, 'comment')" v-if="!comment.getActivity().me">

      <router-link :to="{ name : 'report', params : { type : 'comment' } }">

			<div class="media">

				<div class="media-left align-self-center">

					<i class="fa fa-ban app-fa"></i>

				</div>
				<div class="media-body ml-2 align-self-center">

					<span class="app-small-text">Report</span>

				</div>

			</div>

      </router-link>

		</a>

		<div class="list-group-item">
			
			<FollowButton :user="comment" :classes="'btn-block input-block-level btn-sm'"></FollowButton>

		</div>

	</div>
	
</template>

<script type="text/javascript">

	import { mapMutations } from 'vuex'
	import FollowButton from '../userBuilders/FollowButton'
	
	export default {

		name : "CommentOptions",
		data : () => ({

		}),
		components : {
			FollowButton
		},
		props : ['comment'],
		methods : {

			...mapMutations('report', ['SET_REPORT'])

		}

	};

</script>

<style type="text/css" scoped></style>