<script context="module">
	import supabase from '$lib/db';
	export async function load({ page }) {
		const brand = page.params.brand;
		const title = page.params.title;
		let { data, error } = await supabase
			.from('links')
			.select('link')
			.eq('brand', brand)
			.eq('title', title);

		if (data) {
			return {
				props: {
					link: data[0].link
				}
			};
		}
		return {
			message: error.message
		};
	}
</script>

<script>
	export let link = 'https://nocodeneeded.com/shaun';
	export let message = '';

	let permission = false;
	let blur = permission
		? 'width: 100%; height: 100vh;'
		: 'width: 100%; height: 100vh; filter: blur(0.3rem);';
</script>

<iframe title="iframe" id="monetized" style={blur} src={link} frameBorder="none" />
<p>{message}</p>

<style>
	#monetized {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
