<script context="module" lang="ts">
	/* In this script we are getting two things before rendering the page:
	1) We are getting the user info, if they are logged in.
	2) We are getting the url info associated with the content they want
	*/
	import type { User } from '$lib/Docs/types';
	import { getFromTitle } from '$lib/urls/getURL';
	import { browser } from '$app/env';
	export async function load({ page }) {
		let url: string;
		let user: User;

		if (browser) {
			user.userId = localStorage.getItem('userID');
			user.userToken = localStorage.getItem('user-token');
			user.name = localStorage.getItem('name');
		}

		const result = await getFromTitle(page.params.contentid);
		console.log(result);
		if (result.status) {
			url = result.body.url;
		}
		return {
			props: { url, user }
		};
	}
</script>

<script lang="ts">
	import Menu from '$lib/Menu.svelte';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import Logout from '$lib/Logout.svelte';
	import Login from '$lib/Login.svelte';
	import Pay from '$lib/Pay.svelte';

	let componentsList: MenuComponent[] = [
		{ component: Login, name: 'Login' },
		{ component: Pay, name: 'Paypal' },
		{ component: Logout, name: 'Logout' }
	];

	let url:string;
	let user: User;

	// Checking to see if you are logged in:
	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

<!-- <Menu components={componentsList} /> -->

<iframe title="iframe" id="monetized" style={blur} src={url} frameBorder="0" />
