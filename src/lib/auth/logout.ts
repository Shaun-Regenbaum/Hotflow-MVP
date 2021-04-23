import * as api from '$lib/backendlessAPI';

/** This function initiates the call to logout a user
 * NOTE: This only logouts on the backend.
 * TODO: Make sure we have a way to notify all logged in sessions that a user has logged out.
*/
export async function logout(token:string) {
	const path:string = 'users/logout';

	// Making the call:
	await api.get(path, token);
}
