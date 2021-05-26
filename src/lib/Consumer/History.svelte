<!-- @component
	PROPERTIES:

    1) purchases 

    2) purchaser_id

 -->
<script>
    import Purchase from "$lib/Consumer/Purchase.svelte"
    export let purchases;
    export let purchaser_id;
</script>

<div id="container">
    <h3>Purchase History:</h3>
    {#if purchases}
        {#each purchases as link_id }
        <div id="purchase_container">
            <Purchase link_id={link_id} purchaser_id={purchaser_id}/>
        </div>
        {/each}
    {:else}
    <p>No Purchase History.</p>
    {/if}
</div>

<style>
    #container{
        width:fit-content;
        margin:0 auto;;
        border: 3px soldi black;
        text-align: center;
    }
    #purchase_container{
        margin-bottom: 10px;
    }
</style>