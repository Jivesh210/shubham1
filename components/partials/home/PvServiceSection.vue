<template>
	<pv-carousel
		class="info-boxes-slider"
		:options="serviceSlider"
	>
		<div class="swiper-slide">
			<div class="info-box info-box-icon-left">
				<i class="icon-shipping text-primary"></i>
				<div class="info-content">
					<h4 class="ls-n-25">Free Shipping &amp; Return</h4>
					<p class="font2 font-weight-light text-body ls-10">Free shipping on all orders over $99.
					</p>
				</div>
			</div>
		</div>

		<div class="swiper-slide">
			<div class="info-box info-box-icon-left">
				<i class="icon-money text-primary"></i>
				<div class="info-content">
					<h4 class="ls-n-25">Money Back Guarantee</h4>
					<p class="font2 font-weight-light text-body ls-10">100% money back guarantee</p>
				</div>
			</div>
		</div>

		<div class="swiper-slide">
			<div class="info-box info-box-icon-left">
				<i class="icon-support text-primary"></i>
				<div class="info-content">
					<h4 class="ls-n-25">Online Support 24/7</h4>
					<p class="font2 font-weight-light text-body ls-10">Lorem ipsum dolor sit amet.</p>
				</div>
			</div>
		</div>

		<div class="swiper-slide">
			<div class="info-box info-box-icon-left">
				<i class="icon-secure-payment text-primary"></i>
				<div class="info-content">
					<h4 class="ls-n-25">Secure Payment</h4>
					<p class="font2 font-weight-light text-body ls-10">Lorem ipsum dolor sit amet.</p>
				</div>
			</div>
		</div>
	</pv-carousel>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import { serviceSlider } from '~/utils/data/carousel'

export default {
	components: {
		PvCarousel
	},
	data: function () {
		return {
			serviceSlider: serviceSlider
		}
	}
}
</script>