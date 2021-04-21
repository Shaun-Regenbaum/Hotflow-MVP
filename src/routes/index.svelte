<script>
	import Login from "$lib/Login.svelte";
	import EmbedForm from "$lib/EmbedForm.svelte";
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>Hello world!</title>
</svelte:head>

<main>
	{#if $session.user}
		<h1>Hello {$session.user.name}!</h1>
		<h2>You are logged in!</h2>
	<EmbedForm/>
	{:else}
		<Login/>
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
