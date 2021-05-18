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
		if (error){
			message = error.message;
		}else{
			if (browser) {
				location.reload();
			}

		}
	}
</script>

<div id="logout">
	<button on:click={submitLogout} style="position: {pos}; z-index: 2;"><h3>Logout</h3></button>
	<p>{message}</p>
</div>

<style>
	#logout {
		text-align: center;

		/*Padding: */
		padding: 1rem;
	}
</style>
