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
		owner_id: null,
		price: 0
	};
	// Client-Side Mounting
	import { checkOwnership, getProfile } from '$lib/Endpoints/profile';
	import { makePurchase } from '$lib/Endpoints/purchase';
	import { onMount } from 'svelte';
	let permission = false;
	let userBalance = 0;
	let userName = 'Mr.Anonymous';
	let userId;
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
			permission = await checkOwnership(link.link_id, user.id);
			if (!permission) {
				// This step is to not have to do a live reload to get an accurate balance.
				userBalance = userBalance - link.price;
				makePurchase(user.id, link.owner_id, link.link_id, link.price);
				permission = true; //This could be a problem as were are setting permission to true before the promise resolves and the purchase is made.
			}
		} else {
			newUser = true;
		}
	});
	// Components:
	import Menu from '$lib/Menu.svelte';
	import Menu_Nav from '$lib/Random_Components/Menu_Nav.svelte'
	// Consumer:
	import Refund from '$lib/Consumer/Refund.svelte';
	import Profile from '$lib/Consumer/Profile.svelte';
	import Notice from '$lib/New_Consumer/Notice.svelte';
	// Creator:
	import Details from '$lib/Link/Details.svelte';
	// Auth:
	import Login from '$lib/Auth/Login.svelte';

	// Blurring based on permission:
	$: blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';

export let minimized2 = false;


onMount(() => {
	minimized = false;
	setTimeout(() => (minimized2 = true), 7000);
});
</script>

{#if !minimized2}
	<div id=details on:click="{() => minimized2 = true}"> 
	<Details price={link.price} brand={link.brand} clicks={link.clicks} refunds={link.refunds} />
	</div>
{/if}


{#if permission}
	<Menu minimized={true}>
			<Menu_Nav/>
			<Profile name={userName} />
			<Refund
				purchaserId={userId}
				linkId={link.link_id}
				sellerId={link.owner_id}
				amount={link.price}
			/>
	</Menu>
{:else if newUser}
	<Menu minimized={false}>
			<Notice />
		<div id="login">
			<Login login_message={'Purchase'} register_message={'Purchase'} existing={false} />
		</div>
	</Menu>
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

	#login{
		width: fit-content;
		margin: 0 auto;	}
	#details{
		position: absolute;
		bottom: 0;
		left:0;
		z-index: 500;
		background-color: white;
		width:100%;
	}
</style>
