<template>

	<div class="root-level-wrap">

		<!-- Users List Not Empty -->
		<template v-if="users.length > 0">

			<!-- Root Level Wrapper -->
			
			<CardGridBundler :users="users" v-if="grid"></CardGridBundler>
			<div class="list-group" v-else>
				
				<!-- For Loop! -->
				<template v-for="(user, index) in users">
				
						<UserRowBuilder :user="user" ></UserRowBuilder>

				</template>

				<div class="app-loader-wrap">
					
					<center>
						<div class="app-loader"></div>
					</center>

				</div>

			</div>

		</template>

		<!-- List Empty -->

		<template v-else >
			
			<div class="app-deleted-post grey-matter">
				
				<center>
					<span class="app-small-text">
						{{ message }}
					</span>
				</center>

			</div>

		</template>

	</div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import UserRowBuilder from './UserRowBuilder'
  import CardGridBundler from './CardGridBundler'
  import { mapGetters, mapActions } from 'vuex'

    export default {

        name       : "UserListBundler",
        data       : () => ({

        	appLoader  : false,
        	screen 	 : globs.app.isMobile,

        }),
        components : {

        	UserRowBuilder,
        	CardGridBundler

        },
        props 		: ['users', 'message', 'showGrid'],
        methods   : {
        	...mapActions('tunepik', ['observer']),
        	makeInfiniteRequest : function(){

        		let url = ''
        		 console.log(this.$router.currentRoute.name)
        		switch (this.$router.currentRoute.name) {
        			
        			case 'list' :

        				break;

        			case 'follows' :

        			  break;

        			case 'blocked' :


        				break;
        			default:
        				 console.log(this.$router.currentRoute.name)
        				break;
        		}

        	}

        },
        computed : {

        	grid : function(){
        		return this.showGrid ? this.showGrid : (this.showGrid == undefined ? true : false) 
        	},
        	getLastId : function(){
        		return this.users.length > 0 ? this.users[this.users.length - 1] : 0
        	},
        	data : async function(){

        		return {

        			options  : {
	              threshold : 1.0,
	              rootMargin : '0px'
	            },
	            callback : function(entries, observer){
	            	console.log(entries)
	            	entries.forEach((entry) => {
	            		console.log(entry)
	            		if(entry.intersectionRatio > .20){

                            console.log(entry)

	            		}

	            	});

	            },
	            target : await this.tag

        		}

        	},
        	tag : async function(){

        		let tags = await this.$el.getElementsByTagName('center')
        		return tags.length > 0 ? tags[tags.length - 1] : null

        	}

        },
        mouted : function(){

        	this.$nextTick(() => {

        		this.observer(this.data)

        	})

        }

    };
</script>

<style scoped>

</style>
