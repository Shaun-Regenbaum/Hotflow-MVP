<script>
	import { logout } from '$lib/auth/logout.js';
	import { browser } from '$app/env';
	import { session } from '$app/stores';


	if (browser) {
        let token;
		token = localStorage.getItem('user-token');
	}

	async function submitLogout(token) {
		await logout(token);
		$session = false;
		if (browser) {
			localStorage.clear();
			location.reload();
		}
	}
</script>

<button on:click={submitLogout}><h4>Logout</h4></button>
