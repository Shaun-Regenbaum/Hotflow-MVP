<script>
	import { logout } from '$lib/auth/logout';
	import { browser } from '$app/env';
	import { session } from '$app/stores';
import { time_ranges_to_array } from 'svelte/internal';

	export let pos = 'inherit';

	async function submitLogout() {
		let token;
		if (browser) {
			console.log('cleared')
			token = localStorage.getItem('user-token');
			localStorage.clear();
		}
		await logout(token);
		$session = false;
	}
</script>
<form>
	<fieldset>
			<button on:click={submitLogout} style="position: {pos}; z-index: 2;">Logout</button>
	</fieldset>

</form>
