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
import { post } from '$lib/utils.js';
import ListErrors from '$lib/ListErrors.svelte';
let email = '';
let password = '';
let errors = null;

async function submit(event) {
    const response = await post(`auth/login`, { email, password });
    console.log(response)
    // TODO handle network errors
    errors = response.errors;
    if (response.user) {
        $session.user = response.user;
        goto('/');
    }
	}
</script>

<div class="auth-page">
    <h1 class="text-xs-center">Sign In</h1>
    <p class="text-xs-center">
        <a href="/register">Need an account?</a>
    </p>


    <form on:submit|preventDefault={submit}>
        <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
        </fieldset>
        <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
        </fieldset>
        <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
            Sign in
        </button>
    </form>
</div>