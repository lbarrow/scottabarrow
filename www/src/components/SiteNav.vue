<template lang="pug">
	nav.site-nav
		h1
			router-link(to="/") Scott&rsquo;s Travels
		ul
			li: router-link(to="/treks") Treks
			li: router-link(to="/about") About
			li: router-link(to="/contact") Contact
</template>

<script>
export default {
	name: 'SiteNav'
};
</script>

<style lang="scss">
.site-nav {
	background-color: white;
	display: grid;
	padding: 2rem 3rem;
	grid-template-columns: 1fr 1fr;
	h1 {
		text-transform: uppercase;
		letter-spacing: 0.2em;
		a {
			color: $text;
			font-weight: 100;
		}
	}
	a {
		display: flex;
		padding: 1rem;
		text-decoration: none;
	}
	ul {
		display: flex;
		justify-content: flex-end;

		li {
			display: flex;
		}
		a {
			align-items: center;
		}
	}
}
</style>
