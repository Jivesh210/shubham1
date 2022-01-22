<template>
	<div class="product-default left-details product-widget" v-if="product.product.featured">
		<figure>
			<nuxt-link :to="'/product/default/' + product.product.id">
		
				<template>
					<img
						:src='`${backendUrl}${product.product.image}`'
						alt="small-product-image"
						width="341"
						height="200"	
					/>
				</template>
			</nuxt-link>
		</figure>
		<div class="product-details">
			<h2 class="product-title font2">
				<nuxt-link :to="'/product/default/' + product.product.slug">{{ product.product.product_name }}</nuxt-link>
			</h2>

			<div class="ratings-container">
				<div class="product-ratings">
					<span
						class="ratings"
						:style="{width: product.product.ratings * 20 + '%'}"
					></span>
					<span class="tooltiptext tooltip-top">{{ product.ratings | priceFormat }}</span>
				</div>
			</div>

			<div
				class="price-box font2"
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

			<div
				class="price-box font2"
				v-else
			>
				<span
					class="product-price"
					v-if="minPrice !== maxPrice"
				>${{ minPrice | priceFormat }} &ndash; ${{ maxPrice | priceFormat }}</span>

				<span
					class="product-price"
					v-else
				>${{ minPrice | priceFormat }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { baseUrl, backendUrl} from '~/api';

export default {
	props: {
		product: Object,
		isLazy: {
			type: Boolean,
			default: true
		}
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			backendUrl: backendUrl,
			minPrice: 0,
			maxPrice: 0,
			
		};
	},
	mounted: function () {
		if ( this.product.product.pricesale ) {
			this.discount =
				( ( this.product.product.price - this.product.pricesale ) /
					this.product.product.price ) *
				100;
			this.discount = parseInt( this.discount );
		}

		if ( this.product.product_name > 0 && !this.product.product.price ) {
			this.minPrice = this.product.price;
			this.product.product_name.forEach( item => {
				let itemPrice = item.sale_price ? item.sale_price : item.price;
				if ( this.minPrice > itemPrice ) this.minPrice = itemPrice;
				if ( this.maxPrice < itemPrice ) this.maxPrice = itemPrice;
			} );
		}
	}
};
</script>