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
			shouldDrawWorld: false,
			coordinates: []
		};
	},
	methods: {
		showWorld() {
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
			// setup markers for each stop
			console.log('hi');
			let coordinates = [
				[-60, -60],
				[90, 90]
			];

			// find outer bounds of coordinates
			let bounds = coordinates.reduce(function(bounds, coord) {
				return bounds.extend(coord);
			}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
			map.fitBounds(bounds, {
				padding: 40
			});
		},
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
				padding: 40,
				animate: false
			});

			this.goToStop(coordinates[0]);
		},
		goToStop(coordinates) {
			map.flyTo({
				center: coordinates
			});

			// find related marker and highlight it it
			for (var i = mapboxMarkers.length - 1; i >= 0; i--) {
				const markerCoords = mapboxMarkers[i].getLngLat().toArray();
				if (markerCoords[0] == coordinates[0] && markerCoords[1] == coordinates[1]) {
					mapboxMarkers[i].setOffset([0, -24]);
				} else {
					mapboxMarkers[i].setOffset([0, -14]);
				}
			}
		}
	},
	mounted() {
		mapboxgl.accessToken = accessToken;
		map = new mapboxgl.Map({
			container: 'map',
			style: mapStyle,
			center: [45, 45],
			zoom: 1,
			interactive: false
		});

		const vm = this;
		map.on('load', function() {
			vm.mapLoaded = true;
			if (vm.shouldDrawTrek) {
				vm.drawTrek(vm.coordinates);
				vm.shouldDrawTrek = false;
			}
			if (vm.shouldDrawWorld) {
				vm.showWorld();
				vm.shouldDrawWorld = false;
			}
		});

		EventBus.$on('allTreksLoaded', () => {
			if (vm.mapLoaded) {
				vm.showWorld();
			} else {
				vm.shouldDrawWorld = true;
			}
		});

		EventBus.$on('trekLoaded', coordinates => {
			if (vm.mapLoaded) {
				vm.drawTrek(coordinates);
			} else {
				vm.coordinates = coordinates;
				vm.shouldDrawTrek = true;
			}
		});

		EventBus.$on('stopShown', coordinates => {
			vm.goToStop(coordinates);
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
