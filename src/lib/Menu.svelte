<!-- 
    This component is designed for the overlay of when a user is looking at content.
    It's structure has three parts:
    1) A header where if the user is logged in, well put info related to the content at hand
    2) A slot for a component to be provided from outside this component
    3) Navigation for if there are multiple components we want the user to be able switch between

 -->

<script>
    // We will have a list where a list item is created for each component
    export let current_component;
    export let items = ["No Menu Options!"]
    export let name = "Mr. Anonymous"
</script>

<section>
    <div id="menu">
        <section>
            <div id="creator">
                <div id="picture"></div>
                <p id="name"> {name} </p>
            </div>
        </section>
        <section>
            <div id="card">
                <svelte:component this={current_component}/>
            </div>
        </section>
        <section>
            <nav>
                {#each items as item}
                    <li style="display: inline;">{item}</li>
                {/each}
            </nav>
        </section>
    </div>
</section>
<style>
    #menu{

        /* Positioning: */
        position: absolute;
        z-index: 2;
        bottom: 0;
        right: 10%;
        padding-bottom: 20px;


        /* Grid Layout: */
        display: grid;
        grid-template-rows: 20% 70% 10%;

        /* Size of Container: */
        width: 40%;
        max-width: 50%;

        /* Colors: */
        background-color: #85ffbe20; /* Fallback for older browsers */
        background-image: linear-gradient(45deg, #85ffbe20, #fffb7d20);

        /* To round the top two corners: */
        border-radius: 40px 40px 0 0;
    }
    #creator{
        /* Size of container: */
        height: 100%;
        /* Grid Layout: */
        display: grid;
        grid-template-columns: 20% 80%;
    }

    #picture{
        /* To make a perfect square: */
        width: 50%;
        height: 0;
        padding-top: 50%;
        /* To make the square circular: */
        border-radius: 50%;

        /* To center it: */
        margin: 0 auto; 
        margin-top: 10%;
        margin-bottom: 10%;

        /* Colors: */
        background: linear-gradient(30deg, rgba(2, 0, 36, 0.842) 0%, rgba(9, 9, 121, 0.644) 35%, rgba(0, 213, 255, 0.527) 100%);
    }

    #name{
        /* To center: */
        margin: auto 0; 
    }

    #card{
        /* To give padding: */
        padding: 3%;
    }

    nav {
        /* To make menu evely spaced: */
        display:flex;
        align-items: stretch;
        justify-content: space-around;
    }
</style>