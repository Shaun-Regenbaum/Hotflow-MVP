<script>
	import Home from '$lib/Consumer/Home.svelte'
	import Blurb from '$lib/Creator/Blurb.svelte'
	import Login from '$lib/Login.svelte'
	import Transaction from '$lib/Transaction.svelte'
</script>

<div class="testing">
	<Blurb/>
</div>
<br>
<div class="testing">
	<Home/>
</div>


<style>
	.testing {
		background: rgba(0, 128, 0, 0);
		padding: 1rem;
		border: 4px solid rgb(248, 233, 20);
		overflow: auto;
		resize: both;
	}
</style>
