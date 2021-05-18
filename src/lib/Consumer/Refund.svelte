<!-- @component
	PROPERTIES:

		1) purchaserId
		2) linkId
		3) sellerId
		4) amount
	DESCRIPTION:

    This component is designed to be the refund button. IT NEEDS WORK.
	
        1) What they know:
			a. ?
        2) What they don't know:
            a. ?
        3) What they will want to know:
            a. ?
 -->
<script>
	import makeRefund from '$lib/Endpoints/refund';
	export let purchaserId = '';
	export let linkId = '';
	export let sellerId = '';
	export let amount = 0;
	let message = '';

	async function refund() {
		const response = await makeRefund(purchaserId, sellerId, linkId, amount);
		console.log(response);
		window.location.href = '../';
	}
</script>

<div id="refund">
	<button on:click={refund}>Refund</button>
	<p>{message}</p>
</div>

<style>
	#refund {
		text-align: center;

		/*Padding: */

	}
	button{
		margin: 20px 0px 0px 7px;
		font-size: 20px;
		padding-top:10px;
	}
</style>
