<script>
    import Login from '$lib/Login.svelte'
    import Logout from '$lib/Logout.svelte'
    import Menu from '$lib/Menu.svelte'
    import Refund from '$lib/Refund.svelte'
    import Transaction from '$lib/Transaction.svelte'
    import Welcome from '$lib/Welcome.svelte'
    import New from '$lib/Creator/New.svelte'
    import Form from '$lib/Creator/Form.svelte'
    import Home from '$lib/Consumer/Home.svelte'
    import Recharge from '$lib/Consumer/Recharge.svelte'
    import Offerings from '$lib/Landing/Offerings.svelte'
</script>
<h1>Raw Components:</h1>
<div>
    <Login/>
</div>
<div>
    <Logout/>
</div>
<!-- <div>
        <Menu/>
</div> -->
<div>
    <Refund/>
</div>
<div>
    <Transaction/>
</div>
<div>
    <Welcome/>
</div>
<div>
    <New/>
</div>
<div>
    <Form/>
</div>
<div>
    <Home/>
</div>
<div>
    <Recharge/>
</div>
<div>
    <Offerings/>
</div>


<style>
    div{
        resize: both;
        margin: 15px;
        padding:20px;
        border: 4px solid rgb(248, 233, 20);
    }
</style>