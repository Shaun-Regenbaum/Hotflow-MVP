<script>
    import Purchase from "$lib/Consumer/Purchase.svelte"
    export let purchases;
    export let purchaser_id;
</script>

<div id="container">
    {#each purchases as link_id }
        <Purchase link_id={link_id} purchaser_id={purchaser_id}/>
    {/each}
</div>

<style>
    #container{
        width:fit-content;
        margin:0 auto;;
        border: 3px soldi black;
    }
</style>