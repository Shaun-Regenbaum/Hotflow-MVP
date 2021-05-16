<!-- @page
    This page is designed to be a landing page:
        1) What they know:
            a. This is a product or service
            b. It is meant to help 'me' in some way
        2) What they don't know:
            a. What is the product?
            b. Am I the target user?
        3) What they will want to know:
            a. How much does it cost?
            b. Who is behind it?
            c. More info?
 -->
<script>
	import Offerings from '$lib/Landing/Offerings.svelte';
</script>

<body>
	<section id="heading">
		<h1>Welcome to 402</h1>
	</section>
	<section id="402-description">
		<h3>We make it possible to sell anything on the internet.</h3>
		<h3>All you need is a link. That's it.</h3>
	</section>
	<section>
		<Offerings />
	</section>
</body>

<style>
	body {
		background-color: #ebebeb;
	}

	#heading {
		/* Color: */

		/* Sizing and Positioning: */
		width: 80vw;
		max-width: 500px;
		padding: 2rem;
		margin: auto;
		text-align: center;
	}
</style>
