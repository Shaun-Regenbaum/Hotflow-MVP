import * as api from '$lib/backendlessAPI.js';

export async function logout(userToken) {
     // We need the path and userToken for the call:
	const path = 'users/logout'
	const token = userToken

    // Making the call:
    await api.get(path, token);
}

