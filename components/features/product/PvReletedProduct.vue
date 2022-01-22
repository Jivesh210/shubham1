<template>
	<div class="product-default inner-quickview inner-icon" >

		<figure>
			<nuxt-link :to="`/product/default/${product.id}`">
				<img
					v-lazy="`${backendUrl}${product.image}`"
					
				/>
			</nuxt-link>
			<div class="label-group">
				<!-- <div
					class="product-label label-hot"
					v-if="product.product.is_hot"
				>HOT</div> -->
				<div
					class="product-label label-sale"
					v-if="product.pricesale && !product.price"
				>Sale</div>
				<div
					class="product-label label-sale"
					v-if="product.pricesale && product.price"
				>-{{ discount }}%</div>
			</div>

			<a
				href="javascript:;"
				class="btn-quickview"
				title="Quick View"
				@click="openQuickview"
			>
				Quick View
			</a>
		</figure>
		<div class="product-details">
		
			<div class="category-wrap">
				<div v-if="productCategoryInfo.length > 0"
					class="category-list"
				>
					<li>
				<strong>
					<nuxt-link
						class="product-category"
						v-for="(item, index) in productCategoryInfo"
						:key="'product-category-' + index"
						:to="{path: '/shop/cat/'+item.cat_name + '/'+item.id}"
					>
						{{ item.cat_name }}
						<template v-if="index < productCategoryInfo.length - 1">,</template>
					</nuxt-link>
				</strong>
			</li>
				</div>
			<!-- <div v-else>
					{{product.brand.brand_name }}

			</div> -->


			</div>
			<div class="title-wrap">
				<h3 class="product-title">
					<nuxt-link :to="'/product/default/' + product.id">{{ product.product_name }}</nuxt-link>
				</h3>
			</div>
			<div
				class="ratings-container"
				v-if="type === 1"
			>
				<div class="product-ratings">
					<span
						class="ratings"
						:style="{width: product.ratings * 20 + '%'}"
					></span>
					<span class="tooltiptext tooltip-top">{{ product.ratings | priceFormat }}</span>
				</div>
			</div>
			<div
				class="price-box"
				v-if="product.price"
				key="singlePrice"
			>
				<template v-if="!product.pricesale">
					<span class="product-price">${{ product.price | priceFormat }}</span>
				</template>

				<template v-else>
					<span class="old-price">${{ product.price | priceFormat }}</span>
					<span class="product-price">${{ product.pricesale | priceFormat }}</span>
				</template>
			</div>

			
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { baseUrl,backendUrl } from '~/api';

export default {
	props: {
		product: Object,
		productCategoryInfo: Array,
		isActions: {
			type: Boolean,
			default: true
		},
		type: {
			type: Number,
			default: 1
		}
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			minPrice: 0,
			maxPrice: 0,
			discount: 0,
			backendUrl:backendUrl
		};
	},
	computed: {
	
	},
	created: function () {

	},
	methods: {
		openQuickview(){
			
		}
	}
};
</script>