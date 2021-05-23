<!-- @component
	PROPERTIES:

		1) picture -> the picture to show for the consumer(NOT IMPLEMENTED).
		2) name -> name of user.
	DESCRIPTION:

	This components contains the balance and options to add and withdraw funds.
 -->
<script lang="ts">
	export let balance = 0;
</script>

<section id="balance_container">
	<div id="balance">
		<h1>${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</h1>
	</div>
	<div id="recharge">
		<p>Recharge</p>
	</div>
	<div id="withdraw">
		<p>Withdraw</p>
	</div>
</section>

<style>
	#balance_container {
		/* GRID: */
		display: grid;
		grid-template-rows: 80% 20%;
		grid-template-columns: 50% 50%;

		/* DESIGN: */
		border: black solid 3px;
		border-radius: 20px;

		/* Positioning: */
		min-width: 200px;
	}
	#balance {
		/* GRID: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;

		/* POSITIONING: */
		justify-self: center;
	}
	#recharge {
		/* GRID: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;

		/* POSITIONING: */
		justify-self: center;
	}
	#withdraw {
		/* GRID: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;

		/* POSITIONING: */
		justify-self: center;
	}
</style>
