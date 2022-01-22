<template>

	<div class="products-section pt-0">	
		<h2
			class="section-title"
			v-if="products"
			style="margin-bottom: 2.4rem"
		>Related Products</h2>

		<pv-carousel
			class="skel-carousel dots-top dots-small"
			:options="baseSlider9"
			v-if="!products"
		>
			<div
				v-for="item in [1,2,3,4,5]"
				:key="item"
				class="swiper-slide skel-pro"
			></div>
		</pv-carousel>

		<pv-carousel
			class="products-slider dots-top dots-small"
			:options="baseSlider9"
			v-if="products "
		>
	
			<pv-releted-product
			:productCategoryInfo="productCategoryInfo"
			:product="item"
			v-for="(item,index) in products.slice(0,8)"
			:key="'related-product' + index"
			class="swiper-slide"
			></pv-releted-product>
		</pv-carousel>

		<div
			class="info-box with-icon p-0"
			v-if="products && products.length === 0"
			style="margin-bottom: 1.6rem"
		>
			<p>No products were found matching your selection.</p>
		</div>
	</div>
</template>

<script>
import PvReletedProduct from '~/components/features/product/PvReletedProduct';
import PvCarousel from '~/components/features/PvCarousel';
import { baseSlider9 } from '~/utils/data/carousel';

export default {
	components: {
		PvReletedProduct,
		PvCarousel
	},
	data: function () {
		return {
			baseSlider9: baseSlider9
		}
	},
	props: {
		products: Array,
		productCategoryInfo: Array
	}
}
</script>