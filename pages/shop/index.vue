<template>
	<main class="main skeleton-body">
		<div class="container">
		
			<nav
				aria-label="breadcrumb"
				class="breadcrumb-nav"
			>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<nuxt-link to="/">
							<i class="icon-home"></i>
						</nuxt-link>
					</li>
					<li class="breadcrumb-item active">Shop</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-9 main-content">
					<pv-product-list-one :product="featuredProducts" :brand="cat" :productlength="productlength"> </pv-product-list-one>
				</div>

				<div
					class="sidebar-overlay"
					@click.prevent="toggleSidebar"
				></div>
				<aside
					class="sidebar-shop col-lg-3 order-lg-first mobile-sidebar"
					sticky-container
				>
					<div
						v-sticky="isSticky"
						sticky-offset="{top: 75}"
					>
						<pv-sidebar-filter-one
							:categoryList="categoryList"
							:featuredProducts="featuredProducts"
							:brand="cat"
							:brands="brands"
						></pv-sidebar-filter-one>

					
					</div>
				</aside>
			</div>
		</div>

		<div class="mb-4"></div>
	</main>
</template>

<script>
import { VueTreeList, Tree } from 'vue-tree-list';
import Sticky from 'vue-sticky-directive';
import PvSidebarFilterOne from '~/components/partials/shop/sidebar-filter/PvSidebarFilterOne';
import PvProductListOne from '~/components/partials/shop/product-list/PvProductListOne';
import Api, { baseUrl, currentDemo } from '~/api';

export default {
	components: {
		PvSidebarFilterOne,
		PvProductListOne
	},
	directives: {
		Sticky
	},
	
	data: function () {
		return {
			categoryList: [],
			featuredProducts: [],
			cat:[],
			brands:[],
			productlength:0,
			isSticky: false
		};
	},
	mounted: function () {
		this.getCategoryLists();
		this.resizeHandler();
		window.addEventListener( 'resize', this.resizeHandler, {
			passive: true
		} );
		this.query();


	},
	destroyed: function () {
		window.removeEventListener( 'resize', this.resizeHandler );
	},
	methods: {
		query(){
		
			Api.get(`${ baseUrl }/product-show`)
				.then( response => {

					this.featuredProducts= response.data.product;
					this.brands= response.data.brand
					this.productlength=this.featuredProducts.length
				} )
				.catch( error => ( { error: JSON.stringify( error ) } ) );
		
		
		},
		getCategoryLists: function () {
			Api.get( `${ baseUrl }/category` )
				.then( response => {

					this.categoryList= response.data;
					
				} )
				.catch( error => ( { error: JSON.stringify( error ) } ) );
		},
		resizeHandler: function () {
			this.isSticky = window.innerWidth > 991 ? true : false;
		},
		toggleSidebar: function () {
			if (
				document
					.querySelector( 'body' )
					.classList.contains( 'sidebar-opened' )
			) {
				document
					.querySelector( 'body' )
					.classList.remove( 'sidebar-opened' );
			} else {
				document.querySelector( 'body' ).classList.add( 'sidebar-opened' );
			}
		}
	}
};
</script>