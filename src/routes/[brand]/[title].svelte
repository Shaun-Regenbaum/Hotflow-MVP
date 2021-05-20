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
		brand: 'Anonymous Inc.',
		title: 'The Faraway Tree',
		ownerId: '',
		price: 0
	};
	// Client-Side Mounting
	import { checkOwnership, getBalance, getName } from '$lib/Endpoints/profile';
	import { makePurchase } from '$lib/Endpoints/purchase';
	import { onMount } from 'svelte';
	let permission = false;
	let userId = '';
	let userBalance = 0;
	let userName = 'Mr.Anonymous';
	let newUser = false;
	let minimized = false;
	let message = '';

	onMount(() => {
		minimized = false;
		const user = supabase.auth.user();
		if (user) {
			userId = user.id;
			// We are using .then here to improve load times allowing us to not wait for it to resolve.
			getBalance(userId).then((result) => (userBalance = result));
			getName(userId).then((result) => (userName = result));
			automaticPurchase(userId);
			permission = true;
		} else {
			newUser = true;
		}
	});
	async function automaticPurchase(userId) {
		permission = await checkOwnership(link.id, userId);
		if (!permission) {
			// This step is to not have to do a live reload to get an accurate balance.
			userBalance = userBalance - link.price;
			makePurchase(userId, link.ownerId, link.id, link.price);
			permission = true; //This could be a problem as were are setting permission to true before the promise resolves and the purchase is made.
		}
	}

	// Components:
	import Menu2 from '$lib/Menu2.svelte';
	// Consumer:
	import Refund from '$lib/Consumer/Refund.svelte';
	import Profile from '$lib/Consumer/Profile.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';
	import Notice from '$lib/New_Consumer/Notice.svelte';
	// Creator:
	import Details from '$lib/New_Consumer/Details.svelte';
	// Auth:
	import Login from '$lib/Auth/Login.svelte';

	// Blurring based on permission:
	$: blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

{#if permission}
	<Menu2 minimized={true}>
		<section id="blurb">
			<Profile name={userName} balance={userBalance} />
		</section>
		<section id="details">
			<Details price={link.price} brand={link.brand} />
		</section>
		<section id="refund">
			<Refund purchaserId={userId} linkId={link.id} sellerId={link.ownerId} amount={link.price} />
		</section>
	</Menu2>
	<Transaction
		{minimized}
		price={link.price}
		brand={link.brand}
		purchaserId={userId}
		linkId={link.id}
		sellerId={link.ownerId}
	/>
{:else if newUser}
	<Menu2 minimized={false}>
		<section id="payment_required">
			<Notice />
		</section>
		<section id="details">
			<Details price={link.price} brand={link.brand} />
		</section>
		<section id="explanation">
			<Lend />
		</section>
		<section id="login">
			<Login login_message={'Purchase'} register_message={'Purchase'} existing={false} />
		</section>
	</Menu2>
{/if}\

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
