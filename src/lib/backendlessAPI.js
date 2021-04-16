const appID = 'A8D2B6D2-9B17-5895-FF17-30E5A6049800'
const restID = '9964E6B0-B7BB-4355-9549-60C45FCDEBB1'
const base = 'https://api.backendless.com/' + appID +'/' + restID

async function send({ method, path, data, token }) {

	// Variables for API Call:
	const url = base + '/' + path
	let options = { method: method, headers: {} };
	let response;

	// If we have data, add it to the call:
	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.data = data;
	}
	// If we have a token, add it to the call:
	if (token) {
		options.headers['user-token'] = token;
	}

	// Check to see if we need Server or Client-Side Fetch:
		const fetch = typeof window !== 'undefined'
			? window.fetch
		: await import('node-fetch').then((mod) => mod.default);
	
	// The call will either be a success or failure:
	try {
		console.log(url, options)
		response = await fetch(url, options);

	}
	catch (error) {
		response = error.response;
		console.error(response)
	}
	console.log(response)
	return response;
}

// The main types of calls we can do:
export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}