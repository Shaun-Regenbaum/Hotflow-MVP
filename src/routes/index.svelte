<script lang="ts">
	import supabase from '$lib/db';

	import { browser } from '$app/env';
	import Login from '$lib/Auth/Login.svelte';
	import Logout from '$lib/Auth/Logout.svelte';
import History from '$lib/Account/History.svelte';
import Create from './testing/create.svelte';

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
			<a href="/test_brand/newsletters">Sample Link</a>
		</li>
		<li>
			<a href="/account">Account</a>
		</li>
		<li>
			<a href="/testing/sandbox">Component Testing</a>
		</li>
		<li>
			<a href="/testing/endpoints">Endpoint Testing </a>
		</li>
	</ul>
	<p>
		Things are not optimized for mobile/desktop.
		To see functionality, just register a fake email or use a test account.
		The first link is a sample of what happens when you click on a link a given creator might create.
		If you navigate to account, you will see four links:
	</p>
	<ul>
		<li>
			History: This is not-functional (as we have made database changes)
		</li>
		<li>
			Analytics: This is not-functional (as we have made database changes)
		</li>
		<li>
			Create: This is the process for a creator to create their own paywalled link. All you need is a Url. This is also an older demo, so does not reflect the current status of the tech.
		</li>
		<li>
			Wallet: This is just a quick reference to being able to put money into the wallet and taking it out.
		</li>
	</ul>
</body>

<style>
	body {
		margin-bottom: 0;
		overflow: hidden;
	}
</style>
