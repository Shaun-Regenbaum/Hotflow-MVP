<script context="module">
	import supabase from '$lib/db';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const brand = page.params.brand;
		const title = page.params.title;
		let { data, error } = await supabase
			.from('links')
			.select('link')
			.eq('brand', brand)
			.eq('title', title);

		if (data) {
			return {
				props: {
					link: data[0].link,
					price: data[0].price
				}
			};
		}
		return {
			message: error.message
		};
	}
</script>

<script lang="ts">
	export let price = 0;
	export let link = 'https://nocodeneeded.com/shaun';
	export let message = '';
	import { browser } from '$app/env';

	import Menu2 from '$lib/Menu2.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';

	let brand = 'Anonymous Inc.';
	let title = 'The Adventures of Narnia';




	let user;

	/*eslint no-empty-pattern: 1*/
	if (browser) {
		user = supabase.auth.user();
	}

	// Checking to see if you are logged in:
	let permission = user ? true : false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

{#if user}
	<Menu2>
		<section id="blurb">
			<Blurb {brand} />
		</section>
		<seciton id="details">
			<Details {price} {title} />
		</seciton>
		<section id="refund">
			<Refund/>
		</section>
	</Menu2>
{:else}
	<Menu2>
		<section id="blurb">
			<Blurb {brand} />
		</section>
		<seciton id="details">
			<Details {price} {title} />
		</seciton>
		<section id="explanation">
			<Lend/>
		</section>
		<section id="login">
			<Login login_message={'Purchase'} register_message={'Purchase'} existing={false} />
		</section>
	</Menu2>
{/if}
<iframe title="iframe" id="monetized" style={blur} src={link} frameBorder="none" />
<p>{message}</p>

<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
