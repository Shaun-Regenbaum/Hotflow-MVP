<script>
	import Login from "$lib/Login.svelte"
	export let balance = 40;
	export let price = 10

	let existing = false;
</script>

<div id="card">
	<div id="balance">
		<p>Your Credit: ${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
	</div>
	<div id="logo">
		<h4>402</h4>
	</div>
	<div id="options">
		<Login existing={existing} login_message={'Login and Purchase'} register_message={"Purchase"}/>
		
	</div>
	
</div>

<style>
	#card {
		/* Grid Layout: */
		display: grid;
		grid-template-rows: 20% 5% 1fr 10%;
		grid-template-columns: 10% 0.5fr 0.5fr 30px;

		/* Positioning and Sizing: */
		aspect-ratio: 15/9;
		min-width: 300px;
		min-height: 200px;
		max-width: 400px;


		/*Padding: */
		padding: 0.5rem;
		margin:0.5rem;

		background-color: #bff7bf;
		background: linear-gradient(90deg, #bff7bf, #83d6c4);

		/* Neuromorphism */
		border-radius: 30px;
		box-shadow: var(--card);
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
		grid-column-end: 2;


		/* Positioning: */
		padding-left: 1rem;
	}
	#options{
		/*Grid Placement:*/
		grid-row-start: 1;
		grid-row-end: 4;
		grid-column-start: 2;
		grid-column-end: 5;

		/* Button Placement: */
		text-align: center ;
		margin:auto;
	}
	button{
		margin-left: 2vw;
		margin-right: 2vw;
		margin-bottom: 0;
		font-size: 1rem;
	}
</style>
