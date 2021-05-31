<!-- @component
	PROPERTIES:

		1) balance -> balance of user.
	DESCRIPTION:

	This components contains the balance and options to add and withdraw funds.
 -->
<script lang="ts">
	import Deposit from '$lib/Account/Deposit.svelte'
	import { fade } from 'svelte/transition';
	export let balance = 0;

	// Making different parts appear and dissappear:
	$: selected_load_money = false;
	$: selected_withdraw = false;


</script>

<div id="container">
	<h3>Balance:</h3>
	<div id="balance">${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</div>
	<div id="options">
		<div id="withdraw"><button on:click="{function(){selected_withdraw=true; selected_load_money=false;}}">Withdraw</button></div>
		<div id="load_money"><button on:click="{function(){selected_withdraw=false; selected_load_money=true;}}">Load Money</button></div>
	</div>
	{#if selected_withdraw}
	<div id="withdraw_action" in:fade>
		<h1>Coming Soon.</h1>
	</div>
	{:else if selected_load_money}
	<div id="load_money_action" in:fade>
		<Deposit/>
	</div>
	{/if}
</div>

<style>
	#container{
		/* GRID: */
		display: flex;
		flex-direction: column;
		justify-content: center;

		text-align: center;
		margin: 0 auto;

	}
	#options{
		display:flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 20px;
	}

	#balance{
		border: 4px solid black;
		padding: 10px 30px 10px 30px;
		font-size: 5rem;
		border-radius: 10px;
	}

	button{
		border-bottom: 2px solid black
	}
</style>
