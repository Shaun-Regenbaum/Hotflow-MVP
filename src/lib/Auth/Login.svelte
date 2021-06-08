<!-- @component Login
	This contains a form for just login. It emits logged_in event.
	
	@example
	<Login login_message={'Log In'}/>

	@todo
	I should probably add forgot password options here.
	I also need to totally redo the await thingies and how we handle errors.
 -->
<script lang="ts">
	import supabase from '$lib/db';
	import { createEventDispatcher } from 'svelte';

	export let login_message = 'Log In';
	const dispatch = createEventDispatcher();

	let email: string;
	let password: string;

	// For notifying the user of the status of their request;
	$: submitted = false;
	let promise: Promise<any>;

	// The login action:
	async function submit_login() {
		submitted = true;
		promise = supabase.auth.signIn({
			email: email,
			password: password
		});
		promise.then(function ({ user, error }) {
			if (user) {
				dispatch('logged_in');
			} else {
				console.log(error.message);
			}
		});
	}
</script>

<div id="container">
	<!-- The Login Form -->
	<form on:submit|preventDefault={submit_login}>
		<label for="email">Email:</label>
		<input
			type="email"
			name="email"
			required
			placeholder=""
			bind:value={email}
			autocomplete="username"
		/>
		<label for="password">Password:</label>
		<input
			type="password"
			name="password"
			required
			placeholder=""
			bind:value={password}
			autocomplete="current-password"
		/>
		<button type="submit">{login_message}</button>
	</form>
</div>
{#if submitted}
	{#await promise}
		<p>Trying to Log You In...</p>
	{:then { user, error }}
		<p>{user ? 'Logged In' : error.message}.</p>{/await}
{/if}

<style>
	#container {
		display: block;
		width: fit-content;
		margin: 10px auto;
	}
	button {
		display: block;
		margin: 10px auto;
		font-size: 1.4rem;
	}
	p {
		text-align: center;
		color: rgb(255, 138, 117);
	}
</style>
