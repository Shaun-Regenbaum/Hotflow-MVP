<!-- @component Purchase
	Showing relevant data for ONE PURCHASE of a single link tied to a given user.

	@example 
	<Purchase link_id={link_id} />
 -->
<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import type { Link } from '$lib/Docs/types';
	import { getLink } from '$lib/Endpoints/links';

	//Properties:
	export let link_id: string;

	let origin="402.netlify.app"

	$: content_type = '📦'; // @future: Eventually this will be changed as well.
	$: title = 'Loading...';
	$: brand = 'Loading...';
	$: price = 0;


	onMount(async function () {
		// @question: Will allowing specific calls to backend be faster than full row call?
		const link: Link = await getLink(link_id);
		title = link.title;
		brand = link.brand;
		price = link.price;
		// @question: Not sure if I need to wrap in broswer?
		if (browser){
			origin = location.origin;
		}
	});
</script>

<div id="container">
	<p id="content_type">{content_type}</p>
	<a href={origin + '\\' + brand + '\\' + title}>{title}</a>
	<p id="amount">- ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
</div>

<style>
	/* General Stuff: */
	p {
		font-size: 1rem;
		margin: 8px 0;
	}
	
	/* Specific Stuff: */
	#container {
		/* LAYOUT (FLEX): */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: baseline;


		/* SIZING: */
		width: 300px;
		max-width: 700px;
		/* To make room for scrollbar: */
		margin-right:10px;

		/* DESIGN: */
		border: 2px solid rgb(163, 163, 163);
		border-radius: 10px;
	}

	#amount {
		/* DESIGN: */
		color: var(--negative);
	}
</style>
