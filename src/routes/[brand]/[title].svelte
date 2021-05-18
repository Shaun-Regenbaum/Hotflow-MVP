<script context="module" lang="ts">
	import supabase from '$lib/db';
	import { browser } from '$app/env';
	import type { Link } from '$lib/Docs/types';
	import type { User } from '@supabase/supabase-js';

	import { checkOwnership } from '$lib/Endpoints/profile';
	import makePurchase from '$lib/Endpoints/purchase';

	/** This function does four things:
	 * 1) It get the relevant information from the url to know what content you want.
	 * 2) It checks to see if you are logged in
	 * 3) It checks to see if you have already purchased the revelent content
	 * 3) If not, it makes the purchase and handles all the balance changes on the server.
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		let permission = false;
		let userId = '';
		const brand = page.params.brand;
		const title = page.params.title;
		const { data } = await supabase.from('links').select().eq('brand', brand).eq('title', title);
		if (data[0]) {
			const link: Link = data[0];
			if (browser) {
				const user: User = supabase.auth.user();
				if (user){
					userId = user.id;
					permission = await checkOwnership(link.id, user.id);
				if (!permission) {
					const data = await makePurchase(user.id, link.ownerId, link.id, link.price);
					if (data) {
						permission = true;
					} else {
						return {
							status: 402,
							error: 'Payment was not found'
						};
					}
				}
				}
			}
			return {
				props: {
					link: data[0],
					permission: permission,
					userId: userId
				}
			};
		}
		return {
			status: 404,
			error: 'Could not find that website'
		};
	}
</script>

<script lang="ts">
	import Menu2 from '$lib/Menu2.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';

	export let permission = false;
	export let userId = '';
	export let link: Link = {
		brand: 'Anonymous Inc.',
		title: 'The Faraway Tree',
		ownerId: '',
		price: 0
	};
	export let message = '';

	// Checking to see if you have permission:
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

{#if permission}
	<Menu2 minimized={true}>
		<section id="blurb">
			<Blurb brand={link.brand} />
		</section>
		<section id="details">
			<Details price={link.price} title={link.title} />
		</section>
		<section id="refund">
			<Refund purchaserId={userId} linkId={link.id} sellerId={link.ownerId} amount={link.price} />
		</section>
	</Menu2>
	<div id="transaction">
		<Transaction
			price={link.price}
			brand={link.brand}
			purchaserId={userId}
			linkId={link.id}
			sellerId={link.ownerId}
		/>
	</div>
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
<iframe title="iframe" id="monetized" style={blur} src={link.url} frameBorder="none" />
<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	#transaction {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 100000;
	}
</style>
