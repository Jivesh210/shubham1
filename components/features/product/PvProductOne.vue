<template>
	<div class="product-default inner-quickview inner-icon"  v-if="product.product && product.product.id" >
		<figure>
			<nuxt-link :to="`/product/${product.product.slug}`">
				<img
					v-lazy="`${backendUrl}${product.product.image}`"
					
				/>
			</nuxt-link>
			<div class="label-group">
				<div
					class="product-label label-hot"
					v-if="product.product.is_hot"
				>HOT</div>
				<div
					class="product-label label-sale"
					v-if="product.product.pricesale && !product.product.price"
				>Sale</div>
				<div
					class="product-label label-sale"
					v-if="product.product.pricesale && product.product.price"
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
				
				<div v-if="product.category"
					class="category-list"
				>
					<span 	
					>	
						<template >{{product.category.cat_name}}</template>
					</span>	
				</div>
			<div v-else>
					{{product.brand.brand_name }}

			</div>


			</div>
			<div class="title-wrap">
				<h3 class="product-title">
					<nuxt-link :to="`/product/${product.product.slug}`">{{ product.product.product_name }}</nuxt-link>
				</h3>
			</div>
			<div
				class="ratings-container"
				v-if="type === 1"
			>
				<div class="product-ratings">
					<span
						class="ratings"
						:style="{width: product.product.ratings * 20 + '%'}"
					></span>
					<span class="tooltiptext tooltip-top">{{ product.product.ratings | priceFormat }}</span>
				</div>
			</div>
			<div
				class="price-box"
				v-if="product.product.price"
				key="singlePrice"
			>
				<template v-if="!product.product.pricesale">
					<span class="product-price">${{ product.product.price | priceFormat }}</span>
				</template>

				<template v-else>
					<span class="old-price">${{ product.product.price | priceFormat }}</span>
					<span class="product-price">${{ product.product.pricesale | priceFormat }}</span>
				</template>
			</div>

			
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { baseUrl , backendUrl} from '~/api';

export default {
	props: {
		product: Object,
		adClass: String,
		brand:String,
		brands:Array,
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
			
		},
		
	}
};
</script>