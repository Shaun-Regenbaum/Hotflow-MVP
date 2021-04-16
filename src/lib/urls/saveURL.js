import * as api from '$lib/backendlessAPI.js';

export async function saveLink(url, userToken) {
    // We need the path, data, and associated userToken for the call:
    const path = 'data/embeds'
    const data = { "url" : url }
    const token = userToken
 
    // Making the call:
    const response = await api.post(path, data, token);
    // Checking to see if it was a success
    let responseStatus = response.url ? true : false
    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}




