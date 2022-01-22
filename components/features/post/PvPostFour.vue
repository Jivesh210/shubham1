<template>
	<article class="post">
		<figure
			class="post-media"
			:class="post.type==='video' ? `post-video` : ''"
		>
			<nuxt-link
				:to="`/pages/single/${post.slug}`"
				v-if="post.type === 'image' || post.type === 'gallery'"
			>
				<img
					v-lazy="`${baseUrl}${post.small_picture[0].url}`"
					alt="blog"
					:width="post.small_picture[0].width"
					:height="post.small_picture[0].height"
					v-if="post.small_picture.length > 0"
				/>
				<template v-else>
					<img
						v-lazy="`${baseUrl}${post.picture[0].url}`"
						alt="blog"
						:width="post.picture[0].width"
						:height="post.picture[0].height"
					/>
				</template>
			</nuxt-link>

			<template v-else-if="post.type === 'video'">
				<nuxt-link :to="`/pages/single/${post.slug}`">
					<img
						v-lazy="`${baseUrl}${post.picture[0].url}`"
						alt="blog"
						:width="post.picture[0].width"
						:height="post.picture[0].height"
					/>
				</nuxt-link>
				<a
					href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
					@click.prevent="openVideoModal"
					class="btn-video btn-iframe d-none"
				>
					<i class="far fa-play-circle"></i>
				</a>
			</template>

			<span
				class="prod-full-screen"
				@click="openLightBox"
			>
				<i class="fas fa-search"></i>
			</span>
		</figure>

		<div class="post-body">
			<div class="category-list">
				<span
					v-for="(cat,index) in post.blog_categories"
					:key="`post-category-${index}`"
				>
					<nuxt-link :to="{ path: '/shop', query: { category: cat.slug }}">{{ cat.Name }}</nuxt-link>
					<template v-if="index < post.blog_categories.length - 1">,</template>
				</span>
			</div>

			<h2 class="post-title">
				<nuxt-link :to="'/pages/single/' + post.slug">{{ post.title }}</nuxt-link>
			</h2>

			<div class="post-content">
				<p>{{ post.content }}</p>
			</div>
		</div>
	</article>
</template>
<script>
import { baseUrl } from '~/api';
import { baseSlider1 } from '~/utils/data/carousel';
import PvCarousel from '~/components/features/PvCarousel';

export default {
	components: {
		PvCarousel
	},
	props: {
		post: Object,
		postIndex: Number
	},
	data: function () {
		return {
			baseUrl: baseUrl,
			baseSlider1: baseSlider1
		};
	},
	methods: {
		openVideoModal: function () {
			this.$modal.show(
				() => import( '~/components/features/modal/PvVideoModal' ),
				{},
				{
					width: '880',
					height: '495',
					adaptive: true,
					class: 'video-modal-container'
				}
			);
		},
		openLightBox: function () {
			this.$parent.$parent.$parent.$refs.lightBox.showImage( this.postIndex );
		}
	}
};
</script>