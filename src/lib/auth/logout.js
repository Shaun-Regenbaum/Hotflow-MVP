import * as api from '$lib/backendlessAPI.js';
export async function logout(userToken) {
     // We need the path and userToken for the call:
	const path = 'users/logout'
	const token = userToken

    // Making the call:
    const response = await api.get(path, token);

    // Checking to see if it was a success
    let responseStatus = response && response.status === 200 && response.statusText === 'OK';

    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: await response };
}

