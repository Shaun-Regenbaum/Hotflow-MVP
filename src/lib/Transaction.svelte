<script>
    export let price = 100;
    export let brand = "Anonymous"
</script>

<div id="notification">
    <section id="price">
        <p>Amount: ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
    </section>
    <section id="brand">
        <p>{brand}</p>
    </section>
    <button id="refund">Refund</button>
</div>

<style>
    /* Mobile-First: */
    #notification{
        /* Positioning and Sizing: */
        min-width: 335px;
        max-width: 400px;
        display: flex;

        /* Nueromorphic: */
        box-shadow: var(--button);
        border-radius: 5px 25px 5px 5px;


    }
    section{
        /* Keeping the different sections seperate: */
        padding-left: 5px;
        padding-inline: 5px;
        /* Animations: */
        transition: all 0.2s ease;
    }

    p{ 
        padding: 10px;
        border-radius: 15px;
        box-shadow: var(--divot);
    }

    button{
            margin: 13px 0px 18px 7px;
            font-size: 16px;

    }
    /*Tablet:  */
    @media (min-width: 700px) {
        #notification{
        /* Positioning and Sizing: */
        min-width: 430px;
        display: flex;
        font-size: 20px;

        /* Nueromorphic: */
        box-shadow: var(--button);
        border-radius: 5px 25px 5px 5px;

        }
        button{
            margin: 17px 0px 22px 7px;
            font-size: 20px;
            padding-top: 10px;
        }
        section{
        /* Keeping the different sections seperate: */
        padding-left: 10px;
        padding-inline: 10px;
        /* Animations: */
        transition: all 0.2s ease;
        } 
    }


    /* 333RX4WA */

</style>