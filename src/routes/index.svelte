<script context="module" lang="ts">
	import type { User } from '$lib/Docs/types';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import { browser } from '$app/env';

	export async function load({}) {
		let user:User = {};

		if (browser) {
			user.userId = localStorage.getItem('userID');
			user.userToken = localStorage.getItem('user-token');
			user.name = localStorage.getItem('name');
		}
		console.log(user)

		return {
			props: { user },
		};
	}
</script>

<script lang="ts">
	import Menu from '$lib/Menu.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
	import Pay from '$lib/Pay.svelte';
	import Checkout from '$lib/Checkout.svelte'
	import EmbedForm from '$lib/EmbedForm.svelte';
	import { session } from '$app/stores';

	export let user:User; // I think this has to be export to make it a property of the component

	if (browser) {
		$session.user = user.name ? user : false;
	}

	let component_list1: MenuComponent[] = [
		{ component: Login, name: 'Login' }
	];
	let component_list2: MenuComponent[] = [
		{ component: Pay, name: 'Pay'},
		{ component: Logout, name: 'Logout'},
		{ component: EmbedForm, name: 'Form'},
		{ component: Checkout, name: 'Form'}
	];


	// Checking to see if you are logged in:
	let permission = user.name ? true : false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>
<body>
	{#if user.name}
		<Menu components={component_list2} starting_component={component_list2[2]}/>
	{:else}
		<Menu components={component_list1} />
	{/if}
	<iframe title="iframe" id="monetized" style={blur} src="https://nocodeneeded.com/shaun" frameBorder="none" />
</body>

<style>
	body {
		margin-bottom: 0;
		overflow:hidden;
		scrollbar-width: 0;
	}
	#monetized{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
	}
</style>