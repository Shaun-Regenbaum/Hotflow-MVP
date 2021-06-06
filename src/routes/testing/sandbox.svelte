<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Balance_Card from '$lib/Consumer/Balance_Card.svelte';
	import Menu from '$lib/Menu.svelte'

	import Purchase from '$lib/Consumer/Purchase.svelte';
	import History from '$lib/Account/History.svelte';

	let purchases = ["17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007","17711384-b0ca-4804-850c-977802d16007"]
</script>

<div class="testing">
	<Purchase link_id={"17711384-b0ca-4804-850c-977802d16007"}/>
</div>
<br />
<div class="testing">
	<Balance_Card price={200} />
</div>
<br />

<Menu>
	<Blurb/>
	<p>Get an instant refund if you don't like Mr. Anonymous's content.</p>
	<Balance_Card price={100}/>
	<History purchases={purchases}/>
</Menu>

<style>
	.testing {
		background: rgba(0, 128, 0, 0);
		padding: 1rem;
		border: 4px solid rgb(248, 233, 20);
		overflow: auto;
		resize: both;
	}
</style>
