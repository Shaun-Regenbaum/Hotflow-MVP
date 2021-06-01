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
	<section id="header">
		<h1>402</h1>
	</section>
	<section id="402-description">
		<h3>Sell anything on the internet.</h3>
		<h3>All you need is a link. That's it.</h3>
	</section>
	<section>
		<Offerings />
	</section>
</body>

<style>
	h1 {
		font-size: 4rem;
	}
	body {
		background-color: #ebebeb;
	}

	#header {
		/* Color: */

		/* Sizing and Positioning: */
		margin: 0 auto;
		text-align: center;
	}

	section {
		width: fit-content;
		margin: 0 auto;
	}
</style>
