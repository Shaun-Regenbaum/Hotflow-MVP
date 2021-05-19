<!-- The Structure of this page will work as such:
On Mount (meaning before any components are loaded), we will check if a user is logged in.Form -->

<script context="module" lang="ts">
	// Types:
	import type { Link } from '$lib/Docs/types';
	// Backend:
	import supabase from '$lib/db';
	
	

	/** This function does only one thing:
	 * 1) It gets the relevant information from the url to know what content you want.
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const brand = page.params.brand;
		const title = page.params.title;
		const { data } = await supabase.from('links').select().eq('brand', brand).eq('title', title);
		if (data[0]) {
			// If Successful
			return {
				props: {
					link: data[0]
				}
			};
		}
		// If Error
		return {
			status: 404,
			error: 'Could not find that website'
		};
	}
</script>

<script lang="ts">
	// Loaded Properties:
	export let link: Link = {
		brand: 'Anonymous Inc.',
		title: 'The Faraway Tree',
		ownerId: '',
		price: 0
	};
	// Client-Side Mounting
	import { checkOwnership } from '$lib/Endpoints/profile';
	import makePurchase from '$lib/Endpoints/purchase';
	import { onMount } from 'svelte';
	let permission = false;
	let userId = '';
	let newUser = false;

	onMount(() => {
		const user = supabase.auth.user();
		if (user){
			userId = user.id
			automaticPurchase(userId);
			permission = true;
		}else{
			newUser=true;
		}
	});

	async function automaticPurchase(userId){
		permission = await checkOwnership(link.id, userId);
			if (!permission) {
				makePurchase(userId, link.ownerId, link.id, link.price);
				permission = true; //This could be a problem as were are setting permission to true before the promise resolves and the purchase is made.
			}
	}

	// Svelte Stuff:
	// Components:
	import Menu2 from '$lib/Menu2.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';

	// Blurring based on permission:
	$: blur = permission
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
	<svelte:component this={Transaction} price={link.price}
	brand={link.brand}
	purchaserId={userId}
	linkId={link.id}
	sellerId={link.ownerId}/>
{:else if newUser}
	<Menu2 minimized={false}>
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
{:else}
<p>It seems an error has occured.</p>
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
