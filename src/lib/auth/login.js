import * as api from '$lib/api.js';

export async function login(email, password) {
    const data = {
		"login": email,
		"password": password,
	}
    const path = 'users/login'
    const response = await api.post(path, data);
    let responseStatus = response && response.status === 200 && response.statusText === 'OK';
	return { status: responseStatus, body: await response };
}

