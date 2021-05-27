<script lang="ts">
	import supabase from '$lib/db';
	import Menu from '$lib/Menu.svelte';
	import CheckNew from '$lib/Account/CheckNew.svelte';
	import Login from '$lib/Auth/Login.svelte';
	import Logout from '$lib/Auth/Logout.svelte';
	import { onMount } from 'svelte';

	let user;

	onMount(async function () {
		user = supabase.auth.user();
	});
</script>

{#if !user}
	<Menu>
		<Login login_message={'Login'} register_message={'Sign up'} existing={true} />
	</Menu>
{:else}
	<Menu>
		<CheckNew />
		<Logout />
	</Menu>
{/if}
