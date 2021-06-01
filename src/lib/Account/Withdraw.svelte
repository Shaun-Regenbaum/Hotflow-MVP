<!-- @component Withdraw
    This component is used to make a withdrawal request that me and Avi will then see on a seperate admin screen.

 -->
 <script>
    import Paypal from '$lib/Payments/Paypal.svelte'

    let dollars=0;
	$: amount = dollars * 100;
	$: submitted = false;

	function submit_amount(){
		submitted=true;
	}

</script>

<div id="container">
	{#if submitted}
	<h1>Amount: ${Number(amount / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</h1>
	{:else}
	<form on:submit|preventDefault={submit_amount}>
		<label for="amount">Amount to Deposit:</label>
		<span class="currency_symbol">
			<input type="number" id="amount" name="amount" step="0.01" bind:value={dollars}/>
		</span>
		<div>
			<button type="submit">Choose Payment</button>
		</div>
	</form>	
	{/if}
	{#if submitted}
		<Paypal price={amount}/>
	{/if}
</div>

<style>
#container{
	width: 250px;
	margin:0 auto;
	text-align: center;
}
.currency_symbol {
    position: relative;
}
.currency_symbol input {
    padding-left:25px;
}
.currency_symbol:before {
    position: absolute;
    top: 0px;
    content:"$";
    left: 10px;
}
</style>