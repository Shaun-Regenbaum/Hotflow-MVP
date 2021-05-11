<script>
	import Form from '$lib/Creator/Form.svelte';
	export let creator = false;

	function assignCreator() {
		creator = !creator;
	}
</script>

{#if creator}
	<Form />
{:else}
	<div id="new_creator">
		<h3>Welcome to Hotflow Creators</h3>
		<div id="description">
			<p>Gain new streams of revenue by monetizing anything with a link through Hotflow.</p>
		</div>

		<button on:click={assignCreator}
			><h3>Become a Creator</h3>
			<div id="raised"><p>No sign up required</p></div></button
		>
	</div>
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

	#description {
		min-width: 200px;
		width: 70%;
		margin: auto;
		justify-content: center;
	}

	#raised {
		padding: 0.1rem;
		border-radius: 10px;
		box-shadow: inset 2px 2px 1px #bebebe, inset -2px -2px 1px #eeeeee;
	}


</style>
