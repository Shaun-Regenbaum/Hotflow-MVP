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
	export let brand = 'Anonymous Inc.';
</script>

<dl id="details">
	<section>
		<dt>Owner:</dt>
		<dd>{brand}</dd>
	</section>
	<section>
		<dt>Price:</dt>
		<dd>${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</dd>
	</section>
	<section>
		<dt>Refund Policy:</dt>
		<dd>{refund_policy}</dd>
	</section>
</dl>

<style>
	#details {
		/* Layout */
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	section {
		/* Design and Layout: */
		display: inline-block;
		box-shadow: var(--divot);
		padding: 5px 10px;
		margin: 10px;
		border-radius: 5px;

		/* Aligning Text: */
		text-align: center;
	}

	/* dt is descriptin term , or the  title of the relevant property for the content on the page.*/
	dt {
		/* Positioning and Sizing: */
		position: relative;
		top: 0;
		left: 0;
		text-align: left;

		/* Font Prroperties: */
		font-size: 0.7rem;
	}

	/* dd is descriptin detail , or the actual vale for property of the content on the page.*/
	dd {
		/* Font Prroperties: */
		font-size: 1.1rem;
	}
</style>
