// We should def incorporate this into the api.js but for now its fine.
export async function post(request) {
	const base = 'https://api.backendless.com/A8D2B6D2-9B17-5895-FF17-30E5A6049800/9964E6B0-B7BB-4355-9549-60C45FCDEBB1';
	const path = 'users/logout'
	const method = 'GET'
	const opts = { method, headers: {"user-token":request.userToken} };
    console.log(request)

	return fetch(`${base}/${path}`, opts)
	.then((r) => r.text())
	.then((json) => {
		try {
			return JSON.parse(json);
		} catch (err) {
			return json;
		}
	});
}