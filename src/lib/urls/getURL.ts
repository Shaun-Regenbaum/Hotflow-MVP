import * as api from '$lib/backendlessAPI';

type urlResult = {
	created: number;
	objectId: string;
	ownerId: string;
	title?: string;
	updated?: string;
	url: string;
}



// This functions gets the url of the iframe from the name of the landing page
export async function getFromTitle(title: string) {
	const path = `data/embeds?where=title%20%3D%20%27${title}%27`;

	// Making the call:
	const response:[urlResult] = await api.get(path);
	console.log(response)
	// Checking to see if it was a success
	let responseStatus:boolean = response[0].url ? true : false;

	return { status: responseStatus, body: response };
}

// This functions gets the url of the iframe from the objectId
export async function getFromObjectId(objectId:string) {
	const path:string = `data/embeds/${objectId}`;

	const response:[urlResult] = await api.get(path);

	let responseStatus:boolean = response.url ? true : false;

	return { status: responseStatus, body: response[0] };
}
