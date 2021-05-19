<!-- @component
	DESCRIPTION:

    This component is for logging out, it should be very basic.
 -->
<script>
	import supabase from '$lib/db';
	import { browser } from '$app/env';

	export let pos = 'inherit';
	let message = '';

	async function submitLogout() {
		let { error } = await supabase.auth.signOut();
		if (error) {
			message = error.message;
		} else {
			if (browser) {
				location.reload();
			}
		}
	}
</script>

<div id="logout">
	<button on:click={submitLogout} style="position: {pos}; z-index: 2;">Logout</button>
	<p>{message}</p>
</div>

<style>
	#logout {
		text-align: center;
	}

	button {
		margin: 20px 0px 0px 7px;
		font-size: 20px;
		padding-top: 10px;
	}
</style>
