<!-- @component
	PROPERTIES:

		1) brand -> name of creator brand.
		2) price -> price of content.
		3) title -> title of content.
	DESCRIPTION:

    This component is designed to show up for whenever a user needs to login or register:

        1) What they know:
            a. The basics of what login/registration is.
        2) What they don't know:
            a. What is behind the login/registration (TODO as contextually dependant)
            b. What will be done with the information provided.
        3) What they will want to know:
            a. What information can they use to login/register?
            b. Forgot Password/Account?
 -->
<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte/Details.svelte';

	export let brand = 'Anonymous Inc.';
	export let price = 10;
	export let title = 'The Adventures of Narnia';
</script>

<div id="container">
	<section id="blurb">
		<Blurb {brand} />
	</section>
	<seciton id="details">
		<Details {price} {title} />
	</seciton>
	<section>
		<Login />
	</section>
</div>

<style>
	#container {
		/* Grid Proprties: */
		display: grid;
		grid-template-rows: 20% 30% 10% 50%;
		grid-template-columns: 33% 1fr 33%;

		/* Sizing and Positioning: */
		min-width: 250px;
		min-height: 300px;
		max-width: 1000px;
		max-height: 1000px;
		width: 100%;
		height: 100%;
	}

	#blurb {
		/* Grid Placement: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-end: span 4;

		/* Sizing and Position: */
		min-height: 60px;
		max-height: 100px;
		width: 100%;
		height: 50px;
	}
	#details {
		/* Grid Placement: */
		grid-row-start: 2;
		grid-row-end: 4;
		grid-column-end: span 4;

		/* Sizing and Position: */
		min-height: 100px;
		max-height: 500px;
		width: 100%;
		height: 400px;
	}
</style>
