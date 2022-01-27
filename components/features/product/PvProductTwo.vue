<template>
	<div class="product-default left-details product-list" v-if="product.product && product.product.id">
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
					v-if="product.product.is_sale && !product.product.price"
				>Sale</div>
				<div
					class="product-label label-sale"
					v-if="product.product.is_sale && product.product.price"
				>{{ discount }}%</div>
			</div>
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
				class="product-description"
				v-if="product.product.short_description"
			>
				<p class="mb-0" v-html="product.product.short_description"></p>
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

			<div class="product-action">
				<!-- <nuxt-link
					:to="'/product/default/' + product.product.slug"
					class="btn-icon btn-add-cart product-type-simple"
					
					key="variantProduct"
				>
					<i class="fa fa-arrow-right"></i>
					<span>SELECT OPTIONS</span>
				</nuxt-link> -->

				<a
					href="javascript:;"
					class="btn-icon btn-add-cart product-type-simple"
				
					@click="addCart(product)"
				>
					<i class="icon-shopping-cart"></i>
					<span>ADD TO CART</span>
				</a>

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

				<a
					href="javascript:;"
					class="btn-quickview"
					title="Quick View"
					@click="openQuickview(product)"
					key="singleCart"
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

export default {
	props: {
		product: Object,
		adClass: String
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			minPrice: 0,
			maxPrice: 0,
			discount: 0,
			backendUrl:backendUrl,
			saledProduct:[],
		};
	},
	computed: {
		...mapGetters( 'wishlist', [ 'wishList' ] ),
		isWishlisted: function () {
			if (
				this.wishList.findIndex(
					item => item.name === this.product.product.product_name
				) > -1
			)
				return true;
			return false;
		}
	},
	mounted: function () {
		
		if ( this.product.product.is_sale && this.product.product.price ) {
			this.discount =
				( ( this.product.product.price - this.product.product.sale_price ) /
					this.product.product.price ) *
				100;
			this.discount = parseInt( this.discount );
		}

	},
	methods: {
		...mapActions( 'wishlist', [ 'addToWishlist' ] ),
		...mapActions( 'cart', [ 'addToCart' ] ),
		openQuickview: function (event) {
			this.$modal.show(
				() => import( '~/components/features/product/PvQuickview' ),
				{ id: event.product.id },
				{ width: '931',  height:'auto',adaptive:true, class: 'quickview-modal' }
			);
		},
		addWishlist: function ( e ) {
			e.currentTarget.classList.add( 'load-more-overlay', 'loading' );

			setTimeout( () => {
				let saledProduct;
				saledProduct = {
						...this.product,
						qty: this.product.qty,
						name:this.product.product.product_name,
						price: this.product.product.pricesale
							? this.product.product.pricesale
							: this.product.product.price,
							producteditid: this.product.product.id
					};
				this.addToWishlist( { product: saledProduct } );
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
		addCart (event) {
				let saledProduct;
				saledProduct = {
						...event,
						qty: event.qty,
						name:event.product.product_name,
						price: event.product.pricesale
							? event.product.pricesale
							: event.product.price,
							producteditid: event.product.id
					};

				this.addToCart( { product: saledProduct } );

		}
	}
};
</script>