<!-- @component
    PROPERTIES:

		1) price -> what is the price of content?
		2) refund-policy -> what is the refundability of the content? Default is "Full"
		3) title -> what is the title of the content?
	DESCRIPTION:

    This component is designed to show a new user the details about the content they clicked on to provide context for them to sign up.

        1) What they know:
            a. They just clicked on a link.
            b. They are expecting to see content.
        2) What they don't know:
            a. That this context costs money
            b. Specific Information about the content
            c. That they can refund.
        3) What they will want to know:
            a. How much does it cost?
            b. Can I undo/refund it?
 -->
<script>
	export let price = 0;
	export let refund_policy = 'Full';
	export let title = 'The Adventures of Narnia';
</script>

<div id="container">
	<section>
		<p>Price: ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
	</section>
	<section>
		<p>Refund Policy: {refund_policy}</p>
	</section>
	<section>
		<p>Ttile: {title}</p>
	</section>
</div>

<style>
	#container {
		display: flex;
		flex-wrap: wrap;
	}

	section {
		box-shadow: var(--button);
		padding: 0px 10px;
		margin: 10px;
		border-radius: 5px;
	}
</style>
