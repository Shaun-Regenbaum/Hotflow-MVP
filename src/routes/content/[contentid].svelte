<script context="module">
	import { getURLfromName } from '$lib/urls/getURL.js';

	let url;
	export async function load({ page, session, context }) {
		const result = await getURLfromName(page.params.contentid);
		if (result.status) {
			url = result.body[0].url;
		} else {
		}

		return result;
	}
</script>

<script>
	import Login from '$lib/Login.svelte';
	import Pay from '$lib/Pay.svelte';

	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

<Login />
<Pay />
<iframe title="iframe" id="monetized" style={blur} src={url} frameBorder="0" />

