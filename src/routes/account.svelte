<script lang="ts">
	import Login from '$lib/Auth/Login.svelte';
	import type { Profile } from '$lib/Docs/types';
	import supabase from '$lib/db';
	import { getProfile } from '$lib/Endpoints/profile';
	import History from '$lib/Account/History.svelte';
	import Balance from '$lib/Account/Balance.svelte';
	import CheckNew from '$lib/Account/CheckNew.svelte';
	import LinkAnalytics from '$lib/Account/LinkAnalytics.svelte';
	import { onMount } from 'svelte';

	$: selected = CheckNew;
	$: existing = false;
	let name = '...';

	function changeSelected(selection) {
		selected = selection;
	}
	let profile: Profile = { purchased_links: [] };
	onMount(async function () {
		const user = supabase.auth.user();
		if (user) {
			existing = true;
			profile = await getProfile(user.id);
			name = profile.name;
		}
	});
</script>

{#if existing}
	<div id="container">
		<div id="name"><h1>{name}</h1></div>
		<nav id="nav">
			<ul>
				<button class="nav_item" on:click|preventDefault={() => changeSelected(History)}>History</button>
				<button class="nav_item" on:click|preventDefault={() => changeSelected(LinkAnalytics)}>Analytics</button>
				<button class="nav_item" on:click|preventDefault={() => changeSelected(CheckNew)}>Create</button>
				<button class="nav_item" on:click|preventDefault={() => changeSelected(Balance)}>Wallet</button>
			</ul>
		</nav>
		<div id="item">
			<svelte:component
				this={selected}
				purchases={profile.purchased_links}
				owned={profile.owned_links}
				purchaser_id={profile.user_id}
				brand={profile.brand}
				userId={profile.user_id}
				balance={profile.balance}
			/>
		</div>
	</div>
{:else}
	<Login />
{/if}

<style>
	#container {
		/* GRID: */
		display: grid;
		grid-template-rows: [name-row] 100px [nav-row] 150px [item-row] 1fr [end-row];
		grid-template-columns: [start-col] 100% [end-col];
		justify-items: center;

		height: 600px;
		max-height: 100%;
	}
	#name {
		/* GRID: */
		grid-row: name-row / balance-row;
		grid-column: start-col / end-col;
		padding-top: 20px;
	}

	#nav {
		/* GRID: */
		grid-row: nav-row / item-row;
		grid-column: start-col / end-col;

		width: 80%;
		padding-top: 20px;
	}
	#item {
		/* GRID: */
		grid-row: item-row / end-row;
		grid-column: start-col / end-col;
		align-self: center;
	}

	ul {
		/* FLEX: */
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
		padding: 0;
	}

	@media (min-width: 550px) {
		button {
			font-size: 1.5rem;
		}
	}
</style>
