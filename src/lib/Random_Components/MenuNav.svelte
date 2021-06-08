<!-- @component Purchase
	This is a navigation header.

	@example 
	<Menu_Nav minimized={true} />
 -->
<script>
	import Logout from '$lib/Auth/Logout.svelte';
	export let minimized = true;
</script>

<nav style="display:{minimized}">
	<ul>
		<li>
			<button><a href="/account">Account</a></button>
		</li>
		<li>
			<Logout />
		</li>
	</ul>
</nav>

<style>
	nav {
		position: block;
		top: -85px;
		left: 10%;
		background-color: white;
		border: 3px solid black;
		width: fit-content;
		margin: 0 auto;
		border-radius: 10px;
	}
	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		padding-left: 0;
	}
	li {
		display: inline;
		margin: 0 10px;
	}
</style>
