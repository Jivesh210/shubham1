<template>
	<nav class="main-nav d-flex font2">
		<div class="menu-depart" >
			<nuxt-link to="/"><i class="fa fa-bars align-middle mr-3"></i>All
				Departments</nuxt-link>
			<ul class="menu menu-vertical">
				<li v-for="catmenu in mainMenu" :key="catmenu.id"  >
					<a href="javascript:;" @mouseover="getchild_categories(catmenu.id)"  ><i class="icon-category-food"></i>{{catmenu.cat_name}}</a>
					<span class="menu-btn" ></span>
					<div class="megamenu megamenu-fixed-width megamenu-one" >
						<div class="row">
							<div class="col-md-12">
								<div class="row">
									<div class="col-md-2 mb-1" v-for="child_cat,index in menuOneSlider" :key="index">	
										<nuxt-link to="/shop"	
											class="nolink pl-0"
										> {{child_cat.cat_name}} </nuxt-link>
										<ul class="submenu">
											<li class="submenu" v-for="child in child_cat.childcategory.slice(0,6)" :key="child.id">
												<nuxt-link :to="{path: '/shop/cat/'+child.cat_name+'/'+child.id}">{{child.cat_name}}</nuxt-link>
											</li>
										</ul>
			
									</div>
								</div>
							</div>
							
						</div>
					
					</div>
				</li>
        
			</ul>
		</div>
	
        <ul class="menu main-menu menu-arrow">
			<li>
				<nuxt-link
					to="/"
					class="sub-menu-link menu-with-ul"
					:class="{active: $route.path.indexOf('/page') > -1}"
				>Flyers & Deals</nuxt-link>
			</li>

			<li>
				<nuxt-link
					to="/shop"
					class="sub-menu-link menu-with-ul"
					:class="{active: $route.path.indexOf('/shop') <-1 }"
				>My Shop</nuxt-link>
			</li>

			<li>
				<nuxt-link
					to="/shop/brand/"
					:class="{active: $route.path.indexOf('/shop/brand/') <-1 }"
				>Brands</nuxt-link>
			</li>
		</ul>
	</nav>
</template>
<script>
import PvCarousel from '~/components/features/PvCarousel';
import PvCountDown from '~/components/features/PvCountDown';
import Api, { baseUrl, currentDemo } from '~/api';

export default {
	components: {
		PvCarousel,
		PvCountDown
	},
	data: function () {
		return {
			mainMenu: [],
			menuOneSlider: [],
			nav:false,
			submenu:[],
		};
	},
	mounted: function () {
		this.getcategories();
		
	},
	computed: {
		isPageItemActived: function () {
			let exItems = [ 'blog', 'about-us', 'contact-us' ];

			if (
				this.$route.path.includes( '/pages' ) &&
				exItems.findIndex( item => this.$route.path.includes( item ) ) ===
				-1
			) {
				return true;
			}

			return false;
		}
	},
	methods: {
	getcategories(){
				
				Api.get( `${ baseUrl }/search-category` )
							.then( response => {
								this.mainMenu = response.data

							})
		},
		getchild_categories(id){
	
			Api.get( `${ baseUrl }/child_category/`+id )
							.then( response => {
								this.menuOneSlider = response.data
								this.nav=true;
								// console.log(response.data)

							})
		},
	
	}
};
</script>
