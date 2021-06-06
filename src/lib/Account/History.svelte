<!-- @component Purchase
	The container for all the different purchases a given user has made, takes in a list of link+ids

	@example 
	<Histroy purchases={purchase_history} />
 -->
<script>
	import Purchase from '$lib/Consumer/Purchase.svelte';
	export let purchases;
</script>

<h3>Purchase History:</h3>
<div id="container">
		{#each purchases as link_id}
			<div id="purchase_container">
				<Purchase {link_id}/>
			</div>
		{:else}
		<p>No Purchase History (recent purchases can take a minute to load...)</p>
		{/each}

</div>

<style>
	#container {
		width: fit-content;
		margin: 0 auto;
		border: 3px soldi black;
		text-align: center;
		max-height: 25vh;
		overflow-y: scroll;
	}
	#purchase_container {
		margin-bottom: 10px;
	}

	h3{
		text-align: center;
	}
</style>
