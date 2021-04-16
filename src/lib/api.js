import axios from 'axios'
const base = 'https://api.backendless.com/A8D2B6D2-9B17-5895-FF17-30E5A6049800/9964E6B0-B7BB-4355-9549-60C45FCDEBB1';

async function send({ method, path, data, token }) {

	const url = base + '/' + path
	let options = { method: method, headers: {} };
	options.url = url
	console.log("1")
	// Well update the value later, but we want to return something no matter what;
	let response;

	// If we are using POST, then we'll have some data
	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.data = data;
	}
	// If we provide a token add it to the request
	if (token) {
		options.headers['user-token'] = token;
	}

	console.log("2")


	try {
		
		console.log("3")
	}
	catch (error) {
		response = error.response;
		console.log("4", error)
	}
	// let responseStatus = response && response.status === 200 && response.statusText === 'OK';
	return response;
}

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