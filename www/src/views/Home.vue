<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<h2>treks</h2>
		<ul>
			<li v-for="trek in treks" :key="trek._id">
				{{ trek.title }}
			</li>
		</ul>
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	name: 'home',
	components: {
		HelloWorld
	},
	data() {
		return {
			treks: []
		};
	},
	mounted() {
		fetch('http://localhost:7777/api/treks')
			.then(response => {
				return response.json();
			})
			.then(result => {
				this.treks = result.treks;
			});
	}
};
</script>
