<script context="module">
	import { browser } from '$app/env';
	export async function load({ page }) {
		let user = {};

		if (browser) {
			user.objectId = localStorage.getItem('userID');
			user['user-token'] = localStorage.getItem('user-token');
			user.name = localStorage.getItem('name');
		}

		return {
		props: { user }
		}
	};
</script>

<script>
	import Menu from '$lib/Menu.svelte'
	import Login from '$lib/Login.svelte'
	import EmbedForm from '$lib/EmbedForm.svelte'
	import { session } from '$app/stores';


	export let user = {};

	// Checking to see if you are logged in:
	if (browser) {
		$session.user = user.name ? user : false;
	}
</script>


{#if user.name}
<EmbedForm/>
{:else}
<Menu>
	<Login/>
</Menu>
{/if}
