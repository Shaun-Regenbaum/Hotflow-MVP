<script>
	import { session } from '$app/stores';
	import { login } from '$lib/auth/login.js';
	import { register } from '$lib/auth/register.js';

	export let existing = true;
	let name = '';
	let email = 'a@a.com';
	let password = 'a';
	let message = 'Nothing Happening Right Now';

	async function submit_login(event) {
		console.log(email, password);
		const result = await login(email, password);
		if (result.status) {
			$session.user = result.body;
			document.cookie = result.body['user-token'];
		} else {
			message = result.body;
		}
	}

	async function submit_registration(event) {
		const result = await register(name, email, password);
		if (result.status) {
			$session.user = result.body;
			document.cookie = result.body['user-token'];
		} else {
			message = result.body;
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
