const base = 'https://connect.squareupsandbox.com'
async function send({ method, path, data }) {

	// Variables for API Call:
	let options = { method, headers: {} };

	// If we have data, add it to the call:
	if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.header['Authorization'] = 'Bearer EAAAELzOhzx0FqiGsVzAJhBUVRSp5aQIAJzUhMNiZHTnxaPfTzYkRZc_lxElVapJ'
		options.body = JSON.stringify(data);
	}

	// Check to see if we need Server or Client-Side Fetch:
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);
	
	// The call will either be a success or failure:
	let result = fetch(`${base}/${path}`, options);
	return result
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

// The main types of calls we can do:
function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

