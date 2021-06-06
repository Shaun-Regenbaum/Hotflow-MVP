<!--  @component Refund

	A refund button that triggers a refund transaction to be recorded in the db, and to do balance changes.

	@example 
	<Refund purchaser_id={purchaser_id} link_id={link_id} seller_id={seller_id} amount={price} fontsize={1} } />

 -->
<script lang="ts">
	import makeRefund from '$lib/Endpoints/refund';

	export let purchaser_id: string;
	export let link_id: string;
	export let seller_id: string;
	export let amount: number;
	export let fontSize = 1;

	let message = '';

	async function refund() {
		message = await makeRefund(purchaser_id, seller_id, link_id, amount);
		console.log(message);
		window.location.href = '../'; //Where do we want to direct to?
	}
</script>

<div id="refund">
	<button on:click={refund} style="font-size: {fontSize}rem">Refund</button>
	<p>{message}</p>
</div>

<style>
	#refund {
		text-align: center;
	}
</style>
