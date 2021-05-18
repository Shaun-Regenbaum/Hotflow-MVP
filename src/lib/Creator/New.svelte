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
	import { browser } from '$app/env';
	import Form from '$lib/Creator/Form.svelte';

	let user;

	let brand;
	let message = '';
	if (browser) {
		user = supabase.auth.user();
		checkStatus();
	}

	async function checkStatus() {
		const { data, error } = await supabase.from('profiles').select('brand').eq('id', user.id);
		if (data) {
			brand = data[0].brand;
		} else {
			message = error.message;
		}
	}
	async function assignCreator() {
		const { data, error } = await supabase
			.from('profiles')
			.update({ brand: brand })
			.eq('id', user.id);
		if (data) {
			brand = brand;
		} else {
			message = error.message;
		}
	}
</script>

{#if brand}
	<Form {brand} />
{:else}
	<div id="new_creator">
		<h2>402 Creators</h2>
		<h4>Create new streams of revenue by monetizing anything with a link:</h4>
		<p>Just tell us the brand under which your content should be:</p>
		<form on:submit|preventDefault={assignCreator}>
			<label for="title">Title for Content - Optional</label>
			<input type="text" name="brand" placeholder="Brand Name" bind:value={brand} />
			<div />
			<button type="submit"><h3>Become a Creator</h3></button>
		</form>
	</div>
{/if}
<p>{message}</p>

<style>
	#new_creator {
		/* Keeping the Login Form Centered: */
		text-align: center;

		/*Padding: */
		padding: 1rem;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: inset 3px 3px 5px #eeeeee, inset -3px -3px 5px #bebebe;
	}
</style>
