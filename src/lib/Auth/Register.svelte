<!-- @component Login
	This contains a form for just login. It emits registered event.
	
	@example
	<Login login_message={'Log In'}/>

	@todo
	I should probably add forgot password options here.
	I also need to totally redo the await thingies and how we handle errors.
 -->
 <script lang="ts">
	import supabase from '$lib/db';
    import {createEventDispatcher} from 'svelte';


	export let register_message = 'Register';
    const dispatch = createEventDispatcher();

    let name: string;
	let email: string;
	let password: string;

	// For notifying the user of the status of their request;
	$: submitted = false;
	let promise: Promise<any>;

	// The register action:
	async function submit_registration() {
		submitted = true;
		promise = supabase.auth.signUp({
			email: email,
			password: password
		});
		promise.then(async function ({ user, error }) {
			if (user) {
				const { data:profiles, error } = await supabase
					.from('profiles')
					.insert([{ user_id: user.id, name: name, balance: 0.40 }]);
                if (profiles){
                    dispatch('registered')
                }
                else{
                    console.log("ERROR: SOMETHING WENT WRONG WITH CREATING PROFILE!");
                    console.log(error.message);
                }
			} else {
                console.log(error.message)
			}
		});
    }
</script>

<div id="container">
        <!-- The Login Form -->
        <form on:submit|preventDefault={submit_registration}>
            <label for="name">Full Name:</label>
            <input
                type="text"
                name="name"
                required
                placeholder=""
                bind:value={name}
                autocomplete="name"
            />
            <label for="email">Email:</label>
            <input
                type="email"
                name="email"
                required
                placeholder=""
                bind:value={email}
                autocomplete="email"
            />
            <label for="password">Password:</label>
            <input
                type="password"
                name="password"
                required
                placeholder=""
                bind:value={password}
                autocomplete="new-password"
            />
            <button type="submit">{register_message}</button>
        </form>
</div>
{#if submitted}
{#await promise}
<p>Trying to Register You...</p>
{:then { user, error }}
    <p>{user ? 'Registered' : error.message}.</p>
{/await}
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
    p{
        text-align: center;
        color: rgb(255, 138, 117);
    }
</style>
