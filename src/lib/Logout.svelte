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
	button {
		/* Removing all the default outlines: */
		border: 0;
		outline: 0;
		background: #e0e0e0;
		padding: 0.8rem 1.3rem 0.8em 1.3rem;
		margin-top: 0.5rem;
		color: rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe, -3px -3px 10px #ffffff;
		/* Animations: */
		transition: all 0.2s ease;
	}

	button:hover,
	button:active {
		box-shadow: 1px 1px 5px #9b9b9b, -1px -1px 5px #ffffff;
	}
</style>
