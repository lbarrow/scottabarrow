<template lang="pug">
	.trek-detail
		.map
			#map
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
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
export default {
	name: 'trekDetail',
	data() {
		return {
			accessToken:
				'pk.eyJ1IjoibGJhcnJvdyIsImEiOiJjazV2eW5mNjcwMWJiM29uZWxxZWI3c2phIn0.lxPca-7PM7R9p0_mgbE8eg', // your access token. Needed if you using Mapbox maps
			mapStyle: 'mapbox://styles/lbarrow/cjr9tnaw01soq2tqu89o2238l', // your map style
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

				mapboxgl.accessToken = this.accessToken;
				var map = new mapboxgl.Map({
					container: 'map',
					style: this.mapStyle,
					center: [45, 45],
					zoom: 1
					// interactive: false
				});

				map.on('load', function() {
					// Add a source and layer displaying a point which will be animated in a circle.
					map.addSource('route', {
						type: 'geojson',
						data: {
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: coordinates
							}
						}
					});
					map.addLayer({
						id: 'route',
						type: 'line',
						source: 'route',
						layout: {
							'line-join': 'round',
							'line-cap': 'round'
						},
						paint: {
							'line-color': '#888',
							'line-width': 4
						}
					});
					coordinates.forEach(coord => {
						new mapboxgl.Marker().setLngLat(coord).addTo(map);
					});

					// Pass the first coordinates in the LineString to `lngLatBounds` &
					// wrap each coordinate pair in `extend` to include them in the bounds
					// result. A variation of this technique could be applied to zooming
					// to the bounds of multiple Points or Polygon geomteries - it just
					// requires wrapping all the coordinates with the extend method.
					let bounds = coordinates.reduce(function(bounds, coord) {
						return bounds.extend(coord);
					}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

					map.fitBounds(bounds, {
						padding: 40
					});
				});
			});
	}
};
</script>

<style lang="scss">
.map {
	position: relative;
	height: 50rem;
}
#map {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
}
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
