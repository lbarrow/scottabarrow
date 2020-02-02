<template>
	<div class="site" id="app">
		<site-nav />
		<router-view />
	</div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue';

export default {
	name: 'App',
	components: {
		SiteNav
	}
};
</script>

<style lang="scss">
*,
*::before,
*::after {
	box-sizing: border-box;
}
body,
h1,
h2,
h3,
h4,
p,
ul,
ol,
li,
figure,
figcaption,
blockquote,
dl,
dd {
	margin: 0;
	padding: 0;
}
body {
	min-height: 100vh;
	scroll-behavior: smooth;
	text-rendering: optimizeSpeed;
	line-height: 1.5;
}
ul[class],
ol[class] {
	list-style: none;
}
a:not([class]) {
	text-decoration-skip-ink: auto;
}
img {
	max-width: 100%;
	display: block;
}
html {
	background-color: #222;
	color: white;
	font: 62.5%/1.5 $font_sans;
	font-weight: 400;
	font-variant-numeric: lining-nums;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	-webkit-font-feature-settings: 'lnum';
	font-feature-settings: 'lnum';
}
img {
	max-width: 100%;
}
a {
	font-weight: bold;
	color: $green;
}
ul,
ol {
	list-style: none;
}

[type='text'],
[type='email'] {
	padding: 1rem;
	font-size: 1.6rem;
	border: 1px solid $border_light;
}

::-webkit-input-placeholder {
	color: rgba($text, 0.6);
	font-style: italic;
}
::-moz-placeholder {
	color: rgba($text, 0.6);
	font-style: italic;
}
:-ms-input-placeholder {
	color: rgba($text, 0.6);
	font-style: italic;
}
:-moz-placeholder {
	color: rgba($text, 0.6);
	font-style: italic;
}

.button,
[type='submit'],
[type='button'],
button {
	border: 2px solid rgba(black, 0);
	box-shadow: 0 2px 6px rgba(black, 0.15);
	-webkit-font-smoothing: antialiased;
	border-radius: 0.375rem;
	background-color: $green;
	color: white;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	font-weight: bold;
	font-family: $font_sans;
	font-size: 1.6rem;
	padding: 0.375em 0.75em;
	position: relative;
	text-align: center;
	text-decoration: none;
	top: 0;
	transition: background-color, color, transform 0.2s ease;
	white-space: normal;
	&:hover {
		background-color: darken($green, 10);
		color: white;
		text-decoration: none;
	}
	&:active {
		transform: translateY(3px);
	}
	&:focus {
		border: 2px solid rgba(black, 0.6);
		outline: none;
	}
	&[disabled='disabled'] {
		opacity: 0.55;
	}
}

body {
	min-height: 100vh;
	scroll-behavior: smooth;
	text-rendering: optimizeSpeed;
	line-height: 1.5;
	font-size: 1.8rem;
	display: flex;
}
.site {
	display: grid;
	grid-template-rows: auto 1fr;
	width: 100%;
}
</style>
