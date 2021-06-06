<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Deposit from '$lib/Account/Deposit.svelte';
</script>

<div class="testing">
	<Blurb />
</div>
<br />
<div class="testing">
	<Deposit />
</div>
<br />

<style>
	.testing {
		background: rgba(0, 128, 0, 0);
		padding: 1rem;
		border: 4px solid rgb(248, 233, 20);
		overflow: auto;
		resize: both;
	}
</style>
