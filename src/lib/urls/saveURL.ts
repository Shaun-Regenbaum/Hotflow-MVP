import * as api from '$lib/backendlessAPI';

type urlResult = {
	created: number;
	objectId: string;
	ownerId: string;
	url: string;
	title?: string;
	updated?: string;
};

/**This is the data that backendless takes to save a url for future embeds*/
type urlData = {
	/**This can either be a phone number or an email*/
	url: string;
	title?: string;
};

/**This is the data that backendless takes to save a url for future embeds*/
export async function saveURL(url: string, title: string, token: string) {
	const path: string = 'data/embeds';
	const data: urlData = {
		url: url,
		title: title
	};

	// Making the call:
	const response: urlResult = await api.post(path, data, token);
	// Checking to see if it was a success
	let responseStatus: boolean = response.url ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
