<template>
	<section class="special-section">
		<div class="container">
			<div
				class="appear-animate swiper-theme swiper-slide special-products"
				data-animation-name="fadeIn"
				data-animation-delay="200"
				v-animate
			>
				<h2 class="section-title">This Week's Specials</h2>
				<p class="section-info font2">All our new arrivals in a exclusive brand selection</p>

				<div class="products-container bg-white mb-4 rounded">
					<div
						class="row position-relative"
						v-if="products.length === 0"
					>
						<!-- <pv-carousel
							class=" nav-outer w-100"
							
						>
							<div
								class="product-loading-overlay swiper-slide"
								v-for="index in [1,2,3,4,5,6]"
								:key="'special-skel-' + index"
							>
							</div>
						</pv-carousel> -->
					</div>

					<div
						class="row position-relative"
						v-if="products.length > 0"
					>
						<pv-carousel
							class="special-products nav-outer w-100"
							:options="specialSlider"
						>
							<div
								class="swiper-slide"
								v-for="product in products.slice(0,8)"
								:key=" product.name"
							>
								<pv-product-one :product="product"></pv-product-one>
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

			<div class="row">
				<div class="col-md-8">
					<div
						class="banner banner1 rounded m-b-4"
						style="background-color: #d9e1e1;"
					>
						<figure>
							<img
								v-lazy="'./images/home/banners/banner-1.png'"
								alt="banner"
								width="939"
								height="235"
							>
						</figure>

						<div class="banner-layer banner-layer-middle banner-layer-right">
							<h4
								class="font-weight-normal text-body appear-animate"
								data-animation-name="fadeInDownShorter"
								data-animation-delay="100"
								v-animate
							>Exclusive
								Product New Arrival</h4>
							<h2
								class="m-l-n-1 p-r-5 m-r-2 appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="600"
								v-animate
							>Organic Coffee</h2>
							<div
								class="position-relative appear-animate"
								data-animation-name="fadeInRightShorter"
								data-animation-delay="1100"
								v-animate
							>
								<h3 class="text-uppercase">Special Blend</h3>
								<h5 class="rotate-text font-weight-normal text-primary">Fresh!</h5>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div
						class="banner banner2 rounded mb-3"
						style="background-color: #b28475;"
					>
						<figure>
							<img
								v-lazy="'./images/home/banners/banner-2.png'"
								alt="banner"
								width="460"
								height="235"
							>
						</figure>

						<div class="banner-layer banner-layer-middle banner-layer-right">
							<h4
								class="font-weight-normal appear-animiate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="200"
								v-animate
							>Stay Healthy</h4>
							<h2
								class="text-white appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="400"
								v-animate
							>Low Carb</h2>
							<h3
								class="text-white text-uppercase mb-2 appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="600"
								v-animate
							>Strawberry</h3>
							<h5
								class="font-weight-normal text-white mb-0 appear-animate"
								data-animation-name="fadeInUpShorter"
								data-animation-delay="800"
								v-animate
							>Sugar-Free</h5>
						</div>
					</div>
				</div>
			</div>

			<h2 class="section-title">Special Offers</h2>
			<p class="section-info font2 pb-5">All our new arrivals in a exclusive brand selection</p>

			<div
				class="row offer-products"
				v-if="products.length > 0"
			>
				<div
					class="col-md-4 appear-animate"
					data-animation-name="fadeInRightShorter"
					data-animation-delay="100"
					v-animate
				>
					<div class="count-deal bg-white rounded mb-md-0" >
						<pv-product-three :product="products"></pv-product-three>
						
					</div>
				</div>

				<div
					class="col-md-8 appear-animate"
					data-animation-name="fadeInLeftShorter"
					data-animation-delay="300"
					v-animate
				>
					<div class="custom-products bg-white rounded">
						<div
							class="row"
							v-if="products.length > 0"
						>
							<div
								class="col-6 col-sm-4 col-xl-3"
								v-for="(product,index) in products.slice(0,8)"
								:key="'deal-' + index"
							>
								<pv-product-one :product="product"></pv-product-one>
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
import PvProductThree from '~/components/features/product/PvProductThree';
import { specialSlider, productSlider } from '~/utils/data/carousel';

export default {
	components: {
		PvCarousel,
		PvProductOne,
		PvProductThree
	},
	props: {
		products: Array
	},
	data: function () {
		return {
			product: [],
			specialSlider: specialSlider,
			productSlider: productSlider
		}
	}
}
</script>