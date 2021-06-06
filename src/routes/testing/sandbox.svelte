<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Balance_Card from '$lib/Consumer/Balance_Card.svelte';
	import Menu from '$lib/Menu.svelte'
</script>

<div class="testing">
	<Blurb />
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
