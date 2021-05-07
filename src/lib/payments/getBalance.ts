import * as api from '$lib/backendlessAPI';

export async function getBalance(objectId: string, token: string) {
	// We just need the path and id of object for get call:
	const path = `users/${objectId}?props=balance`;

	// Making the call:
	const response = await api.get(path, token);

	// Checking to see if it was a success
	let responseStatus = response.url ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
