<script context="module" lang="ts">
	// Types:
	import type { Link } from '$lib/Docs/types';
	// Backend:
	import supabase from '$lib/db';
	import { checkOwnership } from '$lib/Endpoints/profile';
	import makePurchase from '$lib/Endpoints/purchase';
	// Client Side:
	import { browser } from '$app/env';

	
	

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
				userId = supabase.auth.user().id;
				if (userId){
					permission = await checkOwnership(link.id, userId);
				if (!permission) {
					const data = await makePurchase(userId, link.ownerId, link.id, link.price);
					if (data) {
						permission = true;
					} else {
						// If error in validating purchase:
						return {
							status: 402,
							error: 'Payment was not found'
						};
					}
				}
				}
			}
			// If Successful
			return {
				props: {
					link: data[0],
					permission: permission,
					userId: userId
				}
			};
		}
		// If Page cannot be found
		return {
			status: 404,
			error: 'Could not find that website'
		};
	}
</script>

<script lang="ts">
	// Svelte Stuff:
	// Components:
	import Menu2 from '$lib/Menu2.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';

	// Properties: 
	export let permission = false;
	export let userId = '';
	export let link: Link = {
		brand: 'Anonymous Inc.',
		title: 'The Faraway Tree',
		ownerId: '',
		price: 0
	};

	// Blurring based on permission:
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';

	// Making transacton hide after any action:

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
	<svelte:component this={Transaction} price={link.price}
	brand={link.brand}
	purchaserId={userId}
	linkId={link.id}
	sellerId={link.ownerId}/>
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
</style>
