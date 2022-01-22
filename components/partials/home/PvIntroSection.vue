<template>
	<div class="intro-section">
		<pv-carousel
			class="home-slider mb-4 slide-animate"
			:options="baseSlider6"
			v-animate
		>
			<div class="swiper-slide">
				<div
					class="home-slide home-slide-1 banner"
					style="background-color: #d9e2e1;"
				>
					<figure>
						<img
							class="swiper-lazy"
							alt="slide"
							:src="'./images/home/slider/banner.jpg'"
							width="1903"
							height="520"
						>
					</figure>

					<!--<div class="banner-layer banner-layer-middle banner-layer-left">
						<h4
							class="font-weight-normal text-body m-b-2 appear-animate"
							data-animation-name="fadeInDownShorter"
							data-animation-delay="100"
							v-animate
						>Exclusive Product New
							Arrival</h4>
						<h2
							class="appear-animate"
							data-animation-name="fadeInUpShorter"
							data-animation-delay="600"
							v-animate
						>
							Organic Coffee</h2>
						<div
							class="position-relative appear-animate"
							data-animation-name="fadeInRightShorter"
							data-animation-delay="1100"
							v-animate
						>
							<h3 class="text-uppercase mb-4">Special Blend</h3>
							<h5 class="rotate-text font-weight-normal text-primary">Fresh!</h5>
						</div>
						<p
							class="font2 text-right text-uppercase appear-animate"
							data-animation-name="fadeInUpShorter"
							data-animation-delay="1400"
							v-animate
						>Breakfast products on
							sale</p>
						<div
							class="coupon-sale-text m-b-2 appear-animate"
							data-animation-name="fadeInRightShorter"
							data-animation-delay="1800"
							v-animate
						>
							<h6 class="text-uppercase text-right mb-0">
								<sup>up to</sup><strong class=" text-white">50%</strong>
							</h6>
						</div>
					</div>-->
				</div>
			</div>

			<div class="swiper-slide">
				<div
					class="home-slide home-slide-2 banner"
					style="background-color: #f7eeef;"
				>
					<figure>
						<img
							class="swiper-lazy"
							alt="slide"
							:src="'./images/home/slider/banner2.jpg'"
							width="1903"
							height="520"
						>
					</figure>

					<!--<div class="banner-layer banner-layer-middle banner-layer-right">
						<h4
							class="font-weight-normal text-body m-b-2 appear-animate"
							data-animation-name="fadeInDownShorter"
							data-animation-delay="100"
							v-animate
						>Exclusive Product New
							Arrival</h4>
						<h2
							class="appear-animate"
							data-animation-name="fadeInRightShorter"
							data-animation-delay="600"
							v-animate
						>Fit Low Carb</h2>
						<div
							class="position-relative appear-animate"
							data-animation-name="fadeInRightShorter"
							data-animation-delay="1100"
							v-animate
						>
							<h3 class="text-uppercase">Candy Bar</h3>
							<h5 class="rotate-text font-weight-normal text-secondary">Sugar-Free</h5>
						</div>
						<p
							class="font2 text-right text-uppercase appear-animate"
							data-animation-name="fadeInUpShorter"
							data-animation-delay="1400"
							v-animate
						>Breakfast products on
							sale</p>
						<div
							class="coupon-sale-text pb-0 appear-animate"
							data-animation-name="fadeInRightShorter"
							data-animation-delay="1800"
							v-animate
						>
							<h6 class="text-uppercase text-right mb-0">
								<sup>up to</sup><strong class=" text-white">70%</strong>
							</h6>
						</div>
					</div>-->
				</div>
			</div>
		</pv-carousel>
	</div>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import { baseSlider6 } from '~/utils/data/carousel';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			baseSlider6: baseSlider6
		};
	}
};
</script>
