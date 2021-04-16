import * as api from '$lib/backendlessAPI.js';


export async function getLink(objectId) {
    // We just need the path and id of object for get call:
    const path = 'data/embeds/' + objectId
  
    // Making the call:
    const response = await api.get(path);

     // Checking to see if it was a success
    let responseStatus = response.url ? true : false
    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
