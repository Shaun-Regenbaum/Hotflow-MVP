import * as api from '$lib/backendlessAPI';

export async function login(email: string, password: string) {
	// We need the path and login data for the call:
	const path = 'users/login';
	const data = {
		login: email,
		password: password
	};

	// Making the call:
	const response = await api.post(path, data);

	console.log(response);

	// Checking to see if it was a success
	let responseStatus = response.email ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
