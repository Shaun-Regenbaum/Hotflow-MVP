<!-- @component
	PROPERTIES:

		1) login-message -> message to show in login-button
		2) register-message -> message to show in register-button
		3) exsiting -> show login or register form first?
	TODO:
		I should probably add forgot password options here.
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

	// For notifying the user of the status of their request;
	$: submitted = false;
	let error_message = '';
	let promise;
	let register_promise;

	// The login action (be careful with brackets, they're important.):
	async function submit_login() {
		submitted = true;
		promise = supabase.auth.signIn({
			email: email,
			password: password
		});
		promise.then(function ({ user, error }) {
			if (user) {
				// Instead of reloading I should be emitting an event
				location.reload();
			} else {
				error_message = error.message;
				submitted = false;
			}
		});
	}
	// The register action:
	async function submit_registration() {
		submitted = true;
		promise = supabase.auth.signUp({
			email: email,
			password: password
		});
		promise.then(function ({ user, error }) {
			if (user) {
				register_promise = supabase
					.from('profiles')
					.insert([{ user_id: user.id, name: name, balance: 40 }]);
				// Instead of reloading I should be emitting an event
				location.reload();
			} else {
				error_message = error.message;
				submitted = false;
			}
		});
	}
</script>

<div id="container">
	{#if !submitted}
		{#if existing}
			<!-- The Login Form -->
			<form on:submit|preventDefault={submit_login}>
				<label for="email">Email:</label>
				<input
					type="email"
					name="email"
					required
					placeholder="Email"
					bind:value={email}
					autocomplete="username"
				/>
				<label for="password">Password:</label>
				<input
					type="password"
					name="password"
					required
					placeholder="Password"
					bind:value={password}
					autocomplete="current-password"
				/>
				<button type="submit" in:fade={{ delay: 50, duration: 500 }}>{login_message}</button>
			</form>
		{:else}
			<!-- The Registration Form -->
			<form on:submit|preventDefault={submit_registration}>
				<label for="name">Full Name:</label>
				<input
					type="text"
					name="name"
					required
					placeholder="Anonymous"
					bind:value={name}
					autocomplete="name"
				/>
				<label for="email">Email:</label>
				<input
					type="email"
					name="email"
					required
					placeholder="Email"
					bind:value={email}
					autocomplete="username"
				/>
				<label for="password">Password:</label>
				<input
					type="password"
					name="password"
					required
					placeholder="Password"
					bind:value={password}
					autocomplete="new-password"
				/>
				<button type="submit" in:fade={{ delay: 50, duration: 500 }}>{register_message}</button>
			</form>
		{/if}
		<!-- The button to switch forms: -->
		<button on:click={() => (existing = !existing)} in:fade={{ delay: 50, duration: 500 }}
			>New User?</button
		>
		<p>{error_message}</p>
	{:else}
		<!-- Information about status of Request:-->
		{#await promise}
			<p>{existing ? 'Logging You In' : 'Signing You Up'}</p>
		{:then { user, error }}
			<p>{user ? 'Done!' : error.message}</p>
			{#await register_promise}
				<p>Creating Your Profile</p>
			{:then { user, error }}
				<p>{user ? 'Done!' : error.message}</p>
			{/await}
		{/await}
	{/if}
</div>
