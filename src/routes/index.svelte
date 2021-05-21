<script lang="ts">
	import supabase from '$lib/db';

	import { browser } from '$app/env';
	import Login from '$lib/Auth/Login.svelte';
	import Logout from '$lib/Auth/Logout.svelte';

	let user;
	/*eslint no-empty-pattern: 1*/
	if (browser) {
		user = supabase.auth.user();
	}

	// Checking to see if you are logged in:
</script>

<body>
	{#if user}
		<Logout />
	{:else}
		<Login />
	{/if}
	<h1>Active Development:</h1>
	<ul>
		<li>
			<a href="/Seller/testLink">Live Example</a>
		</li>
		<li>
			<a href="/testing/sandbox">Component Testing</a>
		</li>
		<li>
			<a href="/testing/endpoints">Endpoint Testing </a>
		</li>
		<li>
			<a href="/testing/components">Component Library (WIP)</a>
		</li>
		<li>
			<a href="/testing/create">Create a Link</a>
		</li>
		<li>
			<a href="/landing">Landing Page (WIP)</a>
		</li>
	</ul>
	<p>The components library is now being done with storybooks, will update later.</p>
</body>

<style>
	body {
		margin-bottom: 0;
		overflow: hidden;
	}
</style>
