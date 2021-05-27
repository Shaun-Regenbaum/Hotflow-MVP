<!-- @component
	PROPERTIES:
        1) minimized -> Whether to start component minimized or not
        2) linkId -> linkId for analytics
	DESCRIPTION:
    This component is a small analytics component so that creators can quickly see relevant data associated with one specific item of content.
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import type { Link } from '$lib/Docs/types';
	import { getLink } from '$lib/Endpoints/links';

	import Refund from '$lib/Consumer/Refund.svelte';

	export let minimized = true;
	export let link_id ='';
	export let purchaser_id ='';

	$: content_type = 'PDF';
	$: title = 'Loading...';
	$: brand = 'Loading...';
	$: price = 0;
	$: seller_id = '';

	$: visible = minimized ? 'none' : '';

	onMount(async function(){
		const link: Link = await getLink(link_id);
		title = link.title;
		brand = link.brand;
		price = link.price;
		seller_id = link.owner_id;
	});
</script>

<div class="container" transition:slide={{ duration: 500 }}>
	<div class="header" on:click={()=> (minimized = !minimized)}>
		<div class="type">
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
		<div class="minimize">
			<button style="transform: rotate( {minimized ? '360deg' : '0deg'});" />
		</div>
	</div>
	<div class="hideable" style="display:{visible}">
		<div id="refund">
			<div class="item" id="url">
				<p>{ '/' + brand + '/' + title}</p>
				<p class="subtitle">Url</p>
			</div>
			<Refund purchaserId = {purchaser_id} sellerId ={seller_id} linkId={link_id} amount={price} fontSize={1} />
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

		/* DESIGN: */
		border: 3px solid black;
		box-shadow: var(--divot);
		border-radius: 15px;

	}

	p{
		font-size: 0.7rem;
	}
	.header {
		/* LAYOUT (FLEX): */
		display: flex;
		justify-content: space-between;
	}

	.hideable {
		/* LAYOUT (GRID): */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.item {
		border-radius: 10px;
		text-align: center;
		margin:5px 0;
		padding-bottom: 5px;

		/* DESIGN: */
		box-shadow: var(--divot);
	}
	.type {
		padding-top: 4px;
		margin-left:5px;
	}
	.minimize {
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


	.subtitle {
		margin: -10px 0 0 0;
		padding:0;
		font-size: 0.3rem;
	}
	button{
		padding: 2px 10px;
}
	button:hover, button:active{
		box-shadow: none;
	}
</style>
