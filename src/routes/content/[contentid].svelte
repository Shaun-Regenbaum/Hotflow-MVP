<script context="module">
	import { getURLfromName } from '$lib/urls/getURL.js';

	let url;
	export async function load({ page, session, context }) {
		const result = await getURLfromName(page.params.contentid);
		if (result.status) {
			url = result.body[0].url;
		} else {
		}

		return result;
	}
</script>

<script>
	import Logout from '$lib/Buttons/Logout.svelte';
	import Login from '$lib/Login.svelte';
	import Pay from '$lib/Pay.svelte';

	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';

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

{#if $session.user}
	<Logout pos={'absolute'} />
{:else}
	<Login />
{/if}
<Pay />
<iframe title="iframe" id="monetized" style={blur} src={url} frameBorder="0" />
