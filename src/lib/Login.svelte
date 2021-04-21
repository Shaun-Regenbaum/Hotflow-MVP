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
import { login } from '$lib/auth/login.js';

let email = 'a@a.com';
let password = 'a';
let message = "Nothing Happening Right Now"

async function submit(event) {
    console.log(email, password)
    const result = await login(email, password);
    console.log(result)
    if (result.status){ 
            message = "Succesfully Registered You";
            $session.user = result.body
            document.cookie = result.body['user-token']
            message = "Set Session Data";
    } else{message = result.body}
	}
</script>

<div id='login'>
    <h1>Hotflow</h1>
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