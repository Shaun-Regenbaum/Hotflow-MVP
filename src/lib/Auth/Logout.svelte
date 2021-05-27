<!-- @component
	PROPERTIES:

		1) position -> does the logout button need to be inline or relative, or just whatev.
	DESCRIPTION:

    This component is for logging out, it should be very basic.
 -->
<script>
	import supabase from '$lib/db';
	export let pos = 'inherit'; // to allow the refund button to go in wierd places
	let promise; // To allow for telling the user about problems with logging out.

	function submitLogout() {
		promise = supabase.auth.signOut();
		promise.then(() => location.reload()); //Reload page after logout.
	}
</script>

<div id="logout">
	<button on:click={submitLogout} style="position: {pos}; z-index: 2;">Logout</button>
	{#await promise}
		Logging Out...
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	#logout {
		text-align: center;
	}

	button {
		margin: 20px 0px 0px 7px;
		font-size: 20px;
		padding-top: 10px;
	}
</style>
