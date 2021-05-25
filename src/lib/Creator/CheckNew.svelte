<!-- @component
	PROPERTIES:

		1) NONE
	DESCRIPTION:

    This component is designed to be the refund button. IT NEEDS WORK.
	
        1) What they know:
			a. ?
        2) What they don't know:
            a. ?
        3) What they will want to know:
            a. ?
 -->
 <script>
	import supabase from '$lib/db';
	import Form from '$lib/Creator/Form.svelte';
    import New from '$lib/Creator/New.svelte';
	import { onMount } from 'svelte';

	$: mounted = false;
	let promise;
	let user;

	async function checkStatus() {
		user = supabase.auth.user();
		return supabase.from('profiles').select('brand').eq('user_id', user.id);
	}

	onMount(async function(){
		promise = checkStatus();
		mounted = true;
	});
</script>
{#if mounted}
	{#await promise}
		<p>Loading...</p>
	{:then value}
		{#if value['data'][0].brand}
           
			<Form brand={value['data'][0].brand}/>
		{:else}
            <New user={user}/>
		{/if}
	{/await}
{/if}
<style>
</style>
