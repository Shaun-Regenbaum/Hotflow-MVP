<script context="module">
	import { getLink } from '$lib/urls/getURL.js';

	let url;
	export async function load({ page }) {
		const result = await getLink(page.params.contentid)
		if (result.status){ 
			console.log(result)
			url = result.body.url
    } else{message = result.body.data.message}
		
		return result
	}
</script>

<script>
	import { session } from '$app/stores';
	import Login from "$lib/Login.svelte";
	import Register from "$lib/Register.svelte";
	import Draggable from '$lib/Draggable.svelte';

	let existing = true;
</script>
{#if $session.user}
<iframe
	title="iframe"
	id="monetized"
	style="	width: 100%;
	height: 100vh;"
	src={url}
	/>  
	<Draggable>
		Refund
	</Draggable>

{:else}
	<button on:click={() => (existing = !existing)}><h4>Wrong Form?</h4></button>
	{#if existing}
	<Login/>
	{:else}
	<Register/>
	{/if}

{/if}
