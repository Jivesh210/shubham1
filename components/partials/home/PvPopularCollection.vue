<template>
	<section class="popular-section">
	
		<div class="container" >
			<pv-service-section></pv-service-section>

			<h2 class="section-title">Popular Departments</h2>
			<p class="section-info font2">Products From These Categories Often Buy</p>

			<pv-carousel
				class="categories-slider mb-4 appear-animate"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="200"
				v-animate
			>
				
				<div class="swiper-slide" v-for="cat in categories" :key="cat.id" >
					<div class="product-category bg-white" v-if="cat.parent_cat ===0"> 
						<nuxt-link :to="{path: '/shop', query: {categories: cat.id}}">
							<figure ><img
									v-if="cat.cat_img !=null"
									:src="cat.cat_img"
									alt="cat"
									width="341"
									height="200" style="filter: brightness(50%) !important;">
								
									<img v-else
									src="~/static/images/31638466.jpg"
									 style="filter: brightness(50%) !important;"	
									 />	
									</figure>	
							<div class="category-content">
								<h3 class="font2 ls-n-25 text-white">{{cat.cat_name}}</h3>
								<span class="font2 ls-n-20 text-white" >{{cat.product_relation.length}} products</span>
							
							</div>
							
						</nuxt-link>
					</div>
				</div>

			</pv-carousel>

			<div
				class="appear-animate"
				data-animation-name="fadeIn"
				data-animation-delay="200"
				v-animate
			>
				<h2 class="section-title">Most Popular</h2>
				<p class="section-info font2">All our new arrivals in a exclusive brand selection</p>

				<div class="products-container product-slider-tab rounded" >
					
                    <pv-tabs class="nav nav-tabs border-0 px-4 pb-0 m-b-3" >
						
							<li class="nav-item" @click="mostallpopular()" >
								
							<a
							:class="brandid?'nav-link mr-3':'nav-link active mr-3'"
							
							data-toggle="tab"
							href="#all"
							>View All</a>
						</li>
						<div v-for="(brand, index) in brands" :key="index" >
						<li class="nav-item" @click="mostpopular(brand.slug,brand.id)" >
							<a	
								:class="brandid == brand.id?'nav-link active mr-3':'nav-link mr-3'"
								data-toggle="tab"	
								href="#too"
							> {{ brand.brand_name }} </a>
						</li>
						 </div>
					</pv-tabs>
				 <div
					>
						<div 
							class="tab-pane fade show active popular-products swiper-theme swiper-slide"
							id="all"						
						>
							<div class="swiper-nav">  
								<button
									type="button"
									role="presentation"
									class="swiper-prev"
								>
									<i class="icon-angle-left"></i>
								</button>

								<button
									type="button"
									role="presentation"
									class="swiper-next"
								>
									<i class="icon-angle-right"></i>
								</button>
							</div>
						</div>

					</div>
					 <div 
					>
						<div 
							class="tab-pane fade show active popular-products swiper-theme swiper-slide"
							id="too"						
						>
							<pv-carousel 		
								class="products-slider nav-outer"
								:options="popularSlider"
							>
									<div 
									v-for="product in productbyid" :key="'too-' + product.product.product_name" 
									class="swiper-slide"
									
									>
									<pv-product-one :product="product" ></pv-product-one>
								</div>
							</pv-carousel>
							<div class="swiper-nav">  
								<button	
									type="button"
									role="presentation"
									class="swiper-prev"
								>
									<i class="icon-angle-left"></i>
								</button>

								<button
									type="button"
									role="presentation"
									class="swiper-next"
								>
									<i class="icon-angle-right"></i>
								</button>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import PvProductOne from '~/components/features/product/PvProductOne';
import PvTabs from '~/components/features/PvTabs';
import PvServiceSection from '~/components/partials/home/PvServiceSection';
import { getProductsByCategory, getProductsByAttri } from '~/utils/service';
import { categorySlider, productSlider, popularSlider } from '~/utils/data/carousel';
import Api, { baseUrl ,backendUrl} from '~/api';

export default {
	components: {
		PvServiceSection,
		PvProductOne,
		PvCarousel,
		PvTabs
	},
	props: {
		products: Array,
		categories: Array,
		brands:Array
	},
	data: function () {
		return {
		change:true,
		productbyid:[],
		brandid:null,
		backendUrl:backendUrl,
		popularSlider:popularSlider

		}
	},
	mounted (){
		this.mostallpopular()
		
	},
	methods:{
	
	mostpopular(slug,id){	
		this.brandid=id
		Api.get( `${ baseUrl }/product-showbyid/${slug}`)
		.then(response => {
				
			this.productbyid =response.data.product	
			this.change=false;
			
				
		})
		
		
	},
	mostallpopular(){
		this.brandid=null
		this.change=true;
		Api.get( `${ baseUrl }/product-show`)
		.then(response => {
				
			this.productbyid =response.data.product	
			this.change=false;
			
			// console.log(response.data)
				
		})
	}
}	
	
}
</script>
