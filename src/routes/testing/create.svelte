<script lang="ts">
	import supabase from '$lib/db';
	import Menu2 from '$lib/Menu2.svelte';
	import CheckNew from '$lib/Creator/CheckNew.svelte';
	import Login from '$lib/Auth/Login.svelte';
	import Logout from '$lib/Auth/Logout.svelte';
	import { onMount } from 'svelte';

	let user;

	onMount(async function () {
		user = supabase.auth.user();
	});
</script>

{#if !user}
	<Menu2>
		<Login login_message={'Login'} register_message={'Sign up'} existing={true} />
	</Menu2>
{:else}
	<Menu2>
		<CheckNew />
		<Logout />
	</Menu2>
{/if}
