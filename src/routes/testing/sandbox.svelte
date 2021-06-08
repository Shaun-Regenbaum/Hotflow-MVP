<script>
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Balance_Card from '$lib/Consumer/Card.svelte';
	import Menu from '$lib/Menu.svelte';

	import Purchase from '$lib/Consumer/HistoryItem.svelte';
	import History from '$lib/Account/History.svelte';
	import LinkAnalytics from '$lib/Account/LinkAnalytics.svelte';
	import Withdraw from '$lib/Account/Withdraw.svelte';

	let purchases = [
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007',
		'17711384-b0ca-4804-850c-977802d16007'
	];
</script>

<div class="testing">
	<Withdraw />
</div>
<br />
<div class="testing">
	<Balance_Card price={200} />
</div>
<br />

<Menu>
	<LinkAnalytics owned={purchases} />
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
