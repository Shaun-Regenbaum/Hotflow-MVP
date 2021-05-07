<script>
	import { logout } from '$lib/auth/logout';
	import { browser } from '$app/env';
	import { session } from '$app/stores';
import { time_ranges_to_array } from 'svelte/internal';

	export let pos = 'inherit';

	async function submitLogout() {
		let token;
		if (browser) {
			console.log('cleared')
			token = localStorage.getItem('user-token');
			localStorage.clear();
		}
		await logout(token);
		$session = false;
	}
</script>
<div id="logout">
	<button on:click={submitLogout} style="position: {pos}; z-index: 2;"><h3>Logout</h3></button>
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
  		outline:0;
		background: #e0e0e0;
		padding: 0.8rem 1.3rem 0.8em 1.3rem;
		margin-top: 0.5rem;
		color:rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe,
             -3px -3px 10px #ffffff;
	}
</style>
	