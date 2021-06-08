<!-- @component Purchase
	This is a navigation header.

	@example 
	<Menu_Nav minimized={true} />
 -->
<script>
	import { goto } from '$app/navigation';
	import Logout from '$lib/Auth/Logout.svelte';
	export let minimized = true;
</script>

<nav style="display:{minimized}">
	<ul>
		<li>
			<button>Refund</button>
		</li>
		<li>
			<button on:click={() => goto('/account')}>Account</button>
		</li>
		<li>
			<button>History</button>
		</li>
		<li>
			<Logout />
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		padding-right: 20px;
	}
	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		padding: 0px;
	}
	li {
		display: inline;
	}
	button {
		border: none;
	}
</style>
