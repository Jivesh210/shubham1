<template>
	<main class="main home-page bg-gray">
		<pv-intro-section></pv-intro-section>

		<pv-popular-collection
			:products="bestProducts"
		></pv-popular-collection>

		<pv-special-collection :products="topRatedProducts"></pv-special-collection>

		<!-- <pv-brand-section></pv-brand-section> -->

		<!-- <pv-blog-section :posts="posts"></pv-blog-section> -->

		<!-- <pv-newsletter-section></pv-newsletter-section> -->

		<light-box
			v-if="lightBoxMedia.length > 0"
			ref="lightBox"
			:media="lightBoxMedia"
			:show-light-box="false"
			class="blog-light-box"
		/>
	</main>
</template>

<script>
import LightBox from 'vue-image-lightbox';
import PvIntroSection from '~/components/partials/home/PvIntroSection';
import PvPopularCollection from '~/components/partials/home/PvPopularCollection';
import PvSpecialCollection from '~/components/partials/home/PvSpecialCollection';
// import PvBrandSection from '~/components/partials/home/PvBrandSection';
// import PvBlogSection from '~/components/partials/home/PvBlogSection';
// import PvNewsletterSection from '~/components/partials/home/PvNewsletterSection';
import {
	getProductsByAttri,
	getTopSellingProducts,
	getTopRatedProducts
} from '~/utils/service';
import { getCookie } from '~/utils';
import Api, { baseUrl } from '~/api';

export default {
	components: {
		LightBox,
		PvIntroSection,
		PvPopularCollection,
		PvSpecialCollection,
		// PvBrandSection,
		// PvBlogSection,
		// PvNewsletterSection
	},
	data: function () {
		return {
			products: [],
			posts: [],
			bestProducts: [],
			topRatedProducts: [],
			timerId: 0
		};
	},
	computed: {
		lightBoxMedia: function () {
			let pictures = [];
			for ( let i = 0; i < this.posts.length; i++ ) {
				pictures.push( this.posts[ i ].picture[ 0 ] );
			}
			return pictures.reduce( ( acc, cur ) => {
				return [
					...acc,
					{
						src: `${ baseUrl }${ cur.url }`,
						thumb: `${ baseUrl }${ cur.url }`
					}
				];
			}, [] );
		}
	},
	mounted: function () {
		Api.get( `${ baseUrl }/demo35` )
			.then( response => {
				this.products = response.data.products;
				this.posts = response.data.posts;
				this.bestProducts = getTopSellingProducts(
					response.data.products
				);
				this.topRatedProducts = getTopRatedProducts(
					response.data.products
				);
			} )
			.catch( error => ( { error: JSON.stringify( error ) } ) );

		this.timerId = setTimeout( () => {
			if (
				this.$route.path === '/' &&
				getCookie( 'newsletter' ) !== 'false'
			) {
				// this.$modal.show(
				// 	() =>
				// 		import( '~/components/features/modal/PvNewsletterModal' ),
				// 	{},
				// 	{ width: '740', height: 'auto', adaptive: true, class: 'newsletter-modal' }
				// );
			}
		}, 10000 );
	},
	destroyed: function () {
		clearTimeout( this.timerId );
	}
};
</script>