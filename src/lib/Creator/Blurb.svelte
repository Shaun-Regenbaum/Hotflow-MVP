<script>
    export let name = "Mr. Anonymous"
</script>
<div id="container">
    <div id="picture"></div>
    <div id="name">{name}</div>
</div>

<style>
    :root{
        --pic-length: 50px;
    }
    #container {
        /* Grid Properties; */
        display: grid;
        grid-template-columns: 20% 80%;
        max-width: 400px;
        min-width: 200px;
    }
    #picture{
        /* Grid Placement: */
        grid-column: 1 2;

        /* Picture Size and shape: */
        width: var(--pic-length);
        height: var(--pic-length);
        border-radius: 100%;
        background-color: brown;
    }
    #name{
        /* Grid Placement: */
        grid-column: 2 3;

        /* Centering Text: */
        margin:auto;
    }


</style>