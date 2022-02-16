<template>
	<div>
		<h1 class="product-title">{{ product.productname }}</h1>
		<div class="ratings-container">
			<div class="product-ratings">
				<span
					class="ratings"
					:style="'width:' + product.ratings * 20 + '%'"
				></span>
				<span class="tooltiptext tooltip-top">{{ product.ratings | priceFormat }}</span>
			</div>
			<a
				href="javascript:;"
				class="rating-link"
				v-if="product.reviews > 0"
			>( {{ product.reviews }} Reviews )</a>
			<a
				href="javascript:;"
				class="rating-link"
				v-else
			>( There is no review yet. )</a>
		</div>
		<hr class="short-divider" />
		<div
			class="price-box"
			v-if="product.productprice"
			key="singlePrice"
		>
			<template v-if="!product.productpricesale">
				<span class="new-price">${{ product.productprice | priceFormat }}</span>
			</template>

			<template v-else>
				<span class="new-price">${{ product.productpricesale | priceFormat }}</span>
				<span class="old-price">${{ product.productprice | priceFormat }}</span>
			</template>
		</div>
		<div
			class="price-box"
			v-else
		>
			<template v-if="minPrice !== maxPrice">
				<span class="new-price">${{ minPrice | priceFormat }} &ndash; ${{ maxPrice | priceFormat }}</span>
			</template>

			<template v-else>
				<span class="new-price">${{ minPrice | priceFormat }}</span>
			</template>
		</div>
		<div
			class="product-desc"
			v-if="product.productdescription"
		>
			<span v-html="product.productdescription"></span>
		</div>
		<ul class="single-info-list">
			<li v-if="product.productsku">
				SKU:
				<strong>{{ product.productsku }}</strong>
			</li>

			<li v-if="productCategory">
				CATEGORY:
				<strong>
					<nuxt-link
						class="product-category"
						v-for="(item, index) in productCategory"
						:key="'product-category-' + index"
						:to="{path: '/shop/cat/'+item.cat_slug}"
					>
						{{ item.cat_name }}
						<template v-if="index < productCategory.length - 1">,</template>
					</nuxt-link>
				</strong>
			</li>
			<li v-if="productBrand">
				BRAND:
				<strong>
					<nuxt-link
						:to="{path: '/shop/brand/'+brand.brand_name + '/'+brand.id}"
						class="product-category"
						v-for="(brand,index) in productBrand"
						:key="'product-brand-' + index"
					>
						{{ brand.brand_name }}
						<template v-if="index < productBrand.length - 1">,</template>
					</nuxt-link>
				</strong>
			</li>
				<div class="product-single-qty">
						<pv-quantity-input
							:product="product"
							:qty="1"
							@changeCurrentQty="changeQty"
						>
						</pv-quantity-input>
					</div>

					<a
						href="javascript:;"
						v-if="product.productquantity != 0"
						class="btn btn-dark add-cart mr-2"
						title="Add to Cart"
						@click="addCart"
						:class="{ disabled: !isCartActive }"
						>Add to Cart</a>
						<a
						href="javascript:;"
						class="btn btn-dark add-cart mr-2"
						title="Add to Cart"
						v-else
						@click="addCart"
						:class="{ disabled: !isCartActive }"
						>Out Of Stock</a>

					<nuxt-link
						to="/pages/cart"
						class="btn btn-gray view-cart d-none"
					>View cart</nuxt-link>
			
		</ul>
		<div class="product-single-share mb-3">
			<label class="sr-only">Share:</label>

			<div
				class="social-icons mr-2"
				v-if="isShare"
			>
				<a
					href="javascript:;"
					class="social-icon social-facebook icon-facebook"
					
					title="Facebook"
				></a>
				<a
					href="javascript:;"
					class="social-icon social-twitter icon-twitter"
					
					title="Twitter"
				></a>
				<a
					href="javascript:;"
					class="social-icon social-linkedin fab fa-linkedin-in"
					
					title="Linkedin"
				></a>
				<a
					href="javascript:;"
					class="social-icon social-gplus fab fa-google-plus-g"
					
					title="Google +"
				></a>
				<a
					href="javascript:;"
					class="social-icon social-mail icon-mail-alt"
					
					title="Mail"
				></a>
			</div>

			<nuxt-link
				to="/pages/wishlist"
				class="btn-icon-wish add-wishlist added-wishlist"
				title="Go to Wishlist"
				v-if="isWishlisted"
			>
				<i class="icon-wishlist-2"></i>
				<span>Go to Wishlist</span>
			</nuxt-link>

			<a
				href="javascript:;"
				class="btn-icon-wish add-wishlist"
				title="Add to Wishlist"
				@click="addWishlist($event)"
				v-if="!isWishlisted"
			>
				<i class="icon-wishlist-2"></i>
				<span>Add to Wishlist</span>
			</a>
		</div>
	
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { VueSlideToggle } from 'vue-slide-toggle';
import PvProductNav from '~/components/partials/product/PvProductNav';
import PvQuantityInput from '~/components/features/PvQuantityInput';
import { baseUrl } from '~/api';

