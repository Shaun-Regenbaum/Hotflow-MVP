<script>
    // Consumer:
	import HistoryItem from '$lib/Consumer/HistoryItem.svelte';
    import Profile from '$lib/Consumer/Profile.svelte';
    // Creator:
    import LinkAnalytics from '$lib/Creator/LinkAnalytics.svelte';

</script>
<h1>Atomic Elements:</h1>
<br>
<button>Default</button>
<br>
<br>
<input type="text" placeholder="placeholder" />
<br>
<br>
<HistoryItem/>
<br>
<br>
<Profile/>
<br>
<br>
<LinkAnalytics/>

