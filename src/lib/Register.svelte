<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		}
	}
</script>

<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/auth/register.js';
	import ListErrors from '$lib/ListErrors.svelte';
    import Switch from "$lib/ToggleSwitch.svelte";
	let name = '';
	let email = '';
    let userTypeBool = 'false';
    $: userType = userTypeBool ? "Creator" : "Consumer";

	let password = '';
	let errors = null;
	async function submit(event) {
		const response = await post({ name, email, password, userType });
		errors = response.errors;
		if (response.body) {
			$session.user = response.body;
			goto('/');
		}
	}
</script>

<svelte:head>
</svelte:head>

<div>
    <ListErrors {errors}/>
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
        <button>
            Sign up
        </button>
    </form>

</div>