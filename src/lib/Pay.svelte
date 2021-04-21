<script>
	import { createPayment } from '$lib/payments/createPayment';
	import { session } from '$app/stores';
	let token;
	let url;
	let amount;

	async function submitPayment(event) {
		const result = await createPayment(amount, url, token);
		if (result.status) {
			console.log(result);
		} else {
		}
	}
</script>

<div id="pay">
	<h1>Payment Form</h1>
    <h4>Your token: {document.cookie}</h4>
	<form on:submit|preventDefault={submitPayment}>
		<fieldset>
			<input type="text" required placeholder="token" bind:value={token} />
		</fieldset>
		<fieldset>
			<input type="text" required placeholder="url" bind:value={url} />
		</fieldset>
		<fieldset>
			<input type="number" required placeholder="Amount" bind:value={amount} />
		</fieldset>
		<button type="submit"> Create Payment </button>
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
