<template>

	<div class="sidebar-wrapper">
	
		<div class="widget">
			<h3 class="widget-title">
					
				<a
					data-toggle="collapse"
					href="javascript:;"
					@click="priceOpenened = !priceOpenened"
					:class="{'collapsed': !priceOpenened}"
				>FILTER BY PRICE</a>
			</h3>

			<vue-slide-toggle :open="priceOpenened">
				<div class="widget-body pb-0">
					<form action="#">
						<div class="price-slider-wrapper">
							<vue-nouislider
								:config="priceSettings"
								:values="prices"
								v-if="priceReset"
								id="price-slider"
							></vue-nouislider>
						</div>

						<div class="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
							<div class="filter-price-text">Price: ${{ prices[0] }} - ${{ prices[1] }}</div>

							<nuxt-link
								:to="priceFilterRoute"
								class="btn btn-primary"
							>Filter</nuxt-link>
						</div>
					</form>
				</div>
			</vue-slide-toggle>
		</div>

		<div
			class="sidebar-content skeleton-body"
			v-if="categoryList===0"
		>
		</div>
		<div v-else class="widget widget-product-categories"> 
				<h3 class="widget-title">
				<a	
					data-toggle="collapse"
					href="javascript:;"
					@click="catOpened = !catOpened"
					:class="{'collapsed': !catOpened}"
				>PRODUCT CATEGORIES</a>
			</h3>
			<vue-slide-toggle :open="catOpened">
				<div class="widget-body pb-0" >
					<ul class="cat-list"  >
						<div v-for=" list,index in categoryList"	:key="index" >
						<li class="mb-1" @click="subcategory(list.id)"
								>
							<a href="javascript:;"  data-toggle="collapse" v-if="!list.parent_cat"	>{{list.cat_name +' '+'('+list.product_relation.length+')'}}</a>
						</li>
						<div v-if="subcat">
						<div v-for=" showsub in sub"	:key="showsub.id"  >
					<ul class="cat-list">
					<li class=" ml-5 mb-1">	
				<nuxt-link   v-if="showsub.parent_cat === list.id"  :to="{path: '/shop/cat/'+showsub.cat_slug+'/'+showsub.id}" >{{showsub.cat_name}}</nuxt-link>	
			</li>
		</ul>
		</div> 
						</div>
		
						</div>
					</ul>
				</div>
			</vue-slide-toggle>
		
		</div>
		<!-- <vue-slide-toggle :open="!isEmptyQuery">
			<div class="widget">
				<nuxt-link
					:to="{path: $router.path}"
					class="btn btn-primary reset-filter-btn router-link-active"
				>Reset All Filters</nuxt-link>
			</div>
		</vue-slide-toggle> -->
	 <div ></div>
		<div class="widget widget-brand">
			<h3 class="widget-title">
				<a
					href="javascript:;"
					@click="brandOpened = !brandOpened"
					:class="{'collapsed': !brandOpened}"
				>Brands</a>
			</h3>

			<vue-slide-toggle :open="brandOpened" >
			
				<!-- <div class="widget-body pb-0" v-if="brands.length==0">
				
					<ul class="cat-list" >			
							<li v-for=" (list,index) in featuredProducts" :key="index"		
							 	:class="{active: isActivedBrand(list.brand.brand_name)}"	>
							<nuxt-link else :to="{path: '/shop/brand/'+list.brand.brand_name+'/'+list.brand.id}">{{list.brand.brand_name }}</nuxt-link> 
						</li>  
					</ul>
				</div> -->
				<div class="widget-body pb-0" >
					<ul class="cat-list" >
							<li 	v-for=" list in brands" :key="list.id" 	
							 		:class="{active: isActivedBrand(list.brand_name)}"	>
							<nuxt-link  :to="{path: '/shop/brand/'+list.slug+'/'+list.id}">{{list.brand_name }}</nuxt-link> 
						</li>  

					</ul>

				</div> 
				
			</vue-slide-toggle>
		</div>

		<div class="widget widget-size">
			<h3 class="widget-title">
				<a
					href="javascript:;"
					@click="sizeOpened = !sizeOpened"
					:class="{'collapsed': !sizeOpened}"
				>Sizes</a>
			</h3>

			<vue-slide-toggle :open="sizeOpened">
				<div class="widget-body pb-0">
					<ul class="config-size-list">
						<li
							v-for="(item,index) in shopSizes"
							:key="'size-filter' + index"
							:class="{active: isActivedSize(item)}"
						>
							<nuxt-link :to="sizeFilterRoute(item)">{{ item.size }}</nuxt-link>
						</li>
					</ul>
				</div>
			</vue-slide-toggle>
		</div>

		<div
			class="widget widget-featured"
			v-if="isFeatured"
		>
			<h3 class="widget-title">Featured</h3>

			<div class="widget-body">
				<div class="featured-col">
					<pv-small-product
						v-for="(product,index) in featuredProducts"
						:key="'featured' + index"
						:is-lazy="false"
						:product="product"		
					></pv-small-product>
				</div>
					
			</div>
		</div>

	</div>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle';
