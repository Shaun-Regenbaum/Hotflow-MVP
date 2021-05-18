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
			.select()
			.eq('brand', brand)
			.eq('title', title);

		if (data) {
			return {
				props: {
					link: data[0]
				}
			};
		}
		return {
			message: error.message
		};
	}
</script>

<script lang="ts">
	import type {Purchase, Profile, Link} from '$lib/Docs/types';
	import type { User } from '@supabase/supabase-js';
	
	export let price = 0;
	export let link:Link = {
		brand: 'Anonymous Inc.',
		title: 'The Faraway Tree',
		price: 0
	};
	export let message = '';

	import makePurchase from "$lib/Endpoints/purchase"
	import { browser } from '$app/env';

	if (browser) {
		const user:User = supabase.auth.user();
		let purchase:Purchase = {
			purchaserId: user.id,
			sellerId: link.ownerId,
			linkId:link.id,
			amount: link.price,
			refunded: false
		}
		const item = makePurchase(purchase);
	}

	import Menu2 from '$lib/Menu2.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';

	// Checking to see if you are logged in:
	let permission = user ? true : false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

{#if user}
	<Menu2>
		<section id="blurb">
			<Blurb brand={link.brand} />
		</section>
		<section id="details">
			<Details price={link.price} title={link.title} />
		</section>
		<section id="refund">
			<Refund />
		</section>
	</Menu2>
{:else}
	<Menu2>
		<section id="blurb">
			<Blurb brand={link.brand} />
		</section>
		<section id="details">
			<Details price={link.price} title={link.title} />
		</section>
		<section id="explanation">
			<Lend />
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
