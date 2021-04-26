<script>
	import Checkout from '$lib/Checkout.svelte'
	import { createPurchase } from '$lib/payments/createPurchase';
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	let user = {};
	let site = null;
	if (browser) {
		user.objectId = localStorage.getItem('userID');
		user['user-token'] = localStorage.getItem('user-token');
		user.name = localStorage.getItem('name');
		site = location.href;
		if (user.name !== null) {
			$session.user = user;
		} else {
			$session.user = false;
		}
	}
	let token = user['user-token'];
	const name = String(site).substring(String(site).lastIndexOf('/') + 1);
	let amount = 6;

	export let purchased = false;
	async function submitPurchase() {
		const result = await createPurchase(amount, name, token);
		if (result.status) {
			purchased = true;
			console.log(result);
		} else {
		}
	}
</script>
<div id="pay">
	<Checkout/>
	<h1>Purchase Form</h1>
	<form on:submit|preventDefault={submitPurchase}>
		<fieldset>
			<input type="text" required placeholder="token" bind:value={token} />
		</fieldset>
		<fieldset>
			<input type="text" required placeholder="url" bind:value={site} />
		</fieldset>
		<fieldset>
			<input type="number" required placeholder="Amount" bind:value={amount} />
		</fieldset>
		<button type="submit"> Create Purchase </button>
	</form>
</div>

<style>
	#pay {
		position: absolute;
		bottom: 0%;
		left: 60%;
		background: grey;
		text-align: center;
		border-radius: 10px;
		border: solid 5px black;
		z-index: 2;
	}
</style>
