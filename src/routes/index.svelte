<script context="module" lang="ts">
	import type { User } from '$lib/Docs/types';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import { browser } from '$app/env';

	export async function load({}) {
		let user: User = { token: false };

		if (browser) {
			user.token = localStorage.getItem('token');
		}

		return {
			props: { user }
		};
	}
</script>

<script lang="ts">
	import Menu from '$lib/Menu.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
	import New from '$lib/Creator/NewCreator.svelte';
	import Refund from '$lib/Refund.svelte';
	import EmbedForm from '$lib/EmbedForm.svelte';
	import { session } from '$app/stores';

	/*eslint no-empty-pattern: 1*/
	export let user: User = { token: false }; // I think this has to be export to make it a property of the component

	if (browser) {
		$session.user = user.token ? user.token : false;
	}

	let component_list1: MenuComponent[] = [{ component: Login, name: 'Login' }];
	let component_list2: MenuComponent[] = [
		{ component: Logout, name: 'Logout' },
		{ component: EmbedForm, name: 'Form' },
		{ component: New, name: 'Creator' },
		{ component: Refund, name: 'Refund'}
	];

	// Checking to see if you are logged in:
	let permission = user.name ? true : false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

<body>
	{#if user.token}
		<Menu components={component_list2} starting_component={component_list2[2]} />
	{:else}
		<Menu components={component_list1} />
	{/if}
	<iframe
		title="iframe"
		id="monetized"
		style={blur}
		src="https://nocodeneeded.com/shaun"
		frameBorder="none"
	/>
</body>

<style>
	body {
		margin-bottom: 0;
		overflow: hidden;
		scrollbar-width: 0;
	}
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
