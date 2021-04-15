import * as api from '$lib/api.js';

export async function getLink(objectId) {
    const retrievalId = objectId
    const path = 'data/embeds/' + retrievalId
    const response = await api.get(path);
    let responseStatus = response && response.status === 200 && response.statusText === 'OK';
	return { status: responseStatus, body: await response };
}
