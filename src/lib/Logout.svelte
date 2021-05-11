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

		/* Adding some padding around button text: */
		padding: 0.5rem 1rem 0.5rem 1rem;

		/* Keeping Next door buttons seperate: */
		margin: 0.7rem 0.5rem;

		/* Button Nueromorphism */
		color: var(--primary-color);
		border-radius: 10px;
		background: var(--bg);
		box-shadow:  5px 5px 7px var(--neuro-dark), 
					 -5px -5px 7px var(--neuro-light),
					inset -2px -2px 5px var(--neuro-dark), 
					inset 2px 2px 5px var(--neuro-light);	
	
		/* Animations: */
		transition: all 0.2s ease;
	}

	/* Unsure whether we want to use this: */
	/* .button_container{
		padding-right: 0.1rem;
		padding-bottom: 0.2rem;

		display: inline-block;
		border-radius: 10px;
		box-shadow: inset 1px 1px 3px var(--neuro-dark), 
					 inset -1px -1px 3px var(--neuro-light),
					 -2px -2px 3px var(--neuro-dark), 
					 2px 2px 3px var(--neuro-light);
	} */

	button:hover {
		box-shadow: 2px 2px 5px var(--neuro-dark), 
						-2px -2px 5px var(--neuro-light),
						inset -2px -2px 5px var(--neuro-dark), 
						inset 2px 2px 5px var(--neuro-light);
	}
	button:active, button:focus	 {
		background: var(--neuro1-bg);
		box-shadow:   2px 2px 3px var(--neuro1-dark), 
						-2px -2px 3px var(--neuro1-light),
						inset -2px -2px 5px var(--neuro1-dark), 
						inset 2px 2px 5px var(--neuro1-light);
	}	
</style>