import { VueTreeList, Tree } from 'vue-tree-list';
import PvCarousel from '~/components/features/PvCarousel';
import PvSmallProduct from '~/components/features/product/PvSmallProduct';
import { shopColors, shopSizes, shopBrands } from '~/utils/data/shop';
import { baseSlider1 } from '~/utils/data/carousel';
import Api, { baseUrl } from '~/api';
export default {
	components: {
		VueSlideToggle,
		VueTreeList,
		PvSmallProduct,
		PvCarousel
	},
	props: {
		categoryList: Array,
		featuredProducts: Array,
		brand: Array,
		brands: Array,
	},
	data: function () {
		return {
			catOpened: true,
			subcat:false,
			priceOpenened: true,
			brandOpened: true,
			sizeOpened: true,
			colorOpened: true,
			prices: [ 0, 1000 ],
			priceSettings: {
				connect: true,
				step: 50,
				margin: 100,
				range: {
					min: 0,
					max: 1000
				},
				format: {
					'from': Number,
					'to': Number
				}
			},
			sub:[],
			shopColors: shopColors,
			shopSizes: shopSizes,
			baseSlider1: baseSlider1,
			emptyObject: {},
			isFeatured: true,
			priceReset: true,
			currentCategory: '',
			shopBrands: shopBrands
		};
	},
	mounted(){
		
	},
	watch: {
		
		$route: function () {
			this.getFlag();

			if ( this.$route.query.min_price ) {
				this.prices = [
					this.$route.query.min_price,
					this.$route.query.max_price
				];
			} else {
				this.prices = [ 0, 1000 ];
			}

			this.priceReset = false;

			this.currentCategory = this.$route.params.cat;

			this.$nextTick( function () {
				this.priceReset = true;
			} );
		}
	},
	created: function () {
		this.getFlag();
	
		if ( this.$route.query.min_price ) {
			this.prices = [
				this.$route.query.min_price,
				this.$route.query.max_price
			];
		} else {
			this.prices = [ 0, 1000 ];
		}
	},
	computed: {
		// categoryTree: function () {
		// 	return new Tree( this.categoryList );
		// },
		priceFilterRoute: function () {
			return {
				path: this.$route.path,
				query: {
					...this.$route.query,
					page: 1,
					max_price: this.prices[ 1 ],
					min_price: this.prices[ 0 ]
				}
			};
		},
		isEmptyQuery: function () {
			for ( let key in this.$route.query ) {
				if ( key !== 'page' && key !== 'per_page' && this.$route.query[ key ] ) {
					return false;
				}
			}

			return true;
		}
	},
	methods: {
		subcategory(id){
		
			this.subcat = !this.subcat

			this.sub=[];
				for( var key in this.categoryList){
					if(this.categoryList[key].parent_cat===id){
						
						this.sub.push(this.categoryList[key])
					}
					
				}
	
		},
		colorFilterRoute: function ( item ) {
			let selectedColors = this.$route.query.color
				? this.$route.query.color.split( ',' )
				: [];
			let index = selectedColors.indexOf( item.name );
			if ( index > -1 ) {
				selectedColors.splice( index, 1 );
			} else {
				selectedColors.push( item.name );
			}

			return {
				path: this.$route.path,
				query: {
					...this.$route.query,
					page: 1,
					color: selectedColors.toString()
				}
			};
		},
		sizeFilterRoute: function ( item ) {
			let selectedSizes = this.$route.query.size
				? this.$route.query.size.split( ',' )
				: [];
			let index = selectedSizes.indexOf( item.size );
			if ( index > -1 ) {
				selectedSizes.splice( index, 1 );
			} else {
				selectedSizes.push( item.size );
			}

			return {
				path: this.$route.path,
				query: {
					...this.$route.query,
					size: selectedSizes.toString(),
					page: 1
				}
			};
		},
		brandFilterRoute: function ( item ) {
			let selectedBrands = this.$route.params.brand
				? this.$route.params.brand.split( ',' )
				: [];
			let index = selectedBrands.indexOf( item.brand );
			if ( index > -1 ) {
				selectedBrands.splice( index, 1 );
			} else {
				selectedBrands.push( item.brand );
			}

			return {
				path: this.$route.path,
				query: {
					...this.$route.query,
					brand: selectedBrands.toString(),
					page: 1
				}
			};
		},
		isActivedColor: function ( item ) {
			return (
				this.$route.query.color &&
				this.$route.query.color.split( ',' ).includes( item.name )
			);
		},
		isActivedSize: function ( item ) {
			return (
				this.$route.query.size &&
				this.$route.query.size.split( ',' ).includes( item.size )
			);
		},
		isActivedBrand: function ( item ) {
			return (
				this.$route.query.brand &&
				this.$route.query.brand.split( ',' ).includes( item.brand )
			);
		},
		getFlag: function () {
			if ( this.$route.path.includes( 'horizontal-filter-1' ) )
				this.isFeatured = false;
		}
	}
};
</script>