<script lang="ts">
	import supabase from '$lib/db';
	import type { User } from '@supabase/supabase-js';
	let user;
	let message = '';

	import { browser } from '$app/env';

	if (browser) {
		user = supabase.auth.user();
	}

	import Menu2 from '$lib/Menu2.svelte';
	import New from '$lib/Creator/New.svelte';
	import Login from '$lib/Login.svelte';
	import Logout from '$lib/Logout.svelte';
</script>

{#if user}
	<Menu2>
		<section id="form">
			<New />
		</section>
		<section id="logout">
			<Logout />
		</section>
	</Menu2>
{:else}
	<Menu2>
		<section id="login">
			<Login login_message={'Login'} register_message={'Sign up'} existing={true} />
		</section>
	</Menu2>
{/if}
