<!-- @page
    This page is designed to imitate a new user landing on the page:
 -->
<script>
	import Menu2 from "$lib/Menu2.svelte"
	import Home from "$lib/Consumer/Home.svelte"
    let existing = false;
    	// Checking to see if you are logged in:
	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>


<Menu2>
	<Home/>
</Menu2>
<iframe title="iframe" id="monetized" style={blur} src="\landing" frameBorder="none" />

<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
