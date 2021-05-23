<script lang='ts'>
	import { onMount } from 'svelte';
	import { Profile } from '../Docs/types';
	import { getProfile } from '../Endpoints/profile';

	export let balance = 0;
	export let userId;

	onMount(async () => {
		if(userId) {
			const profile: Profile = await getProfile(userId);
			balance = profile.balance
		}
	});
</script>

<body id="container">
	<div id="balance">
		<p>${Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
	</div>
</body>

<style>
	#container {
		/* Layout */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		/* Positioning: */
		justify-content: flex-start;
		min-width: 200px;
		margin-left: 30px;
	}
	#balance {
		align-self: center;

		/* Nuero: */
		box-shadow: var(--divot);
		border-radius: 20px;
	}
</style>
