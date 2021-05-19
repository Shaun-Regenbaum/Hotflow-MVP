<script>
    export let brand = "Anonymous Inc.";
    export let title = "My Story";
    export let price = 20;
</script>
<div id="container">
    
    <img src="../static/pdf.svg" alt="A PDF">
    <div class="item" id="brand">{brand}</div>
    <div class="item" id="title">{title}</div>
    <div class="item" id="price">${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</div>
</div>

<style>
    #container{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: start;
        padding-inline:1rem;

        min-width:250px; 
        max-width:500px;
        max-height: 3rem;
    
        border-radius: 10px;
        box-shadow: var(--divot);}

    .item{
        max-height:0.8rem;
        box-shadow: var(--divot);
        border-radius: 10px;
        margin: 5px;
        padding: 10px;
        white-space: nowrap;

        overflow: hidden;
    }

    img{
        min-width: 0.9rem;
        width:1.5rem;
    }

    #brand{
        min-width: 60px;
    }

    #title{
        min-width: 30px;
    }

    #price{
        min-width: 40px;
        color: var(--negative);
    }
</style>