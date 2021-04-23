import * as api from '$lib/backendlessAPI';

// This only logouts on the backend, we have to make sure we have a way to notify all logged in sessions that a user has logged out.
export async function logout(userToken) {
	// We need the path and userToken for the call:
	const path = 'users/logout';
	const token = userToken;

	// Making the call:
	await api.get(path, token);
}
