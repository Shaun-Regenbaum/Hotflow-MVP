<script>
	export let balance = 210;
	export let price = 10
</script>

<div id="card">
	<div id="balance">
		<h4>Your Credit:</h4>
		<h1>${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</h1>
	</div>
	<div id="logo">
		<h4>402</h4>
	</div>
	<button id="grid1">Purchase for ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</button>
	<button id="grid2">Mooch the Content</button>
</div>

<style>
	#card {
		/* Grid Layout: */
		display: grid;
		grid-template-rows: 40% 10% 40% 10%;
		grid-template-columns: 10% 0.5fr 0.5fr 50px;

		/* Positioning and Sizing: */
		aspect-ratio: 15/9;
		min-width: 300px;
		min-height: 150px;
		max-width: 700px;


		/*Padding: */
		padding: 0.5rem;

		background-color: rgb(164, 164, 255);

		/* Neuromorphism */
		border-radius: 30px;
		box-shadow: 3px 3px 7px var(--neuro-dark), -4px -4px 7px var(--neuro-light),
		inset -2px -2px 4px var(--neuro-dark), inset 2px 2px 4px var(--neuro-light);

	}

	#logo{
		/*Grid Placement:*/
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 4;
		grid-column-end: 5;

		font-style: italic;
		margin-top: -1rem;
	}
	#balance{
		/*Grid Placement:*/
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;


		/* Positioning: */
		padding-left: 2rem;
	}


	#grid1 {
		/*Grid Placement:*/
		grid-row-start: 3;
		grid-row-end: 4;
		grid-column-start: 1;
		grid-column-end: 3;

	}
	#grid2 {
		/*Grid Placement:*/
		grid-row-start: 3;
		grid-row-end: 4;
		grid-column-start: 3;
		grid-column-end: 5;
	}
	button{
		margin:2rem;
		font-size: 1rem;
	}
</style>
