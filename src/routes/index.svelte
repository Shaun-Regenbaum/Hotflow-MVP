<script lang="ts">
	import { browser } from '$app/env';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import Menu from '$lib/Menu.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
	import New from '$lib/Creator/New.svelte';
	import Home from '$lib/Consumer/Home.svelte';
	import Recharge from '$lib/Consumer/Recharge.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';
	import supabase from '$lib/db';

	let user;
	/*eslint no-empty-pattern: 1*/
	if (browser) {
		user = supabase.auth.user();
	}

	let component_list1: MenuComponent[] = [{ component: Login, name: 'Login' }];
	let component_list2: MenuComponent[] = [
		{ component: Logout, name: 'Logout' },
		{ component: New, name: 'Creator' },
		{ component: Recharge, name: 'Recharge' },
		{ component: Home, name: 'Home' },
		{ component: Refund, name: 'Refund' }
	];

	// Checking to see if you are logged in:
	let permission = user ? true : false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>


<body>
	
	{#if user}
		<Menu components={component_list2} starting_component={component_list2[2]} />
	{:else}
		<Menu components={component_list1} />
	{/if}
	<h1>Active Development:</h1>
	<ul>
		<li>
			<a href="/testing/sandbox">Component Testing Environment</a>
		</li>
		<li>
			<a href="/components">Component Library</a>
		</li>
		<li>
			<a href="/testing/new">New User Flow (WIP)</a>
		</li>
		<li>
			<a href="/testing/existing">Existing User Flow (WIP)</a>
		</li>
		<li>
			<a href="/alpha/default">Live (WIP}</a>
		</li>
		<li>
			<a href="/landing">Landing Page (WIP)</a>
		</li>
		<li>
			<a href="/documentation">Open Questions and Documentation</a>
		</li>


	</ul>


</body>

<style>
	body {
		margin-bottom: 0;
		overflow: hidden;
		scrollbar-width: 0;
	}
</style>
