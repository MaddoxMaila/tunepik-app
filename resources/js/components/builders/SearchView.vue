<template>
	
		<div class="wrapper" v-if="q != ''">
			
			<div class="" v-if="search.loading">
				
				<UserListSkeleton v-if="screen"></UserListSkeleton>
				<div class="" v-else>
					<center>
						<div class="app-loader"></div>
					</center>
				</div>

			</div>
			<div class="" v-else>
				
				<template v-if="search.error">
					
					<div class="app-deleted-post grey-matter">
						<center>
							<span class="app-post-text">
								{{ search.message }}
							</span>
						</center>
					</div>

				</template>
				<template v-else>
					
					<!-- For Users!! -->
					<div class="card" v-if="search.data.users.user">
						
						<div class="card-header">
							<span class="app-bolder-text">Users</span>
						</div>

						<div class="card-body">
							
							<div class="" v-if="!search.data.users.found">
								
								<span class="app-post-text">
									{{ search.data.users.message }}
								</span>

							</div>
							<div class="" v-else>
								
								<UserListBundler :message="search.data.users.message" :users="search.data.users.list"></UserListBundler>

							</div>

						</div>

					</div>

					<!-- For HashTags -->
					<div class="card" v-if="search.data.tags.tag">
						
						<div class="card-header">
							
							<span class="app-bolder-text">Trends</span>

						</div>
						<div class="card-body">
							
							<div class="" v-if="!search.data.tags.found">
								
								<span class="app-post-text">
									{{ search.data.tags.message }}
								</span>

							</div>

							<HashTagBundler :message="search.data.tags.message" :tags="search.data.tags.hashes" v-else></HashTagBundler>

						</div>

					</div>

					<!-- For Words Used! -->
					<div class="card" v-if="search.data.words.word">
						
						<div class="card-body p-2">
							
							<router-link :to="{ name : 'results', query : { type : 'posts' }, params : { term : q } }">
							
							<div class="go-to-posts-wrap pl-3 pr-3 p-1">
								<center>
									<div class="media">
								
										<div class="media-body align-self-center pl-2">

											<span class="app-mid-text">{{ search.data.words.list.count }} posts mention "{{ search.data.words.list.term }}"</span>

										</div>
										<div class="media-right align-self-center">
											<!-- GO TO ICON -->
										</div>

									</div>
								</center>
							</div>

						</router-link>

						</div>

					</div>


					<div class="" v-if="!search.data.users.user && !search.data.words.word && !search.data.tags.tag">
						
						<center>
							<span class="app-mid-text">{{ search.message }}</span>
						</center>

					</div>

				</template>

			</div>

		</div>
		<div class="" v-else></div>

</template>

<script>

		import { mapGetters, mapActions } from 'vuex'
		import globs from '../../tunepik/attack.js'
		import UserListSkeleton from './skeletonBuilders/UserListSkeleton'
		import UserListBundler from './userBuilders/UserListBundler'
		import HashTagBundler from './listBuilders/HashTagBundler'

		export default {

			name 		: "SearchView",
			scrollToTop : false,
			data 		: () => {
				return {

					screen : globs.app.isMobile

				};
			},
			components : {

				UserListBundler,
				UserListSkeleton,
				HashTagBundler

			},
			methods : {

				...mapActions("find", ['getSearch']),

			},
			computed : {

				...mapGetters("find", ['search'])

			},
			props    : ['q'],
			watch : {

				q : function(newValue, oldValue){

					if (newValue == oldValue) return;

				  this.getSearch(newValue);

				}

			}

		};
	
</script>

<style scoped>

  .go-to-posts{

  	width: 100%;
  	background-color: rgba(211, 211, 211, .125);
  	border-radius: 10px;

  }

   .card{

   	box-shadow: 0 0 0 0 transparent;
   	border: 0;

   }

   .card-body{
   	padding: 0;
   	border : 0;
   }

   .card-header{
   	background-color: transparent;
   	border: 0;
   }
	
</style>