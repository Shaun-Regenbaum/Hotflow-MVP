<!-- @component Links
	The container for all the different links a given creator owns, takes in an array of link_ids

	@example 
	<Histroy owned={owned_links} />
 -->
<script>
	import AnalyticsItem from '$lib/Creator/AnalyticsItem.svelte';
	export let owned;
</script>

<h3>Content History:</h3>
<div id="container">
	{#if owned}
		{#each owned as link_id}
			<div id="link_container">
				<AnalyticsItem minimized={true} {link_id} />
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
		text-align: center;
		max-height: 25vh;
		overflow-y: scroll;
	}
	#link_container {
		margin-bottom: 10px;
	}
	h3{
		text-align: center;
	}
</style>
