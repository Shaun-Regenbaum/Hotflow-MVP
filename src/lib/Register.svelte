<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		}
	}
</script>

<script>
    import { register } from '$lib/auth/register.js';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

    import Switch from "$lib/ToggleSwitch.svelte";


	let name = '';
	let email = '';
    let password = '';
    let userTypeBool = 'false';
    $: userType = userTypeBool ? "Creator" : "Consumer";

    let message = "Nothing Happening Right Now";


	async function submit(event) {
        message = "Trying to Register You";
		const result = await register(name, email, password, userType);
        console.log(result)
        if (result.status){ 
            message = "Succesfully Registered You";
            $session.user = result.body
            document.cookie = result.body
            message = "Set Session Data";
		} else{message = result.body}
	}
</script>
<div id="StatusMessage">{message}</div>
<div>
    <h1>Make Your Account</h1>
    <form on:submit|preventDefault={submit}>
        <fieldset>
            <input type="text" required placeholder="Your Name" bind:value={name}>
        </fieldset>
        <fieldset>
            <input type="email" required placeholder="Email" bind:value={email}>
        </fieldset>
        <fieldset >
            <input  type="password" required placeholder="Password" bind:value={password}>
        </fieldset>
        <fieldset >
            <Switch bind:checked={userTypeBool}></Switch>
            <h4>{userType}</h4>
        </fieldset>
        <button type=submit>
            Sign up
        </button>
    </form>


</div>