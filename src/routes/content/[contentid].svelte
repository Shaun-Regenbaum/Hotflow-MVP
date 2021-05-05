<script context="module">
	/* In this script we are getting two things before rendering the page:
	1) We are getting the user info, if they are logged in.
	2) We are getting the url info associated with the content they want
	*/
	import { getFromTitle } from '$lib/urls/getURL';
	import { browser } from '$app/env';
	export async function load({ page }) {

		let url;
		let user = {};

		if (browser) {
			user.objectId = localStorage.getItem('userID');
			user['user-token'] = localStorage.getItem('user-token');
			user.name = localStorage.getItem('name');
		}

		const result = await getFromTitle(page.params.contentid);
		console.log(result)
		if (result.status) {
			url = result.body.url;
		}
		return {
		props: { url, user }
		}
	};
</script>


<script>
	import Menu from '$lib/Menu.svelte';
	import Logout from '$lib/Buttons/Logout.svelte';
	import Login from '$lib/Login.svelte';
	import Pay from '$lib/Pay.svelte';

	const component_list = ["Login"]
	let currentComponent = Login;


	import { session } from '$app/stores';

	export let url;
	export let user = {};

	// Checking to see if you are logged in:
	if (browser) {
		$session.user = user.name ? user : false;
	}
	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';

</script>


<Menu items={component_list} current_component={currentComponent}/>

<iframe title="iframe" id="monetized" style={blur} src={url} frameBorder="0" />
