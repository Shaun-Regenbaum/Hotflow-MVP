<!-- @component
	PROPERTIES:

		1) picture -> the picture to show for content-creator (NOT IMPLEMENTED).
		2) brand -> name of content creator to show.
	DESCRIPTION:

    This component is designed to show up for whenever a user needs to login or register:

        1) What they know:
            a. The basics of what login/registration is.
        2) What they don't know:
            a. What is behind the login/registration (TODO as contextually dependant).
            b. What will be done with the information provided.
        3) What they will want to know:
            a. What information can they use to login/register?
            b. Forgot Password/Account?
 -->
<script>
	export let brand = 'Mr. Anonymous';
</script>

<div id="container">
	<div id="picture" />
	<div id="brand">{brand}</div>
</div>

<style>
	:root {
		--pic-length: 50px;
	}
	#container {
		/* Grid Properties; */
		display: grid;
		grid-template-columns: 20% 80%;
		max-width: 400px;
		min-width: 200px;
	}
	#picture {
		/* Grid Placement: */
		grid-column: 1 2;

		/* Picture Size and shape: */
		width: var(--pic-length);
		height: var(--pic-length);
		border-radius: 100%;
		background-color: brown;
	}
	#brand {
		/* Grid Placement: */
		grid-column: 2 3;

		/* Centering Text: */
		margin: auto;
	}
</style>
