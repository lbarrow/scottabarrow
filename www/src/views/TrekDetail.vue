<template lang="pug">
	.trek-detail
		.treks
			h2.trek__title {{ trek.title }}
			.trek__dates {{ trekDates }}
			.trek__desc
				p {{ trek.description }}
			.trek__stops 
				h3 Stops
				ul
					li(v-for="stop in stops" :key="stop._id")
						.stop 
							.stop__title {{ stop.title }}
							.stop__title {{ stop.location.coordinates }}
							ul.entry-list
								li.entry(v-for="entry in stop.entries" :key="entry._id")
									h5.entry__title {{ entry.title }}
									ul.photo-list
										li(v-for="photo in entry.photos" :key="photo._id")
											.photo
												.photo__img
													img(:src="'http://localhost:7777/uploads/' + photo.filePath")
												.photo__caption {{ photo.caption }}
</template>

<script>
import dayjs from 'dayjs';
import { EventBus } from '@/eventBus.js';
export default {
	name: 'trekDetail',
	data() {
		return {
			trek: {},
			stops: []
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
	mounted() {
		fetch(`http://localhost:7777/api/treks/${this.$route.params.id}`)
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
.trek__title {
	font-size: 4.2rem;
}
.trek__dates {
	font-size: 1.8rem;
	font-style: italic;
	margin-bottom: 1rem;
}
.trek__desc {
	margin-bottom: 5rem;
}
.trek__stops {
	h3 {
		font-size: 1.2rem;
		letter-spacing: 0.2rem;
		text-transform: uppercase;
	}
}
.stop {
	margin-bottom: 4rem;
}
.entry-list {
	margin-bottom: 2rem;
}
.entry {
	margin-bottom: 3rem;
}
.stop__title {
	font-size: 2.6rem;
	margin: 0 0 1rem;
}
.entry__title {
	font-size: 2.1rem;
	margin: 0 0 1rem;
}
.photo-list {
	display: flex;
}
.photo {
	max-width: 20rem;
}
.photo__img {
}
.photo__caption {
	padding: 1rem;
}
</style>
