<!-- @component
	PROPERTIES:
        1) minimized -> Whether to start component minimized or not
        2) linkId -> linkId for analytics
	DESCRIPTION:
    This component is a small notice for admins to send out a payment through venmo, etc...
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import type { Withdrawal } from '$lib/Docs/types';
	import { getWithdrawal } from '$lib/Endpoints/withdrawal';

	export let minimized = false;
	export let withdrawalId;

	let provider: string = '402';
	let email: string = 'Loading...';
	let identifier: string = 'Loading...';
	let amount: number = 0;
	let addn: string = 'None';

	$: visible = minimized ? 'none' : '';

	function minimize() {
		minimized = !minimized;
	}

	onMount(async () => {
		const withdrawal: Withdrawal = await getWithdrawal(withdrawalId);
		provider = withdrawal.provider;
		email = withdrawal.email;
		identifier = withdrawal.identifier;
		amount = withdrawal.amount;
		addn = withdrawal.addn;
	});
</script>

<div class="container" transition:slide={{ duration: 500 }}>
	<div class="header" on:click={minimize}>
		<div class="type">
			<p>{provider}</p>
		</div>
		<div class="email">
			<p>{email}</p>
			<p class="subtitle">Email</p>
		</div>
		<div id="amount">
			<p>${Number(amount / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
			<p class="subtitle">Amount</p>
		</div>
		<div class="minimize">
			<button style="transform: rotate ({minimized ? '360deg' : '0deg'})" />
		</div>
	</div>
	<div class="hideable" style="display:{visible}">
		<div class="item" id="brand">
			<p>{identifier}</p>
			<p class="subtitle">Identifier</p>
		</div>
		<div class="item" id="addn">
			<p>{addn}</p>
			<p class="subtitle">Additional Info:</p>
		</div>
	</div>
</div>

<style>
	.container {
		/* LAYOUT (FLEX): */
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		/* SIZING: */
		min-width: 310px;
		max-width: 700px;

		/* DESIGN: */
		border: 3px solid black;
		box-shadow: var(--divot);
		border-radius: 15px;
	}
	.header {
		/* LAYOUT (GRID): */
		display: flex;
		justify-content: space-between;
		padding: 10px 21px 10px 21px;
	}

	.hideable {
		/* LAYOUT (GRID): */
		display: grid;
		grid-template-columns: 50% 50%;

		padding: 0 10px 10px 10px;
	}
	.item {
		margin: 5px;
		text-align: center;

		/* DESIGN: */
		box-shadow: var(--divot);
	}
	.email {
		text-align: center;
		flex-grow: 0.5;

		/* DESIGN: */
		background-color: #f1f1f1;
		box-shadow: var(--divot);
		border-radius: 15px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.type {
		padding-top: 5px;
	}
	.minimize {
		/* DESIGN: */
		padding-top: 5px;
		margin-top: 8px;
	}

	#brand {
		/* GRID PLACEMENT: */
		grid-column-start: 1;
		grid-column-end: 2;

		/* DESIGN: */
		border-radius: 10px;
		background-color: #f1f1f1;
	}
	#amount {
		/* DESIGN: */
		flex-grow: 0.3;
		margin-right: 10px;
		border-radius: 10px;
		text-align: center;
		box-shadow: var(--divot);
		background-color: var(--positive);
	}

	#addn {
		background-color: #f1f1f1;
		padding-top: 10px;
		padding-bottom: -10px;
		border-radius: 10px;
	}
	.subtitle {
		margin-top: -18px;
		font-size: 0.7rem;
	}
</style>
