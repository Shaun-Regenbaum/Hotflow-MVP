<!-- @component Purchase
	The container for all the different purchases a given user has made, takes in a list of link+ids

	@example 
	<Histroy purchases={purchase_history} />
 -->
<script>
	import Purchase from '$lib/Consumer/HistoryItem.svelte';
	export let purchases;
</script>

<h3>Purchase History:</h3>
<div id="container">
	{#each purchases.reverse() as link_id}
		<div id="purchase_container">
			<Purchase {link_id} />
		</div>
	{:else}
		<p>No Purchase History (recent purchases can take a minute to load...)</p>
	{/each}
</div>
<p>Scroll for More</p>

<style>
	#container {
		width: fit-content;
		margin: 0 auto;
		text-align: center;
		max-height: 25vh;
		overflow-y: scroll;
		padding-bottom: 5px;
		border-bottom: 2px dashed black;
	}
	#purchase_container {
		margin-bottom: 10px;
	}

	h3 {
		text-align: center;
	}

	p {
		color: grey;
		text-align: center;
		padding: 0px 10px 0px 0px;
		margin-top: 5px;
		font-size: 0.7rem;
	}
</style>
