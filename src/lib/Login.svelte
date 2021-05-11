<script>
	import { browser } from '$app/env';
	import supabase from '$lib/db';
	import { fade } from 'svelte/transition';

	export let existing = true;
	let email = '';
	let password = '';
	let message = '';

	async function submit_login() {
		let { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
		if (user) {
			if (browser) {
				localStorage.setItem('token', session.access_token);
				window.location.replace('/');
			}
		} else {
			message = error.message;
		}
	}

	async function submit_registration() {
		let { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		if (user) {
			if (browser) {
				localStorage.setItem('token', session.access_token);
				window.location.replace('/');
			}
		} else {
			message = error.message;
		}
	}
</script>

<div id="login">
	{#if existing}
		<form on:submit|preventDefault={submit_login}>
			<fieldset>
				<input type="email" required placeholder="Email" bind:value={email} />
			</fieldset>
			<fieldset>
				<input type="password" required placeholder="Password" bind:value={password} />
			</fieldset>
			<button type="submit" in:fade={{ delay: 50, duration: 500 }}> Login </button>
			<button on:click={() => (existing = !existing)} in:fade={{ delay: 50, duration: 500 }}
				>New User?</button
			>
		</form>
	{:else}
		<form on:submit|preventDefault={submit_registration}>
			<fieldset>
				<input type="email" required placeholder="Email" bind:value={email} />
			</fieldset>
			<fieldset>
				<input type="password" required placeholder="Password" bind:value={password} />
			</fieldset>
			<button type="submit" in:fade={{ delay: 50, duration: 500 }}> Sign Up </button>
			<button on:click={() => (existing = !existing)} in:fade={{ delay: 50, duration: 500 }}
				>Existing User?</button
			>
		</form>
	{/if}
	<p>{message}</p>
</div>

<style>
	#login {
		/* Keeping the Login Form Centered: */
		text-align: center;

		/*Padding: */
		padding: 1rem;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: inset 3px 3px 5px #eeeeee, inset -3px -3px 5px #bebebe;
	}

	fieldset {
		/* Removing the fieldset borders */
		border: 0;
	}

	input {
		/* Removing all the default outlines: */
		border: none;
		outline: none;
		/* Text: */
		color: rgba(65, 65, 65, 0.719);
		/* Making the input fields nueromorphic: */

		background: rgba(255, 255, 255, 0.383);
		padding: 0.5rem 1rem 0.5rem 1rem;
		margin-bottom: 0.4rem;
		border-radius: 25px;
		box-shadow: inset 3px 3px 10px #64606052, inset -3px -3px 10px #fff7f7;

		/* Animations: */
		transition: all 0.2s ease;
	}
	input:focus {
		box-shadow: inset 5px 5px 6px #64606052, inset -5px -5px 6px #fff7f7;
	}

	button {
		/* Removing all the default outlines: */
		border: 0;
		outline: 0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		margin-top: 0.5rem;
		margin-inline: 1rem;
		color: rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		background: #e0e0e0;
		box-shadow: 5px 5px 10px #9b9b9b, -5px -5px 10px #ffffff;

		/* Animations: */
		transition: all 0.2s ease;
	}

	button:hover,
	button:active {
		box-shadow: 1px 1px 5px #9b9b9b, -1px -1px 5px #ffffff;
	}
</style>
