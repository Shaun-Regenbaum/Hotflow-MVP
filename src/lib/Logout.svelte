<script>
	import supabase from '$lib/db';
	import { browser } from '$app/env';

	export let pos = 'inherit';
	let message = '';

	async function submitLogout() {
		if (browser) {
			console.log('cleared');
			localStorage.clear();
			window.location.replace('/');
		}

		let { error } = await supabase.auth.signOut();
		message = error.message;
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
