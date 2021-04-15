<script>
	import Login from "$lib/Login.svelte";
	import Register from "$lib/Register.svelte";
	import EmbedForm from "$lib/EmbedForm.svelte";
	import * as api from '$lib/api.js';
	import { session } from '$app/stores';
	let name = '';
	if ($session.user)
		name = $session.user.name;

	let existing = true;

</script>

<svelte:head>
	<title>Hello world!</title>
</svelte:head>

<main>

	{#if name}
	<h1>Hello {name}!</h1>
	<h2>You are logged in!</h2>
	<EmbedForm/>
	{:else}
		<button on:click={() => (existing = !existing)}><h4>Wrong Form?</h4></button>
		{#if existing}
		<Login/>
		{:else}
		<Register/>
		{/if}

	{/if}

</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
