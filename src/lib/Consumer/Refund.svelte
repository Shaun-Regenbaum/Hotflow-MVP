<!-- @component
	PROPERTIES: NONE
	
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
	import supabase from '$lib/db'
	export let purchaserId = '';
	export let linkId = '';
	export let sellerId= '';
	export let price = 0;
	let message = '';

	async function refund(){
		const { data, error } = await supabase
			.from('purchases')
			.insert([
				{ purchaserId: purchaserId, linkId: linkId, amount: -1*price, sellerId: sellerId, refunded: true },
			])
		if (data){
			// Do Something
		}else {
			message = error.message;
		}
	 }
 </script>
<div id="refund">
	<button on:click={refund}><h3>Refund</h3></button>
	<p>{message}</p>
</div>

<style>
	#refund {
		text-align: center;

		/*Padding: */
		padding: 1rem;
	}
</style>
