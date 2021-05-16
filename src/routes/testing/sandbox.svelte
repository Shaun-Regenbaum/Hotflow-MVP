<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Login from '$lib/Login.svelte';
	import Transaction from '$lib/Consumer/Transaction.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Prompt from '$lib/New_Consumer/Prompt.svelte';
</script>

<div class="testing">
	<Prompt />
</div>
<br />
<div class="testing">
	<Details />
</div>
<div class="testing">
	<Blurb />
</div>
<div class="testing">
	<Login />
</div>
<div class="testing">
	<Transaction />
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
