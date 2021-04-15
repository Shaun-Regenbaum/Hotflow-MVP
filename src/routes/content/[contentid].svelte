<script context="module">
	let url;
	import { getLink } from '$lib/db/getlink.js';
	export async function load({ page }) {
		const result = await getLink(page.params.contentid)
		console.log(result)
		if (result.status){ 
			url = result.body.data.url
    } else{message = result.body.data.message}
		
		return result
	}
</script>
<iframe
	title="iframe"
	id="monetized"
	style="	width: 100%;
	height:100vh;"
	src={url}
	/>