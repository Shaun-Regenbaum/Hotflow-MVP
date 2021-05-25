<!-- @component
	PROPERTIES:

		1) user
 -->
<script>
	import supabase from '$lib/db';

	export let user;
	$: submitted = false;
	let error_message = '';
	let promise;
	let brand;

	async function assignCreator() {
		promise = supabase.from('profiles').update({ brand: brand }).eq('user_id', user.id);
		promise.then(function ({ data, error }) {
			if (data) {
				location.reload();
			} else {
				error_message = error.message;
				submitted = false;
			}
		});
	}
</script>

{#if !submitted}
	<div id="new_creator">
		<h2>Become a Creator</h2>
		<p>Just tell us the brand under which your content should be:</p>
		<form on:submit|preventDefault={assignCreator}>
			<label for="title">Title for Content - Optional</label>
			<input type="text" name="brand" placeholder="Brand Name" bind:value={brand} />
			<button type="submit"><h3>Become a Creator</h3></button>
		</form>
	</div>
	<p>{error_message}</p>
{:else}
	<!-- Information about status of Request:-->
	{#await promise}
		<p>Updating Profile...</p>
	{:then { user, error }}
		<p>{user ? 'Done!' : error.message}</p>
	{/await}
{/if}

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
