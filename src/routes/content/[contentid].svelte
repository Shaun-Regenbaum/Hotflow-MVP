<script context="module">
	import { getLink } from '$lib/db/getlink.js';
	console.log("hello")

	let url;
	export async function load({ page }) {
		console.log(page.params.contentid)
		const result = await getLink(page.params.contentid)
		console.log(result)
		if (result.status){ 
			url = result.body.data.url
    } else{message = result.body.data.message}
		
		return result
	}
</script>

<script>
	import { session } from '$app/stores';
	import Login from "$lib/Login.svelte";
	import Register from "$lib/Register.svelte";
		let existing = false;
</script>
{#if $session.user}
<iframe
	title="iframe"
	id="monetized"
	style="	width: 100%;
	height:100vh;"
	src={url}
	/>
	{:else}
		<button on:click={() => (existing = !existing)}><h4>Wrong Form?</h4></button>
		{#if existing}
		<Login/>
		{:else}
		<Register/>
		{/if}

	{/if}
