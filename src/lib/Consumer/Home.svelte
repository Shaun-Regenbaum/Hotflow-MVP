<script>
	export let balance = 210;
</script>

<div id="home">
	<div id="raised">
		<h1>${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</h1>
	</div>
</div>

<style>
	#home {
		/* Keeping the Login Form Centered: */
		text-align: center;

		/*Padding: */
		padding: 1rem;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: inset 3px 3px 5px #eeeeee, inset -3px -3px 5px #bebebe;
	}
	#raised {
		padding: 0.1rem;
		border-radius: 10px;
		box-shadow: inset 2px 2px 1px #bebebe, inset -2px -2px 1px #eeeeee;
	}
</style>
