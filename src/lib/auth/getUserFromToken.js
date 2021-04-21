import * as api from '$lib/backendlessAPI.js';

// This functions gets user properties from usertokenId:
export async function getURLfromName(o) {
	// We just need the path and id of object for get call:
	const path = 'data/embeds?where=title%20%3D%20%27' + title + '%27';

	// Making the call:
	const response = await api.get(path);

	// Checking to see if it was a success
	let responseStatus = response[0].url ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
