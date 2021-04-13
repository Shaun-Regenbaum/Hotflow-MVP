<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
import { session } from '$app/stores';
import { goto } from '$app/navigation';
import { post } from '$lib/auth/login.js';
import ListErrors from '$lib/ListErrors.svelte';
let email = 'a@a.com';
let password = 'a';
let errors = null;

async function submit(event) {
    console.log(email, password)
    const response = await post({ email, password });
    errors = response.errors;
    console.log(response)
    if (response.body) {
        console.log(response.body)
        $session.user = response.body;
        goto('/');
    }
	}
</script>

<div>
    <h1>Sign In</h1>
    <form on:submit|preventDefault={submit}>
        <fieldset>
            <input  type="email" required placeholder="Email" bind:value={email}>
        </fieldset>
        <fieldset>
            <input type="password" required placeholder="Password" bind:value={password}>
        </fieldset>
        <button type="submit">
            Sign in
        </button>
    </form>
</div>