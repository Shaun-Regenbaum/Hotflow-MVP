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
		<p>${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
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

		/* Positioning: */
		min-width: 200px;
		min-height: 150px;
	}
	#balance {
		/* GRID: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;

		/* POSITIONING: */
		text-align: center;
		width: 100%;

		/* DESIGN: */
		border: black solid 3px;
		border-bottom: 0;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;

		/* Text: */
		font-weight: bold;
		font-size: 5rem;
	}
	#recharge {
		/* GRID: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;

		/* POSITIONING: */
		text-align: center;
		width: 100%;

		/* DESIGN: */
		border: 3px solid black;
		border-right: 1px;
		border-bottom-left-radius: 20px;
	}
	#withdraw {
		/* GRID: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;

		/* POSITIONING: */
		text-align: center;
		width: 100%;

		/* DESIGN: */
		border: 3px solid black;
		border-bottom-right-radius: 20px;
	}
</style>
