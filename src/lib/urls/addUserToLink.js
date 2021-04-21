import * as api from '$lib/backendlessAPI.js';

// We add a given user to the list of users who have purchased/have acess to a given link
export async function addUserToLink(linkId, userId, userToken) {
    // We need the path, data, and associated userToken for the call:
    const path = 'data/embeds/' + linkId + '/purchases:Users:n'
    const data = [userId]
    const token = userToken
 
    // Making the call:
    const response = await api.put(path, data, token);
    // Checking to see if it was a success
    let responseStatus = response.url ? true : false
    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}




