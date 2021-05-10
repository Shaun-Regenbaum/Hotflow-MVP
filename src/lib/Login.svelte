<script>
	import { browser } from '$app/env';
	// For Front End Dev:
	const user=true;


	export let existing = true;
	let email = '';
	let password = '';
	let message = "Nothing";

	async function submit_login() {
		// let { user, session, error } = await supabase.auth.signIn({
		// 	email: email,
		// 	password: password
		// });
		if (user) {
			if (browser) {
				localStorage.setItem('token', 'true');
			}
		} else {
			// message = error;
		}
	}

	async function submit_registration() {
		const user=true;
		// let { user, session, error } = await supabase.auth.signUp({
		// 	email: email,
		// 	password: password
		// });
		if (user) {
			if (browser) {
				localStorage.setItem('token', 'true');
			}
		} else {
			// message = error;
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
			<button type="submit"> Login </button>
			<button on:click={() => (existing = !existing)}>New User?</button>
		</form>
	{:else}
		<form on:submit|preventDefault={submit_registration}>
			<fieldset>
				<input type="email" required placeholder="Email" bind:value={email} />
			</fieldset>
			<fieldset>
				<input type="password" required placeholder="Password" bind:value={password} />
			</fieldset>
			<button type="submit"> Sign Up </button>
			<button on:click={() => (existing = !existing)}>Existing User?</button>
		</form>
	{/if}
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
		/* Making the input fields nueromorphic: */
		background: rgba(255, 255, 255, 0.383);
		padding: 0.5rem 1rem 0.5rem 1rem;
		color: rgba(65, 65, 65, 0.719);
		margin-bottom: 0.4rem;
		border-radius: 25px;
		box-shadow: inset 3px 3px 10px #64606052, inset -3px -3px 10px #fff7f7;
	}

	button {
		/* Removing all the default outlines: */
		border: 0;
		outline: 0;
		background: #e0e0e0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		margin-top: 0.5rem;
		color: rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe, -3px -3px 10px #ffffff;
	}
</style>
