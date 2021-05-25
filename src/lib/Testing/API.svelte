<!-- This file is for testing our api calls in a safe environment: -->
<script lang="ts">
	import type { Profile } from '$lib/Docs/types';
	import { getProfile } from '$lib/Endpoints/profile';

	let column;
	let data = '';
	let user: Profile = {
		user_id: 'a6de1c1c-4038-4ad6-b885-77ee3b08c646'
	};

	async function getStuff() {
		data = JSON.stringify(await getProfile(user.user_id, column));
		console.log(data);
	}
</script>

<div id="container">
	<div class="testing">
		<h1>Get Profile:</h1>
		<label for="user_id">user_id:</label>
		<input type="text" name="user_id" bind:value={user.user_id} />
		<label for="column">column:</label>
		<input type="text" name="column" bind:value={column} />
		<button on:click={getStuff}>Test The Call</button>
	</div>
	<p>{data}</p>
</div>

<style>
	#container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
