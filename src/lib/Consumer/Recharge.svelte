<script>
</script>

<div id="recharge">
	<div id="container">
		<button><h3>$1</h3></button>
		<button><h3>$3</h3></button>
		<button><h3>$5</h3></button>
	</div>
	<p id="raised">
		Your 402 Wallet will be recharged after charging your preferred payment method. You will be
		asked for one more confirmation after you click the button.
	</p>
</div>

<style>
	#recharge {
		/*Padding: */
		padding: 1rem;

		/* Text Settings: */
		text-align: justify;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: inset 3px 3px 5px #eeeeee, inset -3px -3px 5px #bebebe;
	}
	#container {
		/* Container Properties */
		display: flex;
		justify-content: space-around;

		padding: 1rem 5rem;
	}
	#raised {
		/* Center text */
		text-align: center;

		padding: 0.1rem;
		border-radius: 10px;
		box-shadow: inset 2px 2px 1px #bebebe, inset -2px -2px 1px #eeeeee;
	}

	button {
		/* Removing all the default outlines: */
		border: 0;
		outline: 0;
		background: #e0e0e0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		margin-top: 0.5rem;
		color: rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe, -3px -3px 10px #ffffff;

		/* Animations: */
		transition: all 0.2s ease;
	}

	button:hover,
	button:active {
		box-shadow: 1px 1px 5px #9b9b9b, -1px -1px 5px #ffffff;
	}
</style>
