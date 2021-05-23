<!-- @component
	PROPERTIES:

		1) picture -> the picture to show for the consumer(NOT IMPLEMENTED).
		2) name -> name of user.
	DESCRIPTION:

	This components contains the most basic information about a user.
 -->
<script lang='ts'>
	import { onMount } from 'svelte';
	import { Profile } from '$lib/Docs/types';
	import { getProfile } from '$lib/Endpoints/profile';
	export let userId;
	export let name = 'Mr. Anonymous';

	onMount(async () => {
		const profile: Profile = await getProfile(userId);
		name = profile.name;
	});
</script>

<body id="container">
	<section id="picture" />
	<section class="account_detail">{name}</section>
</body>

<style>
	ß :root {
		--pic-length: 50px;
	}
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

	section {
		padding: 10px;
		margin: 10px;
	}

	#picture {
		/* Picture Size and shape: */
		width: var(--pic-length);
		height: var(--pic-length);
		border-radius: 100%;
		background-color: var(--bg);

		/* Nuero: */
		box-shadow: var(--divot);
	}
	.account_detail {
		align-self: center;

		/* Nuero: */
		box-shadow: var(--divot);
		border-radius: 20px;
	}
</style>
