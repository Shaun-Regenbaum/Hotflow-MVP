<!-- @component
	PROPERTIES:

		1) login-message -> message to show in login-button
		2) register-message -> message to show in login-button
		3) exsiting -> show login or register prompt first?
	DESCRIPTION:

    This component is designed to show up for whenever a user needs to login or register:

        1) What they know:
            a. The basics of what login/registration is.
        2) What they don't know:
            a. What is behind the login/registration (TODO as contextually dependant)
            b. What will be done with the information provided.
        3) What they will want to know:
            a. What information can they use to login/register?
            b. Forgot Password/Account?
 -->
<script>
	import supabase from '$lib/db';
	import { fade } from 'svelte/transition';

	export let login_message = 'Log In';
	export let register_message = 'Sign Up';
	export let existing = false;

	let name = '';
	let email = '';
	let password = '';
	let message = '';

	// The login action:
	async function submit_login() {
		console.log("logging in"
		)
		let { user, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});
		console.log(user, error);

		if (user) {
			console.log("succc in"
		)
			// location.reload();
		} else {
			message = error.message;
		}
	}

	// The register action:
	async function submit_registration() {
		let { user, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		console.log(user, error);


		// Once a user has registered, we then create a row for them in the profiles database, where we hold other data relevant to them:
		if (user) {
			const { data, error } = await supabase
				.from('profiles')
				.insert([{ id: user.id, name: name, balance: 40 }]);
			if (data) {
				// location.reload();
			} else {
				// Right now supabase does not support it, but we want to delete, if we cannot create profile.
				message = error.message;
				// const { data, error } = await supabase
				// 	.from('users')
				// 	.delete()
				// 	.match({ id: user.id })
			}
		} else {
			message = error.message;
		}
	}
</script>

<div id="login">
	{#if existing}
		<form on:submit|preventDefault={submit_login}>
				<label for="email">Email:</label>
				<input type="email" name="email" required placeholder="Email" bind:value={email} />
				<label for="password">Password:</label>
				<input
					type="password"
					name="password"
					required
					placeholder="Password"
					bind:value={password}
				/>

			<button type="submit" in:fade={{ delay: 50, duration: 500 }}>{login_message}</button>
		</form>
		<button
		on:click={() => (existing = !existing)}
		in:fade={{ delay: 50, duration: 500 }}>New User?</button
	>
	{:else}
	<form on:submit|preventDefault={submit_registration}>
	<label for="name">Full Name:</label>
				<input type="text" name="name" required placeholder="Anonymous" bind:value={name} />
				<label for="email">Email:</label>
				<input type="email" name="email" required placeholder="Email" bind:value={email} />
				<label for="password">Password:</label>
				<input
					type="password"
					name="password"
					required
					placeholder="Password"
					bind:value={password}
				/>
			<button type="submit" in:fade={{ delay: 50, duration: 500 }}>{register_message}</button>
	
		</form>
		<button
		on:click|preventDefault={() => (existing = !existing)}
		in:fade={{ delay: 50, duration: 500 }}>Existing?</button
	>
	{/if}
	<p>{message}</p>
</div>

<style>
	#login {
		/* Neuromorphism: */
		border-radius: 25px;
		overflow: overlay;
	}

	button{
		justify-self: center;
	}

</style>
