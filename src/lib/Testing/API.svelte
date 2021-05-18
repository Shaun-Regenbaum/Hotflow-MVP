<!-- This file is for testing our api calls in a safe environment: -->
<script lang="ts">
	import type { Profile, Purchase, Link } from '$lib/Docs/types';
	import supabase from '$lib/db';
	let user: Profile = {
		id: '84b33de6-b45d-4a3d-ad5f-6345750f8888',
		brand: 'default inc.'
	};
	let purchase: Purchase = {
		purchaserId: user.id,
		sellerId: user.id,
		// Need To Populate This:
		linkId: '94a3f02a-f825-4116-8edb-98c8e93d805b',
		amount: 10,
		refunded: false
	};

	let link: Link = {
		brand: user.brand,
		url: 'https://www.nocodeneeded.com/shaun',
		ownerId: user.id,
		price: 5,
		title: 'Super Cool Website'
	};

	let message = '';
	let newBalance = '';

	/** This function is to add to or subtract to a given userid's balance:*/
	async function updateBalance() {
		const { data: profile, error } = await supabase
			.from('profiles')
			.select('balance')
			.eq('id', user.id);

		if (profile) {
			const { data, error } = await supabase
				.from('profiles')
				.update({ balance: user.balance + purchase.amount })
				.eq('id', user.id);
			if (data) {
				console.log(data);
				newBalance = data[0].balance;
				message = 'Success';
			} else {
				message = error.message;
			}
		} else {
			message = error.message;
		}
	}

	async function createLink() {
		const { data, error } = await supabase.from('links').insert(link);
		if (data) {
			console.log(data);
			message = 'Success';
		} else {
			message = error.message;
		}
	}

	/** This function is to create a transaction db entry:*/
	async function createTransaction() {
		const { data, error } = await supabase.from('purchases').upsert(purchase);
		if (data) {
			console.log(data);
			message = 'Success';
		} else {
			message = error.message;
		}
	}
</script>

<div id="container">
	<div class="testing">
		<h1>Create Transaction:</h1>
		<p>linkId:</p>
		<input type="text" bind:value={purchase.linkId} />
		<p>purchaserId:</p>
		<input type="text" bind:value={purchase.purchaserId} />
		<p>sellerId:</p>
		<input type="text" bind:value={purchase.sellerId} />
		<p>Amount:</p>
		<input type="number" bind:value={purchase.amount} />

		<button on:click={createTransaction}>Test The Call</button>

		<p>{message}</p>
		<p>{newBalance}</p>
	</div>
	<div class="testing">
		<h1>Update Balance:</h1>
		<p>UserId:</p>
		<input type="text" bind:value={user.id} />
		<p>Amount:</p>
		<input type="number" bind:value={user.balance} />

		<button on:click={updateBalance}>Test The Call</button>

		<p>{message}</p>
		<p>{newBalance}</p>
	</div>
	<div class="testing">
		<h1>Create Link:</h1>
		<p>Url:</p>
		<input type="url" bind:value={link.url} />
		<p>Title:</p>
		<input type="number" bind:value={link.title} />
		<p>Brand:</p>
		<input type="string" bind:value={link.brand} />
		<p>OwnerId:</p>
		<input type="string" bind:value={link.ownerId} />
		<p>Price:</p>
		<input type="number" bind:value={link.price} />

		<button on:click={createLink}>Test The Call</button>

		<p>{message}</p>
		<p>{newBalance}</p>
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
