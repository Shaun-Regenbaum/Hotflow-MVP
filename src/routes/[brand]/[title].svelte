<!-- The Structure of this page will work as such:
1) On Load, we will get info about the page/content the user is requesting. 
2) On Mount (meaning before any components are loaded), we will check if a user is logged in.
3) Then, we'll check if they have already purchased this content.
4) If not, we will automatically purchase it for them.
-->
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
		brand: 'Anonymous Brand Inc.',
		title: 'The Faraway Tree',
		owner_id: null,
		price: 0
	};

	// Client-Side Mounting
	import { checkOwnership, getProfile } from '$lib/Endpoints/profile';
	import { makePurchase } from '$lib/Endpoints/purchase';
	import { onMount } from 'svelte';
	let purchased = false;
	let userBalance = 40;
	let userName = 'Mr.Anonymous';
	let userId;

	// State Management:
	let showLogin= false;
	let newUser = false;
	let minimized = false;

	onMount(async function () {
		await supabase.rpc('increment_click', { link_id: link.link_id });
		const user = supabase.auth.user();
		if (user) {
			userId = user.id;
			// We are using .then here to improve load times allowing us to not wait for it to resolve.
			getProfile(user.id).then(function (result) {
				userBalance = result.balance;
				userName = result.name;
			});
			purchased = await checkOwnership(link.link_id, user.id);
			if (!purchased) {
				// This step is to not have to do a live reload to get an accurate balance.
				userBalance = userBalance - link.price;
				makePurchase(user.id, link.owner_id, link.link_id, link.price);
				purchased = true; //This could be a problem as were are setting purchased to true before the promise resolves and the purchase is made.
			}
		} else {
			newUser = true;
		}
	});

	// Components:
	import Menu from '$lib/Menu.svelte';
	import Menu_Nav from '$lib/Random_Components/Menu_Nav.svelte';
	// Consumer:
	import Refund from '$lib/Consumer/Refund.svelte';
	import Profile from '$lib/Consumer/Profile.svelte';
	import Balance_Card from '$lib/Consumer/Balance_Card.svelte';
	// Creator:
	import Blurb from '$lib/Creator/Blurb.svelte';
	// Auth:
	import Login from '$lib/Auth/Login.svelte';

	// Blurring based on purchased:
	$: blur = purchased
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';


	onMount(() => {
		minimized = false;
	});
</script>

{#if newUser}
<Menu minimized={false}>
	{#if showLogin}
	<Login/>
	{:else}
	<section style="margin: 20px 10px;">
		<Blurb brand_name={link.brand} />
	</section>
	<section>
		<Balance_Card purchased={purchased} price={link.price} balance={userBalance} on:purchase={() => (showLogin=true)}/>
	</section>
	{/if}
</Menu>
{:else if purchased}
	<Menu minimized={true}>
		<Menu_Nav />
		<Profile name={userName} />
		<Refund
			purchaser_id={userId}
			link_id={link.link_id}
			seller_id={link.owner_id}
			amount={link.price}
		/>
	</Menu>
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
