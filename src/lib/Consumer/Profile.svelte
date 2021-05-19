<!-- @component
	PROPERTIES:

		1) picture -> the picture to show for the consumer(NOT IMPLEMENTED).
		2) name -> name of user.
		3) balance -> balance of user.
	DESCRIPTION:
        ????
 -->
<script>
	export let name = 'Mr. Anonymous';
	export let balance = 210;
</script>

<div id="container">
	<section id="picture" />
	<section class="account_detail">{name}</section>
	<section class="account_detail">
		Balance: ${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
	</section>
</div>

<style>
	:root {
		--pic-length: 50px;
	}
	#container {
		/* Layout */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		/* Positionging: */
		justify-content: flex-start;
		min-width: 200px;
		margin-left: 30px;
	}

	section {
		padding: 10px;
		margin: 10px;
	}

	#picture {
		/* Picture Size and shape: */
		width: var(--pic-length);
		height: var(--pic-length);
		border-radius: 100%;
		background-color: var(--bg);

		/* Nuero: */
		box-shadow: var(--divot);
	}
	.account_detail {
		align-self: center;

		/* Nuero: */
		box-shadow: var(--divot);
		border-radius: 20px;
	}
</style>
