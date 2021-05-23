<!-- @component
	PROPERTIES:

		1) price -> the price of the content purchased.
		2) brand -> the brand name of the creator.
		3) purchaserId
		4) sellerId
		5) linkId
		6) minimized -> Whether the component should fade away or not.
	DESCRIPTION:

    This component is designed to show up for when an existing user with suffecient balance purchases an item.
	
        1) What they know:
            a. They just clicked on an item.
            b. They are expecting to see content.
            c. (?) They are signed up with 402
        2) What they don't know:
            a. (?) That they just purchaased an article.
            b. Specific Information about the article
        3) What they will want to know:
            a. How much does it cost?
            b. Can I undo/refund it?
 -->
<script>
	import Refund from '$lib/Consumer/Refund.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	export let price;
	export let brand = 'Anonymous';
	export let purchaserId;
	export let sellerId;
	export let linkId;
	export let minimized = false;

	onMount(() => {
		minimized = false;
		setTimeout(() => (minimized = true), 7000);
	});

	// Making transaction component dissappear after some interaction:
	function minimize() {
		setTimeout(() => (minimized = true), 2000);
	}
</script>

<svelte:window on:pointermove={minimize} on:mousemove={minimize} />
{#if !minimized}
	<div id="purchase_notification" transition:slide={{ duration: 200 }}>
		<section id="amount">
			<p>Amount: ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
		</section>
		<section id="brand">
			<p>By: {brand}</p>
		</section>
		<Refund {purchaserId} {sellerId} {linkId} amount={price} />
	</div>
{/if}

<style>
	/* Mobile-First: */
	#purchase_notification {
		/* Color:  */
		background-color: var(--bg);

		/* Positioning and Sizing: */
		min-width: 290px;
		max-width: 400px;
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 100000;

		/* Nueromorphic: */
		box-shadow: var(--button);

		/* Border: */
		border-radius: 5px 35px 5px 5px;
		background-color: white;
		border-style: solid;

		transition: all 0.2s ease;
	}
	section {
		/* Keeping the different sections seperate: */
		padding-inline: 5px;
		/* Animations: */
		transition: all 0.2s ease;
	}

	p {
		padding: 10px;
		border-radius: 15px;
		box-shadow: var(--divot);
	}
	/* Bigger than mobile:*/
	@media (min-width: 700px) {
		#purchase_notification {
			/* Positioning and Sizing: */
			min-width: 350px;
			max-width: 450px;
			display: flex;
			font-size: 20px;
			padding: 0px 20px 0px 20px;
		}
		section {
			/* Keeping the different sections seperate: */
			padding-inline: 5px;
			/* Animations: */
			transition: all 0.2s ease;
		}
	}

	/* 333RX4WA */
</style>
