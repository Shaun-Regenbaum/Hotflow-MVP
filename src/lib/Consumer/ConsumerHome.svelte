<script>
    import supabase from '$lib/db'
    import Profile from '$lib/Consumer/Profile.svelte'
    import {getProfile} from '$lib/Endpoints/profile'
    import { onMount } from 'svelte';
    let userName = "...";
    let userBalance = 0;

    onMount(async function () {
		const user = supabase.auth.user();
		if (user) {
			// We are using .then here to improve load times allowing us to not wait for it to resolve.
			getProfile(user.id).then(function (result) {
				userBalance = result.balance;
				userName = result.name;
			});
        }
	});
</script>

<div id="container">
    <Profile name={userName}/>
</div>