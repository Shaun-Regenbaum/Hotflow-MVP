<script>
	import * as api from '$lib/api.js';
	import { session } from '$app/stores';
	let name = '';
	if ($session.user)
		name = $session.user.name;
</script>

<svelte:head>
	<title>Hello world!</title>
</svelte:head>

<main>

	{#if name}
	<h1>Hello {name}!</h1>
	{:else}
	<a href="/login">Login?</a>
	{/if}

</main>

<style>
	main {
		text-align: center;
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
