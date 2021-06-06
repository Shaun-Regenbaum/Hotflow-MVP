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
	import makeRefund from '$lib/Endpoints/refund';
	import { onMount } from 'svelte';
	let purchased = false;
	let userBalance = 40;
	let userName = 'Mr.Anonymous';
	let user;
	let userId;
	let userPurchases;

	// State Management:
	let showRegistration= false;
	let showLogIn = false;
	let showHistory = false;
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
				userPurchases = result.purchased_links;
			});
			tryPurchase();
		} else {
			newUser = true;
		}
	});

	async function tryPurchase(){
		const user = supabase.auth.user();
		purchased = await checkOwnership(link.link_id, user.id);
		if (!purchased) {
				// This step is to not have to do a live reload to get an accurate balance.
				userBalance = userBalance - link.price;
				makePurchase(user.id, link.owner_id, link.link_id, link.price);
				purchased = true; //This could be a problem as were are setting purchased to true before the promise resolves and the purchase is made.
			}
	}
	async function refund() {
		userBalance = userBalance + link.price;
		const user = supabase.auth.user();
		await makeRefund(user.id, link.owner_id, link.link_id, link.price);
		purchased = false;
		console.log(purchased);
	}

	// Components:
	import Menu from '$lib/Menu.svelte';
	import Menu_Nav from '$lib/Random_Components/Menu_Nav.svelte';
	// Consumer:
	import Profile from '$lib/Consumer/Profile.svelte';
	import Balance_Card from '$lib/Consumer/Balance_Card.svelte';
	import History from '$lib/Account/History.svelte'
	// Creator:
	import Blurb from '$lib/Creator/Blurb.svelte';
	// Auth:
	import Login2 from '$lib/Auth/Login2.svelte';
	import Register from '$lib/Auth/Register.svelte';
import MenuNav from '$lib/Random_Components/Menu_Nav.svelte';

	// Blurring based on purchased:
	$: blur = purchased
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';


	onMount(() => {
		minimized = false;
	});

	function handle_auth(){
		newUser = false;
		tryPurchase();
	}
</script>

{#key purchased}
{#if purchased}
<Menu minimized={true}>
	<MenuNav minimized={minimized}/>
	{#if showHistory}
	<History purchases={userPurchases}/>
	{:else}
	<section style="margin: 20px 10px;">
		<p style="text-align:center">You Purchased this content. <button on:click={()=> (showHistory=true)} id="history"><u>History.</u></button></p>
	</section>
	<section>
		<Balance_Card purchased={purchased} price={link.price} balance={userBalance} on:purchase={tryPurchase} on:refund={refund}/>
	</section>
	{/if}
</Menu>

{:else if newUser}
<Menu minimized={false}>
	{#if showRegistration}
	<section>
		{#if showLogIn}
		<h3 style="font-size: 1.3rem; text-align:center;">Log In to see the content of <b>{link.brand}</b>:</h3>
		<Login2 on:logged_in={handle_auth}/>
		{:else}
		<h3 style="font-size: 1.3rem; text-align:center;">Register and support <b>{link.brand}</b>:</h3>
		<Register on:registered={handle_auth}/>
		{/if}
		<button id="switch_forms" on:click={() => (showLogIn=!showLogIn)}>{showLogIn ? "Dont have an acount?" : "Already have an Account?"}</button>
	</section>
	{:else}
	<section style="margin: 20px 10px;">
		<Blurb brand_name={link.brand} />
	</section>
	<section>
		<Balance_Card purchased={purchased} price={link.price} balance={userBalance} on:purchase={() => (showRegistration=true)}/>
	</section>
	{/if}
</Menu>
{:else}
	<Menu minimized={true}>
		<section style="margin: 20px 10px;">
			<Blurb brand_name={link.brand} />
		</section>
		<section>
			<Balance_Card purchased={purchased} price={link.price} balance={userBalance} on:purchase={tryPurchase} on:refund={refund} />
		</section>
	</Menu>

{/if}
{/key}

<iframe title="iframe" id="monetized" style={blur} src={link.url} frameBorder="none" />

<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	#switch_forms{
		font-size: 0.7rem; 
		border-bottom: 2px solid black; 
		display: block;
		margin: 0 auto;
	}
	#history, #history:hover{
		border: none;
		padding: 0px;
		box-shadow: none;
		color: rgb(189, 189, 189);
		font-size: 1rem;
	}

	#history:hover{
		color: blue;
	}
</style>
