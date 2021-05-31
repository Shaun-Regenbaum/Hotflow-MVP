<!-- @component
	PROPERTIES:

		1) NONE
	DESCRIPTION:

    This component is designed to be the refund button. IT NEEDS WORK.
	
        1) What they know:
			a. ?
        2) What they don't know:
            a. ?
        3) What they will want to know:
            a. ?
 -->
<script>
	import Checkout from '$lib/Paypal/Checkout.svelte';
</script>

<div id="container">
	<div id="options_container">
		<button><h3>$1</h3></button>
		<button><h3>$3</h3></button>
		<button><h3>$5</h3></button>
	</div>
	<div style="width:fit-content " id="description">Load up your wallet</div>
</div>

<style>
	#container {
		/* GRID: */
		display: grid;
		grid-template-rows: 1fr 40%;
		grid-template-columns: 100%;
	}
	#options_container {
		/* GRID: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 2;
		margin-bottom: 1rem;

		/* FLEX Properties */
		display: flex;
		justify-content: space-evenly;
	}
	#description {
		/* GRID: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;
		/* Center text */
		justify-self: center;
		padding: 1rem 1rem 1rem 1rem;

		border-radius: 10px;
		box-shadow: inset 2px 2px 1px #bebebe, inset -2px -2px 1px #eeeeee;
	}
</style>