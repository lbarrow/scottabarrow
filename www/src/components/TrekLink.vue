<template lang="pug">
	router-link.trek-link(:to="'/treks/' + trek.slug")
		.trek-link__info
			.trek-link__dates {{ trekDates }}
			h3.trek-link__title {{ trek.title }}
		.trek-link__photo
			img(:src="imgPath + trek.coverImagePath")
</template>

<script>
import dayjs from 'dayjs';
import { apiURL } from '@/utilities/apiURL.js';

export default {
	name: 'TrekLink',
	props: {
		trek: Object
	},
	computed: {
		trekDates() {
			return dayjs(this.trek.startDate).format('YYYY');
		},
		imgPath() {
			return apiURL + 'uploads/treks/';
		}
	}
};
</script>

<style lang="scss">
.trek-link {
	position: relative;
	border-radius: 0.4rem;
	color: white;
	display: block;
	overflow: hidden;
	box-shadow: 0 20px 36px rgba(black, 0.75);
	&::after {
		content: '';
		display: block;
		background-color: $green;
		opacity: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		transition: all 0.3s ease;
	}
	&:hover {
		&::after {
			opacity: 0.3;
		}
	}
	img {
		display: block;
	}
	.trek-link__info {
		z-index: 1;
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 5rem 3rem 3rem;
		width: 100%;
		line-height: 1;
		transition: all 0.3s ease;
		text-shadow: 0 2px 8px rgba(black, 0.5);
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
	.trek-link__dates {
		font-size: 1.6rem;
		font-weight: normal;
		margin-bottom: 0.6rem;
		position: relative;
	}
	.trek-link__title {
		color: $orange_light;
		font-size: 3rem;
		font-weight: bold;
		position: relative;
	}
	.trek-link__dates,
	.trek-link__title {
		transition: all 0.3s ease;
	}
	&:hover {
		.trek-link__dates,
		.trek-link__title {
			transform: translateY(-1rem);
		}
	}
}
</style>
