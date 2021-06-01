<!-- @component
	PROPERTIES:

    1) purchases 

    2) purchaser_id

 -->
<script>
	import LinkAnalytics from '$lib/Creator/LinkAnalytics.svelte';
	export let owned;
</script>

<div id="container">
	<h3>Purchase History:</h3>
	{#if owned}
		{#each owned as link_id}
			<div id="purchase_container">
				<LinkAnalytics minimized={true} linkId={link_id} />
			</div>
		{/each}
	{:else}
		<p>No Owned Links.</p>
	{/if}
</div>

<style>
	#container {
		width: fit-content;
		margin: 0 auto;
		border: 3px soldi black;
		text-align: center;
	}
	#purchase_container {
		margin-bottom: 10px;
	}
</style>
