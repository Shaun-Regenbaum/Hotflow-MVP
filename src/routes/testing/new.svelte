<!--
    This page is designed to imitate a new user landing on the page:
 -->
<script>
	import Menu2 from '$lib/Menu2.svelte';
	import Blurb from '$lib/Creator/Blurb.svelte';
	import Details from '$lib/New_Consumer/Details.svelte';
	import Login from '$lib/Login.svelte';
	import Lend from '$lib/New_Consumer/Lend.svelte';

	let brand = 'Anonymous Inc.';
	let price = 10;
	let title = 'The Adventures of Narnia';

	// Checking to see if you are logged in:
	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';

</script>

<Menu2>
	<section id="blurb">
		<Blurb {brand} />
	</section>
	<seciton id="details">
		<Details {price} {title} />
	</seciton>
	<section id="explanation">
		<Lend/>
	</section>
	<section id="login">
		<Login login_message={'Purchase'} register_message={'Purchase'} existing={false} />
	</section>
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
