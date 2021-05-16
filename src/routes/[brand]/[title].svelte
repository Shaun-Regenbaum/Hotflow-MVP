<script context="module">
	import supabase from '$lib/db';
	export async function load({ page }) {
		const brand = page.params.brand;
		const title = page.params.title;
		let { data, error } = await supabase
			.from('links')
			.select('link')
			.eq('brand', brand)
			.eq('title', title);

		if (data) {
			return {
				props: {
					link: data[0].link
				}
			};
		}
		return {
			message: error.message
		};
	}
</script>

<script lang="ts">
	export let link = 'https://nocodeneeded.com/shaun';
	export let message = '';
	import { browser } from '$app/env';
	import type { MenuComponent } from '$lib/Menu.svelte';
	import Menu from '$lib/Menu.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
	import New from '$lib/Creator/New.svelte';
	import Home from '$lib/Consumer/Home.svelte';
	import Recharge from '$lib/Consumer/Recharge.svelte';
	import Refund from '$lib/Consumer/Refund.svelte';

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

{#if user}
<Menu components={component_list2} starting_component={component_list2[2]} />
{:else}
<Menu components={component_list1} />
{/if}
<iframe title="iframe" id="monetized" style={blur} src={link} frameBorder="none" />
<p>{message}</p>

<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
