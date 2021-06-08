<!--  @component Refund
	A refund button that triggers a refund transaction to be recorded in the db, and to do balance changes.

	@example 
	<Refund purchaser_id={purchaser_id} link_id={link_id} seller_id={seller_id} amount={price} fontsize={1} } />

	@question: You probably don't want to make a button do all of this, rather trigger an event for a parent to do heavy lifting, but its here for now...
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
