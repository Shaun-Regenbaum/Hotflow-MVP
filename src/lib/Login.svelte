<script>
	import { session } from '$app/stores';
	import { login } from '$lib/auth/login';
	import { register } from '$lib/auth/register';
	import { browser } from '$app/env';

	export let existing = true;
	let username = 'default';
	let email = 'default@default.com';
	let password = 'default';

	async function submit_login() {
		const response = await login(email, password);
		if (response.status) {
			$session.user = response.body;
			if (browser) {
				localStorage.setItem('name', response.body['name']);
				localStorage.setItem('userID', response.body['objectId']);
				localStorage.setItem('user-token', response.body['user-token']);
			}
		}
	}

	async function submit_registration() {
		const response = await register(username, email, password);
		if (response.status) {
			$session.user = response.body;
			if (browser) {
				localStorage.setItem('name', response.body['name']);
				localStorage.setItem('userID', response.body['objectId']);
				localStorage.setItem('user-token', response.body['user-token']);
			}
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
			<button type="submit"> Sign In </button>
			<button on:click={() => (existing = !existing)}>New User?</button>
		</form>
	{:else}
		<form on:submit|preventDefault={submit_registration}>
			<fieldset>
				<input type="text" required placeholder="Your Name" bind:value={username} />
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
		text-align: center;
		border-radius: 10px;
		z-index: 2;
	}
</style>
