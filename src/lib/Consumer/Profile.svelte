<!-- @component
	PROPERTIES:

		1) picture -> the picture to show for the consumer(NOT IMPLEMENTED).
		2) name -> name of user.
	DESCRIPTION:
        ????
 -->
 <script>
	export let name = 'Mr. Anonymous';
</script>

<div id="grid">
	<div id="container">
		<div id="picture" />
		<div id="name">{name}</div>
	</div>
</div>

<style>
	:root {
		--pic-length: 50px;
	}
	#grid {
		display: grid;
		grid-template-columns: 1fr auto;
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
	#picture {
		/* Picture Size and shape: */
		width: var(--pic-length);
		height: var(--pic-length);
		border-radius: 100%;
		background-color: var(--bg);

		/* Nuero: */
		box-shadow: var(--divot);
	}
	#name {
		align-self: center;
		padding: 10px;
		margin: 10px;

		/* Nuero: */
		box-shadow: var(--divot);
		border-radius: 20px;
	}
</style>
