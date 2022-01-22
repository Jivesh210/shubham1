<template>
	<section class="brands-section">
		<div class="container">
			<div
				class="appear-animate"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="100"
				v-animate
			>
				<h2 class="section-title">Featured Brands</h2>
				<p class="section-info font2">All our new arrivals in a exclusive brand selection</p>
			</div>

			<div
				class="slider-wrapper bg-white rounded appear-animate swiper-slide swiper-theme"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="300"
				v-animate
			>
				<pv-carousel
					class="brands-slider swiper-carousel swiper-theme nav-outer"
					:options="brandSlider"
				>
					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
					</div>

					<div class="swiper-slide">
						<div class="d-inline-block">
							<img
								src="~/static/images/brands/small/brand1.png"
								alt="brand"
								width="140"
								height="40"
							>
						</div>
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

	</section>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import { brandSlider } from '~/utils/data/carousel';

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			brandSlider: brandSlider
		}
	}
}
</script>