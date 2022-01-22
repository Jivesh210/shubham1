<template>
	<section class="popular-section">
		<div class="container">
			<pv-service-section></pv-service-section>

			<h2 class="section-title">Popular Departments</h2>
			<p class="section-info font2">Products From These Categories Often Buy</p>

			<pv-carousel
				class="categories-slider mb-4 appear-animate"
				:options="categorySlider"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="200"
				v-animate
			>
				<div class="swiper-slide">
					<div class="product-category bg-white">
						<nuxt-link :to="{path: '/shop', query: {category: 'cooking'}}">
							<figure><img
									v-lazy="'./images/home/products/cats/cat-3.png'"
									alt="cat"
									width="341"
									height="200"
								></figure>
							<div class="category-content">
								<h3 class="font2 ls-n-25">Cooking</h3>
								<span class="font2 ls-n-20">4 Products</span>
							</div>
						</nuxt-link>
					</div>
				</div>

				<div class="swiper-slide">
					<div class="product-category bg-white">
						<nuxt-link :to="{path: '/shop', query: {category: 'fruits-1'}}">
							<figure><img
									v-lazy="'./images/home/products/cats/cat-2.png'"
									alt="cat"
									width="341"
									height="200"
								></figure>
							<div class="category-content">
								<h3 class="font2 ls-n-25">Fruits</h3>
								<span class="font2 ls-n-20">9 Products</span>
							</div>
						</nuxt-link>
					</div>
				</div>

				<div class="swiper-slide">
					<div class="product-category bg-white">
						<nuxt-link :to="{path: '/shop', query: {category: 'vegetables-1'}}">
							<figure><img
									v-lazy="'./images/home/products/cats/cat-1.png'"
									alt="cat"
									width="341"
									height="200"
								></figure>
							<div class="category-content">
								<h3 class="font2 ls-n-25">Vegetables</h3>
								<span class="font2 ls-n-20">1 Products</span>
							</div>
						</nuxt-link>
					</div>
				</div>

				<div class="swiper-slide">
					<div class="product-category bg-white">
						<nuxt-link :to="{path: '/shop', query: {category: 'breakfast'}}">
							<figure><img
									v-lazy="'./images/home/products/cats/cat-4.png'"
									alt="cat"
									width="341"
									height="200"
								></figure>
							<div class="category-content">
								<h3 class="font2 ls-n-25">Breakfast</h3>
								<span class="font2 ls-n-20">8 Products</span>
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

				<div class="products-container product-slider-tab rounded">
					<pv-tabs class="nav nav-tabs border-0 px-4 pb-0 m-b-3">
						<li class="nav-item">
							<a
								class="nav-link active"
								data-toggle="tab"
								href="#all"
							>View All</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								data-toggle="tab"
								href="#breakfast"
							>Breakfast</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								data-toggle="tab"
								href="#cooking"
							>Cooking</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								data-toggle="tab"
								href="#frozen"
							>Frozen</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								data-toggle="tab"
								href="#fruits"
							>Fruits</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								data-toggle="tab"
								href="#vegetables"
							>Vegetables</a>
						</li>
					</pv-tabs>

					<div
						class="tab-content"
						v-if="products.length > 0"
					>
						<div
							class="tab-pane fade show active popular-products swiper-theme swiper-slide"
							id="all"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="popularSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in products.slice(0,8)"
									:key="'all-' + product.name"
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

						<div
							class="tab-pane fade"
							id="breakfast"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="productSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in breakfast.slice(2,8)"
									:key="'break-' + product.name"
								>
									<pv-product-one :product="product"></pv-product-one>
								</div>
							</pv-carousel>
						</div>

						<div
							class="tab-pane fade"
							id="cooking"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="productSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in cooking"
									:key="'cooking-' + product.name"
								>
									<pv-product-one :product="product"></pv-product-one>
								</div>
							</pv-carousel>
						</div>

						<div
							class="tab-pane fade"
							id="frozen"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="productSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in frozen"
									:key="'frozen-' + product.name"
								>
									<pv-product-one :product="product"></pv-product-one>
								</div>
							</pv-carousel>
						</div>

						<div
							class="tab-pane fade"
							id="fruits"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="productSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in fruits.slice(0,6)"
									:key="'fruits-' + product.name"
								>
									<pv-product-one :product="product"></pv-product-one>
								</div>
							</pv-carousel>
						</div>

						<div
							class="tab-pane fade"
							id="vegetables"
						>
							<pv-carousel
								class="products-slider nav-outer"
								:options="productSlider"
							>
								<div
									class="swiper-slide"
									v-for="product in vegetables"
									:key="'vegetables-' + product.name"
								>
									<pv-product-one :product="product"></pv-product-one>
								</div>
							</pv-carousel>
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

export default {
	components: {
		PvServiceSection,
		PvProductOne,
		PvCarousel,
		PvTabs
	},
	props: {
		products: Array
	},
	data: function () {
		return {
			categorySlider: categorySlider,
			productSlider: productSlider,
			popularSlider: popularSlider,
			breakfast: [],
			cooking: [],
			frozen: [],
			fruits: [],
			vegetables: []
		}
	},
	watch: {
		products: function () {
			this.breakfast = getProductsByCategory( this.products, 'Breakfast' );
			this.cooking = getProductsByCategory( this.products, 'Cooking' );
			this.frozen = getProductsByCategory( this.products, 'Frozen' );
			this.fruits = getProductsByCategory( this.products, 'Fruits' );
			this.vegetables = getProductsByCategory( this.products, 'Vegetables' );
		}
	}
}
</script>