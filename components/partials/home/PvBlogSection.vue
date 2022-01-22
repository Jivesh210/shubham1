<template>
	<section class="post-section">
		<div class="container">
			<div
				class="appear-animate"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="300"
				v-animate
			>
				<h2 class="section-title">Recipes For This Week</h2>
				<p class="section-info font2">All our new arrivals in a exclusive brand selection</p>
			</div>

			<div
				class="post-date-in-media media-with-zoom bg-white rounded appear-animate"
				data-animation-name="fadeInUpShorter"
				data-animation-delay="300"
				v-animate
			>
				<pv-carousel
					class="mb-2"
					:options="blogSlider"
				>
					<div
						class="swiper-slide"
						v-for="(post, index) in posts"
						:key="'blog-' + post.title"
					>
						<pv-post-four
							:post="post"
							:post-index="index"
						></pv-post-four>
					</div>
				</pv-carousel>
			</div>
		</div>
	</section>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import PvPostFour from '~/components/features/post/PvPostFour';
// import PvBrandSection from '~/components/partials/home/PvBrandSection';
import { blogSlider } from '~/utils/data/carousel';

export default {
	components: {
		PvCarousel,
		PvPostFour,
		// PvBrandSection
	},
	props: {
		posts: Array
	},
	data: function () {
		return {
			blogSlider: blogSlider
		}
	}
}
</script>