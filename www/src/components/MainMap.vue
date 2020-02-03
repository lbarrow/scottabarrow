<template lang="pug">
	#map
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { EventBus } from '@/eventBus.js';

const accessToken =
	'pk.eyJ1IjoibGJhcnJvdyIsImEiOiJjazV2eW5mNjcwMWJiM29uZWxxZWI3c2phIn0.lxPca-7PM7R9p0_mgbE8eg';
const mapStyle = 'mapbox://styles/lbarrow/cjr9tnaw01soq2tqu89o2238l';
let map = undefined;
let mapboxMarkers = [];

export default {
	name: 'MainMap',
	data() {
		return {
			mapLoaded: false,
			shouldDrawTrek: false,
			coordinates: []
		};
	},
	methods: {
		drawTrek(coordinates) {
			// clear map layer & source.
			var mapLayer = map.getLayer('route');
			if (typeof mapLayer !== 'undefined') {
				map.removeLayer('route').removeSource('route');
			}
			// clear markers
			if (mapboxMarkers.length > 0) {
				for (var i = mapboxMarkers.length - 1; i >= 0; i--) {
					mapboxMarkers[i].remove();
				}
				mapboxMarkers = [];
			}
			// create line linking stops
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

			// setup markers for each stop
			coordinates.forEach(coord => {
				let marker = new mapboxgl.Marker().setLngLat(coord).addTo(map);
				mapboxMarkers.push(marker);
			});

			// find outer bounds of coordinates
			let bounds = coordinates.reduce(function(bounds, coord) {
				return bounds.extend(coord);
			}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

			map.fitBounds(bounds, {
				padding: 40
			});
		}
	},
	mounted() {
		mapboxgl.accessToken = accessToken;
		map = new mapboxgl.Map({
			container: 'map',
			style: mapStyle,
			center: [45, 45],
			zoom: 1
			// interactive: false
		});

		const vm = this;
		map.on('load', function() {
			vm.mapLoaded = true;
			if (vm.shouldDrawTrek) {
				vm.drawTrek(vm.coordinates);
				vm.shouldDrawTrek = false;
			}
		});

		// Listen for the i-got-clicked event and its payload.
		EventBus.$on('trekLoaded', coordinates => {
			if (vm.mapLoaded) {
				vm.drawTrek(coordinates);
			} else {
				vm.coordinates = coordinates;
				vm.shouldDrawTrek = true;
			}
		});
	}
};
</script>

<style lang="scss">
#map {
	position: absolute;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
}
</style>
