<script>
	// Consumer:
	import Purchase from '$lib/Consumer/Purchase.svelte';
	import Profile from '$lib/Consumer/Profile.svelte';
	import Balance from '$lib/Consumer/Balance.svelte';

	// Creator:
	import LinkAnalytics from '$lib/Creator/LinkAnalytics.svelte';

	//Admin:
	import WithdrawalRequest from '$lib/Admin/WithdrawalRequest.svelte';
</script>

<h1>Atomic Elements:</h1>
<br />
<button>Default</button>
<br />
<br />
<input type="text" placeholder="placeholder" />
<br />
<br />
<Purchase />
<br />
<br />
<Profile />
<br />
<br />
<Balance />
<br />
<br />
<LinkAnalytics />
<br />
<br />
<WithdrawalRequest />
