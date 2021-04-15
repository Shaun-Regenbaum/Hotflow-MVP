import * as api from '$lib/api.js';

export async function register(name, email, password, userType) {
	const data = {
		"email": email,
		"password": password,
		"name": name,
		"userType": userType
	}
	const path = 'users/register'
	const response = await api.post(path, data);

	let responseStatus = response && response.status === 200 && response.statusText === 'OK';
	return  { status: responseStatus, body: await response };
}
