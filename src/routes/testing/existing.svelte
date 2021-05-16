<script>
    let existing = true;
    	// Checking to see if you are logged in:
	let permission = true;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

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
