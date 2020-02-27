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
	box-shadow: 0 20px 28px rgba(black, 0.14);
	padding: 2rem 3rem;
	position: relative;
	z-index: 1;
	// @media (min-width: 48em) {
	// 	display: grid;
	// 	padding: 2rem 3rem;
	// 	grid-template-columns: 1fr 1fr;
	// }
	h1 {
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 2rem;
		display: flex;
		justify-content: center;
		@media (min-width: 48em) {
			font-size: 3rem;
		}
		a {
			color: $text;
			display: block;
			font-weight: 100;
			text-align: center;
			padding: 1rem;
			text-decoration: none;
			transition: all 0.3s ease;
			@media (min-width: 48em) {
				padding: 1rem 2rem;
			}
			&:hover {
				background-color: rgba($green, 0.3);
				border-radius: 0.8rem;
			}
		}
	}
	ul {
		// display: flex;
		display: none;
		justify-content: flex-end;
		li {
			display: flex;
		}
		a {
			display: flex;
			align-items: center;
			padding: 1rem;
			text-decoration: none;
		}
	}
}
</style>
