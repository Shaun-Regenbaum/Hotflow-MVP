<!-- @component Contains balance information, and buttons to add or withdraw funds

	@example
	<Balanace balance={balance} />
 -->
<script lang="ts">
	import Deposit from '$lib/Account/Deposit.svelte';
	import Withdraw from '$lib/Account/Withdraw.svelte';
	export let balance = 0;

	// Making different parts appear and dissappear:
	$: selected_load_money = false;
	$: selected_withdraw = false;
</script>

<div id="container">
	<h3>Balance:</h3>
	<div id="balance">
		${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
	</div>
	<div id="options">
		<div id="withdraw">
			<button
				on:click={function () {
					selected_withdraw = true;
					selected_load_money = false;
				}}>Withdraw</button
			>
		</div>
		<div id="load_money">
			<button
				on:click={function () {
					selected_withdraw = false;
					selected_load_money = true;
				}}>Load Money</button
			>
		</div>
	</div>
	{#if selected_withdraw}
		<div id="withdraw_action">
			<Withdraw />
		</div>
	{:else if selected_load_money}
		<div id="load_money_action">
			<Deposit />
		</div>
	{/if}
</div>

<style>
	#container {
		/* GRID: */
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: fit-content;

		text-align: center;
		margin: 10px auto;
	}
	#options {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 20px;
	}

	#balance {
		border: 4px solid black;
		padding: 10px 30px 10px 30px;
		font-size: 5rem;
		border-radius: 10px;
	}

	button {
		border-bottom: 2px solid black;
	}

	#withdraw_action,
	#load_money_action {
		height: fit-content;
		padding-bottom: 50px;
	}
</style>
