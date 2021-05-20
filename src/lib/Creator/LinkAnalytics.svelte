<!-- @component
	PROPERTIES:
        1) minimized -> Whether to start component minimized or not
	DESCRIPTION:
    This component is a small analytics component so that creators can quickly see relevant data associated with one specific item of content.
 -->

<script lang="ts">
    import { slide } from 'svelte/transition';

    export let minimized = false;

    let content_type:string = "pdf";
    let title:string = "Loading";
    let payed:number = 0;
    let clicks:number = 0;
    let refunds:number = 0;
    let price:number = 0;
    let total:number = (payed - refunds)*price;

	$: visible = minimized ? 'none' : '';

    function minimize() {
		minimized = !minimized;
	}
</script>

<div class="container" transition:slide={{ duration: 500 }}>
    <div class="header" on:click={minimize}>
        <div class="headitem , type"><p>{content_type}</p></div>
        <div class="headitem , title"><p>{title}</p></div>
        <div class="minimize">
            <button style="transform: rotate( {minimized ? '360deg' : '0deg'});" />
        </div>
    </div>
    <div class="hideable" style="display:{visible}">
        <div class="item" id="payed"><p>{payed}</p><p class="subtitle">Payed</p></div>
        <div class="item" id="clicks"><p>{clicks}</p> <p class="subtitle">Clicks</p></div>
        <div class="item" id="refunds"><p>{refunds}</p><p class="subtitle">Refunds</p></div>
        <div class="item" id="total"><p>${Number(total / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p><p class="subtitle">Total</p></div>
    </div>
</div>

<style>
    .container{
        /* LAYOUT (FLEX): */
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* SIZING: */
        min-width: 250px;
        max-width: 700px;

        /* DESIGN: */
        box-shadow: var(--divot);
        border-radius: 25px;
    }
    .header{
        /* LAYOUT (GRID): */
        display: grid;
        grid-template-columns: 80px 0px 1fr 10px 70px;
        grid-template-rows: 100%;

        padding:10px;

    }

    .hideable{
        /* LAYOUT (GRID): */
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;

        padding:10px;

    }
    .headitem{
        /* POSITIONING: */
        justify-self: center;

        /* SIZING: */
        width: max-content;
        padding-left:5px;
        padding-right:5px;
    }
    .item{
        margin:5px;
        text-align: center;

        /* DESIGN: */
        box-shadow: var(--divot);
        border-radius: 25px;
        
    }
    .type{
        /* GRID PLACEMENT: */
        grid-column-start: 1;
        grid-column-end: 2;

        /* POSITIONING: */

    }
    .title{
        /* GRID PLACEMENT: */
        grid-column-start: 3;
        grid-column-end: 4;

    
    }
    .minimize{
        /* GRID PLACEMENT: */
        grid-column-start: 5;
        grid-column-end: 6;

        /* DESIGN: */
        justify-self: center;
        margin-top: 8px;
    }


    #payed{
        /* GRID PLACEMENT: */
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 2;

        /* DESIGN: */
        border-radius: 10px;
        background-color: var(--positive);
    }

    #clicks{
        /* GRID PLACEMENT: */
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 3;

        /* DESIGN: */
        border-radius: 10px;
        background-color: var(--positive);

    }
    #refunds{
        /* GRID PLACEMENT: */
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 2;

         /* DESIGN: */
         border-radius: 10px;
        background-color: var(--negative);
    }
    #total{
        /* GRID PLACEMENT: */
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 3;

         /* DESIGN: */
         border-radius: 10px;
        background-color: var(--positive);
    }

    .subtitle{
        margin-top:-18px;
        font-size: 0.7rem;
    }

</style>

