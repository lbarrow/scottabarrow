<template lang="pug">
	.trek-detail
		h2.trek-detail__title {{ trek.title }}
		.trek-detail__dates {{ trekDates }}
		template(v-if="currentStop == 0")
			.trek-detail__desc
				p {{ trek.description }}
		
		.trek-detail__controls
			button(@click="prevStop" :class="{ 'is-disabled': currentStop == 0 }") previous stop
			button(@click="nextStop" :class="{ 'is-disabled': currentStop == stops.length - 1 }") next stop
		template(v-if="stops.length")
			stop-detail(:stop="stops[currentStop]")
</template>

<script>
import dayjs from 'dayjs';
import { EventBus } from '@/eventBus.js';
import { apiURL } from '@/utilities/apiURL.js';
import StopDetail from '@/components/StopDetail';
export default {
	name: 'trekDetail',
	components: {
		StopDetail
	},
	data() {
		return {
			trek: {},
			stops: [],
			currentStop: 0
		};
	},
	computed: {
		trekDates() {
			return (
				dayjs(this.trek.startDate).format('MMMM D, YYYY') +
				' - ' +
				dayjs(this.trek.endDate).format('MMMM D, YYYY')
			);
		}
	},
	methods: {
		prevStop() {
			if (this.currentStop > 0) {
				window.scrollTo(0, 0);
				this.currentStop--;
				EventBus.$emit('stopShown', this.stops[this.currentStop].location.coordinates);
			}
		},
		nextStop() {
			if (this.currentStop < this.stops.length - 1) {
				window.scrollTo(0, 0);
				this.currentStop++;
				EventBus.$emit('stopShown', this.stops[this.currentStop].location.coordinates);
			}
		}
	},
	mounted() {
		fetch(`${apiURL}api/treks/${this.$route.params.slug}`)
			.then(response => {
				return response.json();
			})
			.then(result => {
				this.trek = result.trek;
				this.stops = result.stops;

				const coordinates = this.stops.map(stop => {
					return stop.location.coordinates;
				});
				EventBus.$emit('trekLoaded', coordinates);
			});
	}
};
</script>

<style lang="scss">
.trek-detail {
	padding: 4rem;
	@media (min-width: 60em) {
		padding: 6rem;
	}
	@media (min-width: 72em) {
		padding: 8rem;
	}
}
.trek-detail__title {
	line-height: 1.2;
	font-size: 4.2rem;
	margin: 0 0 1.2rem;
	color: $green_light;
}
.trek-detail__dates {
	font-size: 1.8rem;
	font-style: italic;
	margin-bottom: 3rem;
}
.trek-detail__desc {
	margin-bottom: 8rem;
}

.trek-detail__controls {
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 2rem;
	z-index: 1;
	background-color: rgba(black, 0.5);
	@media (min-width: 48em) {
		justify-content: flex-start;
	}
	button {
		margin: 0 0.25rem;
		box-shadow: 0 8px 14px rgba(black, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 1.4rem;
		@media (min-width: 23.25em) {
			font-size: 1.6rem;
		}
		&.is-disabled {
			opacity: 0.5;
		}
	}
}
</style>
