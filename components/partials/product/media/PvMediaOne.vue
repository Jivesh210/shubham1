<template>
<div>
	<CoolLightBox
			:items="lightBoxMedia" 
      		:index="index"
      		@close="index = null"
		>
	</CoolLightBox>
		<div class="pg-vertical product-single-gallery">
		<div class="product-slider-container">
			<div class="label-group">
				<div
					class="product-label label-hot"
					v-if="product.productinfeature"
				>HOT</div>
				<div
					class="product-label label-sale"
					v-if="product.productpricesale"
				>Sale</div>
			</div>
			<PvCarousel
				ref="mediaRef"
				class="product-single-carousel show-nav-hover"
				:options="baseSlider1"
			>
				<div
					class="swiper-slide"
					v-for="(gallery,imageIndex) in productGallery"
					:key="imageIndex"
					@click="index = imageIndex"	
					
				>
					<img
						class="images-wrapper"
						v-lazy="`${backendUrl}${gallery.image}`"
						alt="lgPicture"
					/>	
				</div>
			</PvCarousel>
				
		<PvCarousel
			class="prod-thumbnail swiper-dots show-nav-hover"
			ref="thumbRef"
			:options="baseSlider2"
			>
			<div
				class="swiper-dot swiper-slide"
				v-for="(gallery,index) in productGallery"
				:key="'media-one' + index"
				@click="activeThumbItem(index, $event)"
				:class="{ active : index === 0 }"
			>
				<img
					v-lazy="`${backendUrl}${gallery.image}`"
					alt="product-thumbnail"
				/>
				
			</div>
		
		  </PvCarousel>	
	
		</div>
		</div>
 	
	
	</div>
</template>

<script>
import PvCarousel from "~/components/features/PvCarousel";
import CoolLightBox from 'vue-cool-lightbox'
import { baseUrl ,backendUrl} from "~/api";
import { baseSlider1,baseSlider2 } from "~/utils/data/carousel";

import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
	components: {
		PvCarousel,
		CoolLightBox
	},
	props: {
		product: Object,
		productGallery: Array,
		isMagnify: {
			type: Boolean,
			default: true
		}
	},
	data: function () {
		return {
			baseSlider1: baseSlider1,
			baseUrl: baseUrl,
			backendUrl:backendUrl,
			baseSlider2:baseSlider2,
			image: [],
			 index: null
		};
	},
	computed: {
		lightBoxMedia: function () {
				for(let i = 0; i <this.productGallery.length; i++) {
				this.image.push(this.productGallery[i].image)
				}
				return this.image.reduce( ( acc, cur ) => {
				return [
					...acc,
				
						`${ backendUrl }${ cur }`
						
				
				];
			}, [] );
		},
		
	},
	mounted: function () {
		
	// if ( this.image !== null ) {
	// 		this.$nextTick( () => {
	// 				let self = this;
	// 				self.$refs.mediaRef.swiper.on( "transitionStart", function () {
	// 				let activeIndex = self.$refs.mediaRef.swiper.activeIndex;
	// 				self.$refs.thumbRef.swiper.slideTo( activeIndex );
	// 				self.$refs.thumbRef.swiper.$el.find( ".swiper-wrapper" ).find( ".swiper-dot.active" )[ 0 ].classList.remove( "active" );
	// 				self.$refs.thumbRef.swiper.$el.find( ".swiper-wrapper" ).find( ".swiper-dot" )[ activeIndex ].classList.add( "active" );
	// 			} );
	// 		} );
	// 	}
	},
	methods: {
		
		
		activeThumbItem: function ( index, e ) {
			e.currentTarget.parentNode
				.querySelector( '.swiper-dot.active' )
				.classList.remove( 'active' );

			e.currentTarget.classList.add( 'active' );

			this.$refs.mediaRef.swiper.slideTo( index );
		},
		openLightBox: function () {
			this.$refs.lightBox.showImage(
				this.$refs.mediaRef.swiper.activeIndex
			);
		}
	}
};
</script>