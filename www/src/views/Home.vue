<template lang="pug">
	.home
		.treks
			h2 Treks
			ul
				li(v-for="trek in treks" :key="trek._id")
					trek-link(:trek="trek")

		.subscribe-form
			h2.subscribe-form__title Keep up with Scott&rsquo;s Travels
			// Begin Mailchimp Signup Form
			#mc_embed_signup
				form(
					action="https://scottabarrow.us20.list-manage.com/subscribe/post?u=f4b588caa96136d607ea138fc&amp;id=2dfceea7a5"
					method="post"
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					class="validate"
					target="_blank"
					novalidate)
					#mc_embed_signup_scroll
						.mc-field-group
							label(for="mce-EMAIL") Email Address
							input#mce-EMAIL.required.email(
								placeholder="you@somewhere.com"
								type="email"
								value=""
								name="EMAIL")
						#mce-responses.clear
							.response#mce-error-response(style="display:none")
							.response#mce-success-response(style="display:none")
						// real people should not fill this in and expect good things - do not remove this or risk form bot signups
						div(style="position: absolute; left: -5000px;" aria-hidden="true")
							input(
								type="text"
								name="b_f4b588caa96136d607ea138fc_2dfceea7a5"
								tabindex="-1"
								value="")
						.subscribe-form__submit.clear
							input#mc-embedded-subscribe.button(type="submit"
								value="Subscribe"
								name="subscribe")
</template>

<script>
import TrekLink from '@/components/TrekLink.vue';

export default {
	name: 'home',
	components: {
		TrekLink
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

<style lang="scss">
.home {
	padding: 4rem;
	display: grid;
	grid-gap: 4rem;
	grid-template-columns: 1fr 30rem;
}
.treks {
	background-color: $green;
	padding: 4rem;
}
.subscribe-form__title {
	font-size: 2.4rem;
	font-weight: 200;
	margin: 0 0 2.5rem;
	line-height: 1.15;
}
.subscribe-form {
	padding: 4rem;
	label {
		display: block;
		font-size: 1.2rem;
		letter-spacing: 0.2rem;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}
	[type='email'] {
		color: white;
	}
	.button {
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.2em;
	}
}
.subscribe-form__submit {
	padding-top: 1.25rem;
}
</style>
