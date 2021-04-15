<script context="module">
	export async function load({ page, fetch, session, context }) {
		const url = `/content/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					content: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>