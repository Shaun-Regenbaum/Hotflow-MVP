<script>
	import Balance from '$lib/Consumer/Balance.svelte';
	import Item from '$lib/Paypal/Item.svelte';
	import Checkout from '$lib/Paypal/Checkout.svelte';
</script>

<div class="paypal">
	<h1>Buy a plant!</h1>
	<Item />
	<Checkout />
</div>
<br />
<br />
<div class="testing">
	<Balance />
</div>
<br />

<style>
	.paypal {
		font-family: 'Roboto', sans-serif;
		width: 350px;
		margin: auto;
		padding: 20px;
		position: relative;
		background: #ffffff;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1 {
		font-size: 65px;
		font-weight: bold;
	}
</style>
