<template>

		<div class="wrapper pb-2" style="border-bottom:.04em solid rgba(211, 211, 211, .4);">
			
			<span class="app-bolder-text mb-2 p-2">Start A New Conversation</span>
			<div class="space-small"></div>
			<div class="space-small"></div>
			<div class="space-small"></div>
			<div class="p-2">
				<div class="header-wrap grey-matter">
					
					<div class="media fill-width">
						<div class="media-right align-self-center">
							<Icon :icon="'search'" :width="22" :height="22" :color="theme.icons.color"></Icon>
						</div>
						<div class="media-body fill-width align-self-center pt-1">
							<input type="text" placeholder="Search TunePik" class="fill-width app-search-chat" name="q" v-on:keyup="q = $event.target.value">
						</div>
					</div>

				</div>
			</div>
			<div class="loader" v-if="search.loading">

				<center>
					<div class="app-loader"></div>
				</center>
				
			</div>

			<div v-else>

				<div v-if="!search.data.users.found && search.query != ''">
					
					<center>
						<span class="app-small-post">
							{{ search.data.users.message }}
						</span>
					</center>

				</div>
				<div class="list-group mt-2" v-else>
					
					<div class="list-group-item list-group-item-action no-border" v-for="(user, i) in search.data.users.list" :key="i">

						<div class="media">
			
						<!-- User Image! -->

						<Picture :width="40" :height="40" :user="user"></Picture>

						<div class="media-body ml-3 align-self-center">

							<div class="media">
								
								<div class="media-body align-self-center">
									<span class="name-wrapper">
										<user-name :user="user"></user-name>
									</span>
								</div>

								<!-- User Follow Btn Wrapper -->
								<div class="user-follow-btn align-self-center">
									
									<router-link :to="{ name : 'messages', params : { username : user.getBasic().handle } }">
										<v-button :type="'primary'" @click.native="MESSAGE_USER({ error : false, message : 'User Found', user : user })">Message</v-button>
									</router-link>

								</div>
							</div>
							
								<div class="text-breaker"></div>
								<span class="app-grey-text" v-if="user.getInfo().bio == null">
									<i class="app-fa fas fa-calendar-alt mr-1"></i>
									Joined On {{ user.getBasic().date }}
								</span>
								<span class="app-post-text" v-else>
									{{ user.getInfo().bio }}
								</span>

							</div>

						</div> <!-- End Of Header Media -->

					</div>

				</div>

			</div>

		</div>
	
</template>

<script type="text/javascript">

	import { mapGetters, mapActions, mapMutations } from 'vuex'
	
	export default {

		name 		: "SearchChat",
		data 		: function(){
			return {
				q : ''
			}
		},
		methods : {

			...mapActions("find", ['getSearch']),
			...mapMutations("find", ['setQuery']),
			...mapMutations('messages', ['MESSAGE_USER'])

		},
		computed : {

			...mapGetters("find", ['search']),
			...mapGetters("tunepik", ['theme'])

		},
		mounted : function(){

			this.$nextTick(function(){

				if(this.search.query != '') this.setQuery('')

			})

		},
		watch : {

				q : function(newValue, oldValue){

					if(newValue == oldValue) return

				  this.getSearch(newValue);

				}

			}


	};
	
</script>

<style type="text/css" scoped>

	.header-wrap{
	/*	border : .04em solid rgba(211, 211, 211, .4);*/
		border-radius: 2px;
		padding :5px;
	}

	.app-search-chat{
		width: 100%;
    border: none;
    font-size: 10pt;
    float: left;
    color: #63717f;
    padding-left: 4px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 2px;
    outline : 0;
    background-color: transparent;
	}
	
</style>