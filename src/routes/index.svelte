<script>
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Buttons/Logout.svelte';
	import EmbedForm from '$lib/EmbedForm.svelte';

	// Checking to see if you are logged in, should prob be simplified:
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	let user = {};
	if (browser) {
		user.objectId = localStorage.getItem('userID');
		user['user-token'] = localStorage.getItem('user-token');
		user.name = localStorage.getItem('name');
		if (user.name !== null) {
			$session.user = user;
		} else {
			$session.user = false;
		}
	}
</script>

<svelte:head>
	<title>Hello world!</title>
</svelte:head>

<main>
	{#if $session.user}
		<Logout />
		<h1>Hello {$session.user.name}!</h1>
		<h2>You are logged in!</h2>
		<EmbedForm />
	{:else}
		<Login />
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

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}
	}
</style>
