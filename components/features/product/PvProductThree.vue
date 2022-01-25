<template>
	<div class="product-default">
		<figure>
			<nuxt-link :to="`/product/${product[0].product.slug}`">
				<img
					v-lazy="`${backendUrl}${product[0].product.image}`"
					alt="large-picture"
					
				/>
			</nuxt-link>
				
			<div class="product-countdown-container">
				<span class="product-countdown-title">offer ends
					in:</span>

				<pv-count-down
					until="2022-10-05"
					:compact="true"
				></pv-count-down>
				
			</div>
		</figure>

		<div class="product-details">
			<div class="category-list">
				<span
					v-for="(cat,index) in product[0].product.product_categories"
					:key="`product-category-${index}`"
				>
					<nuxt-link :to="{ path: '/shop', query: { category: cat.slug }}">{{ cat.name }}</nuxt-link>
					<template v-if="index < product[0].product.product_categories.length - 1">,</template>
				</span>
			</div>
				{{product[0].product.product_name}}
			<h3 class="product-title">
				<nuxt-link :to="'/product/default/' + product[0].product.slug">{{product[0].product.product_name}}</nuxt-link>
			</h3>
				
			<div class="ratings-container">
				<div class="product-ratings">
					
					<span
						class="ratings"
						:style="{width: product.ratings * 20 + '%'}"
					></span>
					<span class="tooltiptext tooltip-top">{{ product[0].product.ratings | priceFormat }}</span>
				</div>
			</div>

			<div
				class="price-box"
				v-if="product[0].product.price"
				key="singlePrice"
			>
				<template v-if="!product[0].product.pricesale">
					<span class="product-price">${{ product[0].product.price | priceFormat }}</span>
				</template>

				<template v-else>
					<span class="old-price">${{ product[0].product.price | priceFormat }}</span>
					<span class="product-price">${{ product[0].product.pricesale | priceFormat }}</span>
				</template>
			</div>

			<div
				class="price-box"
				v-else
			>
				<template v-if="minPrice !== maxPrice">
					<span class="product-price">${{ minPrice | priceFormat }} &ndash; ${{ maxPrice | priceFormat }}</span>
				</template>

				<template v-else>
					<span class="product-price">${{ minPrice | priceFormat }}</span>
				</template>
			</div>

			<div
				class="product-action"
				v-if="isActions"
			>
				<nuxt-link
					to="/pages/wishlist"
					class="btn-icon-wish added-wishlist"
					title="Go to Wishlist"
					v-if="isWishlisted"
				>
					<i class="icon-wishlist-2"></i>
				</nuxt-link>

				<a
					href="javascript:;"
					class="btn-icon-wish"
					title="Add to Wishlist"
					@click="addWishlist($event)"
					v-if="!isWishlisted"
				>
					<i class="icon-wishlist-2"></i>
				</a>

				<nuxt-link
					:to="'/product/default/' + product[0].product.slug"
					class="btn-icon btn-add-cart"
					v-if="product[0].product.length > 0"
					key="variantProduct"
				>
					<i class="fa fa-arrow-right"></i>
					<span>SELECT OPTIONS</span>
				</nuxt-link>

				<a
					href="javascript:;"
					class="btn-icon btn-add-cart product-type-simple"
					v-else
					@click="addCart"
				>
					<i class="icon-shopping-cart"></i><span>ADD TO CART</span>
				</a>

				<a
					href="javascript:;"
					class="btn-quickview"
					title="Quick View"
					@click="openQuickview"
				>
					<i class="fas fa-external-link-alt"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { baseUrl,backendUrl } from '~/api';
import PvCountDown from '~/components/features/PvCountDown';

export default {
	components: {
		PvCountDown
	},
	props: {
		product: Array,
		adClass: String,
		isActions: {
			type: Boolean,
			default: true
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
		...mapGetters( 'wishlist', [ 'wishList' ] ),
		isWishlisted: function () {
			if (
				this.wishList.findIndex(
					item => item.name === this.product.name
				) > -1
			)
				return true;
			return false;
		}
	},
	mounted: function () {
		if ( this.product.is_sale && this.product.price ) {
			this.discount =
				( ( this.product.price - this.product.sale_price ) /
					this.product.price ) *
				100;
			this.discount = parseInt( this.discount );
		}

		if ( !this.product.price ) {
			this.minPrice = this.product[ 0 ].price;
			this.product.forEach( item => {
				let itemPrice = item.is_sale ? item.sale_price : item.price;
				if ( this.minPrice > itemPrice ) this.minPrice = itemPrice;
				if ( this.maxPrice < itemPrice ) this.maxPrice = itemPrice;
			} );
		}
	},
	methods: {
		...mapActions( 'wishlist', [ 'addToWishlist' ] ),
		...mapActions( 'cart', [ 'addToCart' ] ),
		openQuickview: function () {
			this.$modal.show(
				() => import( '~/components/features/product/PvQuickview' ),
				{ slug: this.product.slug },
				{ width: '931', height: 'auto', adaptive: true, class: 'quickview-modal' }
			);
		},
		addWishlist: function ( e ) {
			e.currentTarget.classList.add( 'load-more-overlay', 'loading' );

			setTimeout( () => {
				this.addToWishlist( { product: this.product[0] } );
				document
					.querySelector( '.wishlist-popup' )
					.classList.add( 'active' );

				setTimeout( () => {
					document
						.querySelector( '.wishlist-popup' )
						.classList.remove( 'active' );
				}, 1000 );
			}, 1000 );
		},
		addCart: function () {
			if ( this.product[0].product.qty > 0 ) {
				let saledProduct = { ...this.product[0] };
				if ( this.product[0].product.pricesale ) {
					saledProduct.price = this.product[0].product.pricesale;
				}

				this.addToCart( { product: saledProduct } );
			}
		}
	}
};
</script>