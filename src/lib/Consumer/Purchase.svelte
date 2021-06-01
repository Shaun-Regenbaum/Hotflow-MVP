<!-- @component Purchase
	Showing relevant data for ONE PURCHASE of a single link tied to a given user.

	@example 
	<Purchase minimized={true} linkId={link_id} />
 -->
<script lang="ts">
	import { onMount } from 'svelte';

	import type { Link } from '$lib/Docs/types';
	import { getLink } from '$lib/Endpoints/links';

	import Refund from '$lib/Consumer/Refund.svelte';

	export let minimized:boolean = true; // Expanded View?
	export let link_id:string; // For Link Data
	export let purchaser_id:string; // For Refund
	let seller_id:string; //For Refund

	$: content_type = '📦';
	$: title = 'Loading...';
	$: brand = 'Loading...';
	$: price = 0;

	$: visible = minimized ? 'none' : '';

	// Update Data when component is created. @todo: Optimize?
	onMount(async function(){
		const link: Link = await getLink(link_id);
		title = link.title;
		brand = link.brand;
		price = link.price;
		seller_id = link.owner_id;
	});
</script>

<div id="container">
	<div id="header" on:click={()=> (minimized = !minimized)}>
		<div id="content_type">
			<p>{content_type}</p>
		</div>
		<div class="item">
			<p>{title}</p>
			<p class="subtitle">Title</p>
		</div>
		<div class="item" id="brand">
			<p>{brand}</p>
			<p class="subtitle">Creator</p>
		</div>
		<div class="item" id="amount">
			<p>${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
			<p class="subtitle">Price</p>
		</div>
		<div id="minimize">
			<button style="transform: rotate( {minimized ? '360deg' : '0deg'});" />
		</div>
	</div>
	<div id="hideable" style="display:{visible}">
		<div id="refund">
			<div class="item" id="url">
				<p>{ '/' + brand + '/' + title}</p>
				<p class="subtitle">Url</p>
			</div>
			<Refund purchaserId = {purchaser_id} sellerId ={seller_id} linkId={link_id} amount={price} />
		</div>
	</div>
</div>

<style>

	/* General Stuff: */
	p{
		font-size: 0.7rem;
	}
	.item {
		border-radius: 10px;
		text-align: center;
		margin:5px 0;
		padding-bottom: 5px;

		/* DESIGN: */
		box-shadow: var(--divot);
	}

	.subtitle {
		margin: -10px 0 0 0;
		padding:0;
		font-size: 0.3rem;
	}

	/* Specific Stuff: */

	#container {
		/* LAYOUT (FLEX): */
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		/* SIZING: */
		width: 300px;
		max-width: 700px;

		/* DESIGN: */
		border: 3px solid black;
		box-shadow: var(--divot);
		border-radius: 15px;

	}
	#header {
		/* LAYOUT (FLEX): */
		display: flex;
		justify-content: space-between;
	}
	#hideable {
		/* LAYOUT (GRID): */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	#content_type {
		padding-top: 4px;
		margin-left:5px;
	}
	#minimize {
		/* DESIGN: */
		margin-right:10px;
	}

	#url{
		margin: 0 10px;
		padding-top:0.5px;
	}

	#amount {
		/* DESIGN: */
		background-color: var(--negative);
	}
	button{
		padding: 2px 10px;
}
	button:hover, button:active{
		box-shadow: none;
	}
</style>
