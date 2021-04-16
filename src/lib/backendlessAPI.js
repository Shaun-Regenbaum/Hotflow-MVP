import { compute_rest_props } from 'svelte/internal'


const appID = "A8D2B6D2-9B17-5895-FF17-30E5A6049800"
const restID = "65E6C81A-5B7F-4F1E-91AC-4BF1863C83B3"
const base = 'https://api.backendless.com/' + appID +'/' + restID
async function send({ method, path, data, token }) {

	// Variables for API Call:
	const url = base + '/' + path
	let options = { method, headers: {} };

	// If we have data, add it to the call:
	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	// If we have a token, add it to the call:
	if (token) {
		options.headers['user-token'] = token;
	}
	console.log(url, options)

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
			console.log(json)
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
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