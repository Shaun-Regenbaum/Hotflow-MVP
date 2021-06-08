<!-- @component AnalyticsItem
	An single item that contains analytics about a link. Needs to be provided a link Id. This goes into the Analytics container component. 

	@example <AnalyticsItem minimized={false} link_id={link_id}/>
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Link } from '$lib/Docs/types';
	import { getLink } from '$lib/Endpoints/links';
	import { browser } from '$app/env';

	// Properties:
	export let minimized = false;
	export let link_id: string; // For Link Data

	let origin = '402.netlify.app';

	// Link Data:
	$: content_type = '📦'; // @future: Eventually this will be changed as well.
	$: title = 'Loading...';
	$: brand = '...';
	$: price = 0;
	$: payments = 0;
	$: clicks = 0;
	$: refunds = 0;
	$: total = (payments - refunds) * price;

	// State:
	$: visible = minimized ? 'none' : '';

	onMount(async () => {
		// @question: Will allowing specific calls to backend be faster than full row call?
		const link: Link = await getLink(link_id);
		title = link.title;
		payments = link.payments;
		clicks = link.clicks;
		refunds = link.refunds;
		price = link.price;
		brand = link.brand;

		// @question: Not sure if I need to wrap in broswer?
		if (browser) {
			origin = location.origin;
		}
	});
</script>

<div class="container">
	<div class="header" on:click={() => (minimized = !minimized)}>
		<p id="content_type">{content_type}</p>
		<a href={origin + '\\' + brand + '\\' + title}>{title}</a>
		<div class="minimize">
			<button style="transform: rotate( {minimized ? '360deg' : '0deg'});">⬇️</button>
		</div>
	</div>
	<div class="hideable" style="display:{visible}">
		<div class="item" id="payed">
			<p>{payments}</p>
			<p class="subtitle">Payed</p>
		</div>
		<div class="item" id="clicks">
			<p>{clicks}</p>
			<p class="subtitle">Clicks</p>
		</div>
		<div class="item" id="refunds">
			<p>{refunds}</p>
			<p class="subtitle">Refunds</p>
		</div>
		<div class="item" id="total">
			<p>${Number(total / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
			<p class="subtitle">Total</p>
		</div>
	</div>
</div>

<style>
	.container {
		/* LAYOUT (FLEX): */
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		/* SIZING: */
		width: 300px;
		max-width: 700px;
		/* To make room for scrollbar: */
		margin-right: 10px;

		/* DESIGN: */
		border: 2px solid rgb(163, 163, 163);
		border-radius: 10px;
	}
	.header {
		/* LAYOUT (GRID): */
		display: flex;
		justify-content: space-around;
		align-items: baseline;
	}

	.hideable {
		/* LAYOUT (GRID): */
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: 50% 50%;

		padding: 0px 10px 10px 10px;
	}
	.item {
		margin: 5px;
		text-align: center;

		/* DESIGN: */
		box-shadow: var(--divot);
		border-radius: 25px;
	}

	#payed {
		/* GRID PLACEMENT: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 2;

		/* DESIGN: */
		border-radius: 10px;
		background-color: var(--positive);
	}

	#clicks {
		/* GRID PLACEMENT: */
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 2;
		grid-column-end: 3;

		/* DESIGN: */
		border-radius: 10px;
		background-color: var(--positive);
	}
	#refunds {
		/* GRID PLACEMENT: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;

		/* DESIGN: */
		border-radius: 10px;
		background-color: var(--negative);
	}
	#total {
		/* GRID PLACEMENT: */
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;

		/* DESIGN: */
		border-radius: 10px;
		background-color: var(--positive);
	}

	.subtitle {
		margin-top: -18px;
		font-size: 0.7rem;
	}

	button {
		border: 0;
		border-radius: 0;
	}
</style>
