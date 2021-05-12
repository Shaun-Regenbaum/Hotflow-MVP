<script>
	import Home from '$lib/Consumer/Home.svelte'
	// import New from '$lib/Creator/New.svelte';
	import Login from '$lib/Login.svelte';
	// import Welcome from '$lib/Welcome.svelte'
</script>

<div class="testing">
	<Home/>
</div>
<br>
<div class="testing">
	<Login/>
</div>


<style>
	.testing {
		background: rgba(0, 128, 0, 0);
		padding: 1rem;
		border: 4px solid rgb(248, 233, 20);
		overflow: auto;
		resize: both;
	}
</style>
