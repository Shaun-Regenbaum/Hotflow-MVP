<!-- @component
	PROPERTIES:

		1) balance -> balance of user.
	DESCRIPTION:

	This components contains the balance and options to add and withdraw funds.
 -->
<script lang="ts">

	export let balance = 0;
</script>

<div id="container">
	<div id="balance">${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</div>
	<div id="options">
		<div id="withdraw"><button>Withdraw</button></div>
		<div id="recharge"><button>Recharge</button></div>
	</div>
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
