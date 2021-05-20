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
    import { getLink } from '$lib/Endpoints/links'

    import Refund from '$lib/Consumer/Refund.svelte'

    export let minimized = false;
    export let linkId;

    let content_type:string = "PDF";
    let title:string = "Loading...";
    let brand:string = "Loading...";
    let price:number = 0;

	$: visible = minimized ? 'none' : '';

    function minimize() {
		minimized = !minimized;
	}

    onMount(async()=>{
        const link:Link = await getLink(linkId);
        title = link.title;
        brand = link.brand;
        price = link.price;
    })
</script>

<div class="container" transition:slide={{ duration: 500 }}>
    <div class="header" on:click={minimize}>
        <div class="type">
            <p>{content_type}</p>
        </div>
        <div class="title">
            <p>{title}</p>
        </div>
        <div id="price">
            <p>${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
            <p class="subtitle">Price</p>
        </div>
        <div class="minimize">
            <button style="transform: rotate( {minimized ? '360deg' : '0deg'});"/>
        </div>
    </div>
    <div class="hideable" style="display:{visible}">
        <div class="item" id="brand">
            <p>{brand}</p>
            <p class="subtitle">Creator</p>
        </div>
        <div class="item" id="refund">
            <Refund fontSize={1}/>
        </div>
    </div>
</div>

<style>
    .container{
        /* LAYOUT (FLEX): */
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* SIZING: */
        min-width: 310px;
        max-width: 700px;

        /* DESIGN: */
        border: 3px solid black;
        box-shadow: var(--divot);
        border-radius: 15px;
    }
    .header{
        /* LAYOUT (GRID): */
        display: flex;
        justify-content: space-between;
        padding:10px 10px 10px 20px;
    }

    .hideable{
        /* LAYOUT (GRID): */
        display: grid;
        grid-template-columns: 50% 50%;

        padding: 0px 10px 10px 10px;

    }
    .item{
        margin:5px;
        text-align: center;

        /* DESIGN: */
        box-shadow: var(--divot);
    }
    .title{
        text-align: center;
        flex-grow: .5;

        /* DESIGN: */
        box-shadow: var(--divot);
        border-radius: 15px;
        margin-left:20px;
        margin-right:20px;
    
    }
    .minimize{
        /* DESIGN: */
        margin-top: 8px;
    }


    #brand{
        /* GRID PLACEMENT: */
        grid-column-start: 1;
        grid-column-end: 2;

        /* DESIGN: */
        border-radius: 10px;
        background-color: var(--positive);
    }
    #price{
        /* GRID PLACEMENT: */
        grid-column-start: 2;
        grid-column-end: 3;

         /* DESIGN: */
         border-radius: 10px;
        background-color: var(--positive);
    }

    #refund{
        padding-top: 10px;
        padding-bottom: -10px;
        border-radius: 10px;
    }
    .subtitle{
        margin-top:-18px;
        font-size: 0.7rem;
    }

</style>

