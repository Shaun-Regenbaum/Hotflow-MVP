<script context="module">
	export async function load({ session, context }) {
		console.log(session, context);
		return session;
	}
</script>

<script>
	import { session } from '$app/stores';
	import { login } from '$lib/auth/login';
	import { register } from '$lib/auth/register';
	import { browser } from '$app/env';

	export let existing = true;
	let name = '';
	let email = 'a@a.com';
	let password = 'a';
	let message = 'Nothing Happening Right Now';

	async function submit_login(event) {
		const response = await login(email, password);
		if (response.status) {
			$session.user = response.body;
			if (browser) {
				localStorage.setItem('name', response.body['name']);
				localStorage.setItem('userID', response.body['objectId']);
				localStorage.setItem('user-token', response.body['user-token']);
			}
		} else {
			message = response.body;
		}
	}

	async function submit_registration(event) {
		const response = await register(name, email, password);
		if (response.status) {
			$session.user = response.body;
			if (browser) {
				localStorage.setItem('name', response.body['name']);
				localStorage.setItem('userID', response.body['objectId']);
				localStorage.setItem('user-token', response.body['user-token']);
			}
		} else {
			message = response.body;
		}
	}
</script>

<div id="login">
	<h1>Hotflow</h1>
	{#if existing}
		<form on:submit|preventDefault={submit_login}>
			<fieldset>
				<input type="email" required placeholder="Email" bind:value={email} />
			</fieldset>
			<fieldset>
				<input type="password" required placeholder="Password" bind:value={password} />
			</fieldset>
			<button type="submit"> Sign In </button>
			<button on:click={() => (existing = !existing)}>New User?</button>
		</form>
	{:else}
		<form on:submit|preventDefault={submit_registration}>
			<fieldset>
				<input type="text" required placeholder="Your Name" bind:value={name} />
			</fieldset>
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
		position: absolute;
		bottom: 0%;
		left: 20%;
		background: grey;
		text-align: center;
		border-radius: 10px;
		border: solid 5px black;
		z-index: 2;
	}
</style>
