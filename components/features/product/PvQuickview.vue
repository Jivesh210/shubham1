<template>
	<div class="product-single-container product-single-default product-quick-view mb-0 custom-scrollbar skeleton-body">
		<div
			class="quickview-wrap product"
			v-if="!product"
		>
			<div class="skel-group">
				<div class="col-md-6 summary-before"></div>
				<div class="col-md-6 summary entry-summary"></div>
			</div>
		</div>

		<div
			class="row"
			v-if="product"
		>
			<div class="col-md-6 product-single-gallery mb-md-0">
				<pv-media-one
					:product="product"
					:is-magnify="false"
				></pv-media-one>
			</div>

			<div class="col-md-6 product-single-details mb-0">
				<pv-detail-one
					:product="product"
					:productBrand="productBrandInfo"
					:is-product-nav="false"
				></pv-detail-one>
			</div>

			<button
				title="Close (Esc)"
				type="button"
				class="mfp-close"
				@click="$emit('close')"
			>×</button>
		</div>
	</div>
</template>

<script>
import PvMediaOne from '~/components/partials/product/media/PvMediaOne';
import PvDetailOne from '~/components/partials/product/detail/PvDetailOne';
import Api, { baseUrl, currentDemo } from '~/api';

export default {
	components: {
		PvMediaOne,
		PvDetailOne
	},
	props: {
		id: null,
		
	},
	data: function () {
		return {
		productBrandInfo: [],
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
			currentDemo: currentDemo,
			productBrand:[]
		}
	},
	mounted: function () {
		this.getProduct();
	},
	methods: {
		getProduct: function () {
			Api.get( `${ baseUrl }/search-products`, {
			params: {
				default_search_term: this.id
			}	
			}).then( response => {
				response.data.product.forEach((value) => {
						
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
						
							
						});
			
			} ).catch( error => ( { error: JSON.stringify( error ) } ) );
		}
	}
}
</script>
<style >
.skeleton-body{
		height:599px !important;
}
</style>