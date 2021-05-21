<!-- This file is for testing our api calls in a safe environment: -->
<script lang="ts">
	import type { Profile, Link } from '$lib/Docs/types';
	import supabase from '$lib/db';
	import { makePurchase } from '$lib/Endpoints/purchase';
	import { getBalance } from '$lib/Endpoints/profile';

	let message = 'no error';
	let purchaser: Profile = {
		id: '86008959-df49-4c46-a0b5-126719138752',
		balance: 0
	};
	let seller: Profile = {
		id: 'b4c6e7c2-df15-40d8-8323-e78c5b382579',
		brand: 'Seller',
		balance: 0
	};

	let link: Link = {
		brand: 'Seller',
		title: 'testLink'
	};

	async function simulateTransaction() {
		seller.balance = await getBalance(seller.id);
		purchaser.balance = await getBalance(purchaser.id);
		const { data, error } = await supabase
			.from('links')
			.select()
			.eq('brand', link.brand)
			.eq('title', link.title);
		if (data) {
			link.price = data[0].price;
			link.id = data[0].id;
			console.log(link.price, link.id);
			const { data2, error } = await makePurchase(purchaser.id, seller.id, link.id, link.price);
			seller.balance = await getBalance(seller.id);
			purchaser.balance = await getBalance(purchaser.id);
		} else {
			message = error.message;
		}
	}
</script>

<div id="container">
	<div class="testing">
		<h1>Create Transaction:</h1>
		<label for="brand">linkBrand:</label>
		<input type="text" name="brand" bind:value={link.brand} />
		<br />
		<label for="title">linkTitle:</label>
		<input type="text" name="title" bind:value={link.title} />
		<br />
		<label for="purchaser">purchaserId:</label>
		<input type="text" name="purchaser" bind:value={purchaser.id} />
		<br />
		<label for="seller">sellerId:</label>
		<input type="text" name="seller" bind:value={seller.id} />

		<button on:click={simulateTransaction}>Test The Call</button>

		<p>Purchaser Balance: {purchaser.balance}</p>
		<p>Seller Balance: {seller.balance}</p>
		<p>Error: {message}</p>
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-wrap: wrap;
	}

	p {
		padding: 3px;
		box-shadow: var(--divot);
		border-radius: 10px;
	}
</style>
