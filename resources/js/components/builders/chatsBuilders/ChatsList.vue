<template>

		<div class="wrapper card no-border">
			
			<Navigation v-if="screen">
				
				<div class="media-body align-self-center">
					
						<span class="app-max-text">
							Messages
						</span>

				</div>
				<div class="media-right align-self-center">
					<a @click="show = !show" v-show="!show">
						<i class="fa app-fa fa-paper-plane"></i>
					</a>

					<a @click="show = !show" v-show="show">
						<i class="fa app-fa fa-times"></i>
					</a>
				</div>

			</Navigation>
			<div class="card-header" v-else>
				
				<div class="media-body">
					
					<center>
						<span class="app-max-text">
							Messages
						</span>
					</center>

				</div>
				<div class="media-right"></div>

			</div>
			<div class="card-body" v-if="chat.loading">
				
				<div class="space-large visible-xs"></div>
				<div class="space-medium visible-xs"></div>
				<ChatsSkeleton></ChatsSkeleton>

			</div>
			<div class="card-body" v-else>
				 	
				 	<div class="space-large visible-xs"></div>
				 	<div class="space-small visible-xs"></div>

				 	<div class="space-large visible-xs" v-if="chat.error"></div>
				 	<div class="pr-2 pl-2 app-deleted-post grey-matter" v-if="chat.error">
				 		
				 		<center>
				 			<span class="app-small-text">
				 				{{ chat.message }}
				 			</span>
				 		</center>

				 	</div>
				 	<div class="list-group pt-1" v-if="show">
				 		
				 		<div class="list-group-item p-3" >
				 			<SearchChat></SearchChat>
				 		</div>
				 	</div>
				 	<div class="list-group" v-else>

				 		<div class="list-group-item p-3 pt-4 list-group-item-action" v-for="(message, i) in chat.chats" :key="i">
				 				
				 				<ChatItem :message="message"></ChatItem>

				 		</div>

				 	</div>

				 	</div>
			</div>
		</div>
	
</template>

<script type="text/javascript">

		import { mapActions, mapGetters, mapMutations } from 'vuex'
		import globs from '../../../tunepik/attack.js'
		import Navigation from '../../mobile/root/Navigation'
		import SearchChat from './SearchChat'
		import ChatsSkeleton from '../skeletonBuilders/ChatsSkeleton'
		import ChatItem from './ChatItem'

		export default {

			 name 			: "ChatsList",
			 scrollToTop : false,
			 data 			: function() {
			 	  return {
			 	  	screen : globs.app.isMobile,
			 	  	trim   : globs.trim,
			 	  	show 	 : false,
			 	  }
			 },
			 components : {

			 	 Navigation,
			 	 ChatsSkeleton,
			 	 SearchChat,
			 	 ChatItem

			 },
			 methods     : {

			 	...mapActions("messages", ['getChats']),
			 	...mapMutations("messages", ['INSERT_CHAT']),
			 	chatsChannel : function(){

			 		window.Echo
			 							.private(`chats-event.${this.model.getBasic().id}`)
			 							.listen('incoming-chats', chats => {
			 								console.log(chats)
			 								this.INSERT_CHAT(chats)
			 				})

			 	}

			 },
			 computed    : {

			 	...mapGetters("messages", ['chat']),
			 	...mapGetters("auth", ['model']),

			 },

			 mounted      : function(){

			 	 this.$nextTick(function(){

			 	 	 if(this.chat.chats.length == 0) this.getChats()

			 	 	 this.chatsChannel()

			 	 });

			 }

		};
	
</script>

<style type="text/css" scoped>

	.list-group-item{

		border : 0;
		/*border-bottom: .03em solid rgba(211, 211, 211, .125);*/

	}
	.card-body,
	.card{

		padding: 0;
		box-shadow: 0 0 0 0 transparent;

	}

	.fa-times{
		width: 26px;
		height: 26px;
	}
	
</style>