<template lang="pug">
	.stop
		.stop__title {{ stop.title }}
		ul.entry-list
			li.entry(v-for="entry in stop.entries" :key="entry._id")
				h5.entry__title {{ entry.title }}
				ul.photo-list
					li(v-for="photo in entry.photos" :key="photo._id")
						.photo
							.photo__img
								img(:src="imgPath + photo.filePath")
							.photo__caption(v-if="photo.caption")
								.photo__caption-text {{ photo.caption }}
</template>

<script>
import { apiURL } from '@/utilities/apiURL.js';
export default {
	name: 'StopDetail',
	props: {
		stop: {
			type: Object
		}
	},
	computed: {
		imgPath() {
			return apiURL + 'uploads/';
		}
	}
};
</script>

<style lang="scss">
.stop {
	margin-bottom: 4rem;
	&.is-intersected {
		background-color: red;
	}
}
.stop__title {
	font-size: 3rem;
	letter-spacing: 0.3rem;
	margin: 0 0 1.4rem;
	text-transform: uppercase;
	line-height: 1.2;
	color: $green_light;
	@media (min-width: 60em) {
		margin-bottom: 2rem;
	}
}
.entry-list {
	margin-bottom: 2rem;
}
.entry {
	margin-bottom: 6rem;
	@media (min-width: 60em) {
		margin-bottom: 10rem;
	}
}
.entry__title {
	font-size: 2.1rem;
	margin: 0 0 1rem;
	@media (min-width: 60em) {
		margin-bottom: 2rem;
	}
}
.photo-list {
	.photo {
		margin-left: -2rem;
		margin-right: -2rem;
		margin-bottom: 4rem;
		@media (min-width: 60em) {
			margin-bottom: 6rem;
		}
	}
}
.photo {
	position: relative;
	box-shadow: 0 14px 20px rgba(black, 0.3);
}
.photo__img {
}
.photo__caption {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 4rem 2rem 2rem;
	font-size: 1.6rem;
	&::before {
		content: '';
		display: block;
		background-image: linear-gradient(
			to bottom,
			rgba(black, 0),
			rgba(black, 0.5),
			rgba(black, 0.7)
		);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
}
.photo__caption-text {
	position: relative;
}
</style>
