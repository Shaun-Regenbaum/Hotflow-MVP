<script>
	import { logout } from '$lib/auth/logout';
	import { browser } from '$app/env';
	import { session } from '$app/stores';


	export let pos = 'inherit';
	

	async function submitLogout() {
		let token;
		if (browser) {
			token = localStorage.getItem('user-token');
		}
		await logout(token);
		$session = false;
		if (browser) {
			localStorage.clear();
			location.reload();
		}
	}
</script>

<button on:click={submitLogout} style="position: {pos}; z-index: 2;"><h4>Logout</h4></button>
