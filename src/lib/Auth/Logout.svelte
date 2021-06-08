<!-- @component Logout
	This component is for logging out, it should be very basic.

	@example
	<Logout pos="inherit" />
 -->
<script lang="ts">
	import supabase from '$lib/db';
	export let pos = 'inherit'; // to allow the refund button to go in wierd places

	let promise: Promise<{ error: globalThis.Error }>; // To allow for telling the user about an error with logging out.

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
		border: none;
		border-radius: 0px;
		border-bottom: 2px dotted black;
	}
</style>
