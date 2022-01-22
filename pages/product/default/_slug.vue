<template>
	<main class="main">
		<div class="container skeleton-body">
			<nav
				aria-label="breadcrumb"
				class="breadcrumb-nav"
			>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<nuxt-link to="/">
							<i class="icon-home"></i>
						</nuxt-link>
					</li>
					<li class="breadcrumb-item">
						<nuxt-link to="/shop">Shop</nuxt-link>
					</li>
			
					<li
						class="breadcrumb-item active"
						aria-current="page"
						v-if="loaded"
					>{{product.productname}}</li>
				</ol>
			</nav>
			<div class="product-single-container product-single-default">
				<div
					class="row"	
				>
					<div class="col-lg-5 col-md-6 product-single-gallery">
						<pv-media-one :productGallery="productGalleryInfo" :product="product"></pv-media-one>
					</div>

					<div class="col-lg-7 col-md-6 product-single-details">
						<pv-detail-one
							:product="product"
							:productCategory="productCategoryInfo"
							:productBrand="productBrandInfo"
						></pv-detail-one>
					</div>
				</div>
			</div>
			<pv-related-products v-if="productCategoryInfo.length > 0" :products="prod" :productCategoryInfo="productCategoryInfo"></pv-related-products>
		</div>
		
	</main>
</template>

<script>
import PvMediaOne from '~/components/partials/product/media/PvMediaOne';
import PvDetailOne from '~/components/partials/product/detail/PvDetailOne';
//import PvDescOne from '~/components/partials/product/description/PvDescOne';
import PvRelatedProducts from '~/components/partials/product/PvRelatedProducts';
//import PvSmallCollection from '~/components/partials/product/PvSmallCollection';
import Api, { baseUrl} from '~/api';

export default {
	components: {
		PvMediaOne,
		PvDetailOne,
		//PvDescOne,
		PvRelatedProducts,
		///PvSmallCollection
	},
	data: function () {
		return {
			productCategoryInfo: [],
			productBrandInfo: [],
			productGalleryInfo: [],
			productCategory:[],
			product:{
				producteditid:"",
				productname: "",
				productslug: "",
				productdescription: "",
				productsku: "",
				productprice: "",
				productpricesale: "",
				productquantity: "",
				stockstatus:"",
				productstatus: "published",
				productinfeature: "",

				productseotitle: "",
				productseodescription: "",
				productbrands: "",
				productattr:"1",
				productattrstitle:"Attribute Title",
				productfeatureimage:'',
				attrlistarr:{
				productattrsid:[],
				productattrsprice:[],
				productattrsqty:[],
				productattrssku:[],
				productattrsstock:['in_stock'],
				productattrssaleprice:[],

				},
			
				producttype:"simple_product",
				productattrevent:[],
			},
			relatedProducts: null,
			featuredProducts: null,
			bestProducts: null,
			latestProducts: null,
			topRatedProducts: null,
			nextProduct: null,
			prevProduct: null,
			loaded: false,
			prod: []
			
		};
	},
	created: function () {
		this.getProduct();
	},
	methods: {
		getProduct: function () {
			this.loaded = false;
			
			Api.get( `${ baseUrl }/search-products`, {
			params: {
				default_search_term: this.$route.params.slug
			}	
			})
				.then( response => {

					response.data.product.forEach((value) => {
						this.prod= response.data.product
						
						this.product.producteditid  = value.id;
						this.product.productname = value.product_name;
						this.product.productslug = value.slug;
						this.product.productdescription = value.description;
						this.product.producttype = value.product_type;
						this.product.productsku = value.sku_no;
						this.product.productprice = value.price;
						this.product.productpricesale = value.pricesale;
						this.product.productquantity = value.qty;
						this.product.stockstatus = value.stock_status;
						this.product.productstatus = value.status;
						this.product.productinfeature = value.featured;
						this.product.productseotitle = value.seotitle;
						this.product.productseodescription = value.seodescription;
						this.product.productfeatureimage = value.image;
						this.product.product_card = value.product_type;
						this.productGalleryInfo=value.product_gallery;
						this.productBrandInfo=response.data.brand;
						
							// response.data.category.forEach((value2) => {
							// this.productCategory.push(value2);
						// });
							for (let i = 0; i < response.data.category.length; i++) {
								
									for(let j = 0; j < response.data.category[i].length; j++){
										this.productCategoryInfo.push(response.data.category[i][j])
										
									}
								
							}
							
							
						});
					
					
						this.loaded = true;
				} )
				.catch( error => ( { error: JSON.stringify( error ) } ) );
		}
	}
};
</script>