<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Login from '$lib/Login.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte'
</script>

<div class="testing">
	<Lend />
</div>
<br />
<div class="testing">
	<Details />
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
