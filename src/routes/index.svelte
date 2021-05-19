<script lang="ts">
	import { browser } from '$app/env';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import Menu from '$lib/Menu.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
	import New from '$lib/Creator/New.svelte';
	import Recharge from '$lib/Consumer/Recharge.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import supabase from '$lib/db';

	let user;
	/*eslint no-empty-pattern: 1*/
	if (browser) {
		user = supabase.auth.user();
	}

	// Checking to see if you are logged in:
</script>

<body>
	{#if user}
		<Logout/>
	{:else}
		<Login/>
	{/if}
	<h1>Active Development:</h1>
	<ul>
		<li>
			<a href="/4/my%20story">Live Example</a>
		</li>
		<li>
			<a href="/testing/sandbox">Component Testing Environment</a>
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
		scrollbar-width: 0;
	}
</style>
