<template lang="pug">
	.trek
		router-link(:to="'/treks/' + trek._id")
			h2.trek__title {{ trek.title }}
			.trek__dates {{ trekDates }}
			.trek__description {{ trek.description }}
</template>

<script>
import dayjs from 'dayjs';

export default {
	name: 'TrekLink',
	props: {
		trek: Object
	},
	computed: {
		trekDates() {
			return (
				dayjs(this.trek.startDate).format('MMMM D, YYYY') +
				' - ' +
				dayjs(this.trek.endDate).format('MMMM D, YYYY')
			);
		}
	}
};
</script>

<style lang="scss">
.trek {
	border-top: 1px solid white;
	a {
		color: white;
	}
}
</style>
