export function create_load(endpoint) {
	return async ({ page, fetch }) => {
		const res = await fetch(`/account/@${page.params.user}/${endpoint}.json`);

		return {
			props: await res.json()
		};
	};
}