export default {
	components: {
		VueSlideToggle,
		PvProductNav,
		PvQuantityInput
	},
	props: {

		product: Object,
		productCategory: Array,
		productBrand: Array,
		prevProduct: Object,
		nextProduct: Object,
		isProductNav: {
			type: Boolean,
			default: true
		}
	},
	data: function () {
		return {
			minPrice: 0,
			maxPrice: 0,
			qty: 1,
			currentIndex: 0,
			baseUrl: baseUrl,
			vSizes: [],
			vColors: [],
			curSize: {
				name: null,
				text: null,
				image: null
			},
			curColor: {
				name: null,
				text: null,
				image: null
			},
			tIndex: 0,
			isShare: {
				type: Boolean,
				default: true
			}
		};
	},
	watch: {
		$route: function () {
			this.getFlag();
		}
	},
	computed: {
		...mapGetters( 'wishlist', [ 'wishList' ] ),
		curIndex: function () {
			if ( this.curColor.name !== null && this.vSizes.length === 0 ) {
				let index = this.product.findIndex(
					item => item.colors[ 0 ].color_name === this.curColor.name
				);
				this.tIndex = index;
				return index;
			}
			if ( this.curSize.name !== null && this.vColors.length === 0 ) {
				let index = this.product.findIndex(
					item => item.size[ 0 ].size_name === this.curSize.name
				);
				this.tIndex = index;
				return index;
			}
			if ( this.curColor.name !== null && this.curSize.name !== null ) {
				let index = this.product.findIndex(
					item =>
						item.colors[ 0 ].color_name === this.curColor.name &&
						item.size[ 0 ].size_name === this.curSize.name
				);
				this.tIndex = index;
				return index;
			} else {
				return this.tIndex;
			}
		},
		isCartActive: function () {
			if ( this.product.productquantity >=  this.qty ) return true;
			if ( this.product.productquantity === 0 ) return false;
			if ( this.curSize.name !== null && this.curColor.name !== null )
				return true;
			if ( this.curColor.name !== null && this.vSizes.length === 0 )
				return true;
			if ( this.curSize.name !== null && this.vColors.length === 0 )
				return true;
			return false;
		},
		isWishlisted: function () {
			if (
				this.wishList.findIndex(
					item => item.name === this.product.productname
				) > -1
			)
				return true;
			return false;
		},
		isPriceShow: function () {
			if ( this.curSize.name !== null && this.curColor.name !== null )
				return true;
			if ( this.curColor.name !== null && this.vSizes.length === 0 )
				return true;
			if ( this.curSize.name !== null && this.vColors.length === 0 )
				return true;
			return false;
		}
	},
	created: function () {
		this.getFlag();
	},
	mounted: function () {
		
		// if ( this.product.variable_product && !this.product.price ) {
		// 	this.minPrice = this.product.variants[ 0 ].price;

		// 	this.product.variants.forEach( item => {
		// 		let itemPrice = item.sale_price ? item.sale_price : item.price;
		// 		if ( this.minPrice > itemPrice ) this.minPrice = itemPrice;
		// 		if ( this.maxPrice < itemPrice ) this.maxPrice = itemPrice;
		// 	} );
		// }

		// if ( this.product.variants.length > 0 ) {
		// 	if ( this.product.variants[ 0 ].size[ 0 ] )
		// 		this.product.variants.forEach( item => {
		// 			if (
		// 				this.vSizes.findIndex(
		// 					vsize => vsize.name === item.size[ 0 ].size_name
		// 				) === -1
		// 			)
		// 				this.vSizes.push( {
		// 					name: item.size[ 0 ].size_name,
		// 					text: item.size[ 0 ].size,
		// 					image: item.size[ 0 ].size_thumbnail
		// 				} );
		// 		} );

		// 	// if ( this.product.variants[ 0 ].colors[ 0 ] )
		// 	// 	this.product.variants.forEach( item => {
		// 	// 		if (
		// 	// 			this.vColors.findIndex(
		// 	// 				vColor => vColor.name === item.colors[ 0 ].color_name
		// 	// 			) === -1
		// 	// 		)
		// 	// 			this.vColors.push( {
		// 	// 				name: item.colors[ 0 ].color_name,
		// 	// 				text: item.colors[ 0 ].color,
		// 	// 				image: item.colors[ 0 ].color_thumbnail
		// 	// 			} );
		// 	// 	} );
		// }
	},
	methods: {
		...mapActions( 'cart', [ 'addToCart' ] ),
		...mapActions( 'wishlist', [ 'addToWishlist' ] ),
		addCart: function () {
			if ( this.isCartActive ) {
				let saledProduct;
				if ( this.product.productquantity > 0 ) {
					let saledPrice;
					if ( this.product.productprice )
						saledPrice = this.product.productpricesale
							? this.product.productpricesale
							: this.product.productprice;
					else {
						saledPrice = this.product[ this.curIndex ]
							.productpricesale
							? this.product[ this.curIndex ].productpricesale
							: this.product[ this.curIndex ].productprice;
					}

					// let saledName;
					// if ( this.curColor.name && this.curSize.name ) {
					// 	saledName = this.curColor.name.charAt( 0 ).toUpperCase() + this.curColor.name.slice( 1 ) + ', ' + this.curSize.name;
					// }
					// if ( !this.curColor.name ) {
					// 	saledName = this.curSize.name;
					// }
					// if ( !this.curSize.name ) {
					// 	saledName = this.curColor.name.charAt( 0 ).toUpperCase() + this.curColor.name.slice( 1 );
					// }

					saledProduct = {
						...this.product,
						qty: this.qty,
						name:
							this.product.productname,
						price: saledPrice,
						producteditid: this.product.producteditid
					};
				} else {
					saledProduct = {
						...this.product,
						qty: this.qty,
						price: this.product.productpricesale
							? this.product.productpricesale
							: this.product.productprice,
							producteditid: this.product.producteditid
					};
				}
				console.log(saledProduct)
				this.addToCart( { product: saledProduct } );
			}
		},
		addWishlist: function ( e ) {
			
			e.currentTarget.classList.add( 'load-more-overlay', 'loading' );

			setTimeout( () => {
				let saledPrice;
					if ( this.product.productprice )
						saledPrice = this.product.productpricesale
							? this.product.productpricesale
							: this.product.productprice;
					else {
						saledPrice = this.product[ this.curIndex ]
							.productpricesale
							? this.product[ this.curIndex ].productpricesale
							: this.product[ this.curIndex ].productprice;
					}
				let saledProduct = {
						...this.product,
						qty: this.qty,
						name:
						this.product.productname,
						price: saledPrice,
						producteditid: this.product.producteditid
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
		isDisabled: function ( color, size ) {
			if ( !color.name || !size.name ) return false;

			if ( this.vSizes.length === 0 ) {
				return (
					this.product.findIndex(
						item => item.colors[ 0 ].color_name === color.name
					) === -1
				);
			}

			if ( this.vColors.length === 0 ) {
				return (
					this.product.findIndex(
						item => item.size[ 0 ].size_name === size.name
					) === -1
				);
			}

			return (
				this.product.findIndex(
					item =>
						item.colors[ 0 ].color_name === color.name &&
						item.size[ 0 ].size_name === size.name
				) === -1
			);
		},
		toggleColorItem: function ( color ) {
			if ( !this.isDisabled( color, this.curSize ) ) {
				if ( this.curColor === color ) {
					this.curColor = { name: null, text: null, image: null };
				} else {
					this.curColor = color;
				}
			}
		},
		toggleSizeItem: function ( size ) {
			if ( !this.isDisabled( this.curColor, size ) ) {
				if ( this.curSize === size ) {
					this.curSize = { name: null, text: null, image: null };
				} else {
					this.curSize = size;
				}
			}
		},
		resetValue() {
			this.curColor = { name: null, text: null, image: null };
			this.curSize = { name: null, text: null, image: null };
		},
		getFlag: function () {
			if ( this.$route.path.includes( 'sticky-info' ) ) this.isShare = false;
		},
		changeQty: function ( quantity ) {
			this.qty = quantity;
		}
	}
};
</script>