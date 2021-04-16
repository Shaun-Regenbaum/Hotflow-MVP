// We are using the linkpreview.net API
// It only does one thing, which is which, the whole call is in this file.
const key = '7e294e628f4ccb8edc21e505bd9af9ec'
const base = 'http://api.linkpreview.net/?key=' + key;

export async function getPreview({ link }) {
	// Variables for API Call, it is always going to be GET in this case:
	const url = base + '&q=' + link
    let options = { method: 'GET', headers: {} };
	let response;

	// Check to see if we need Server or Client-Side Fetch:
		const fetch = typeof window !== 'undefined'
			? window.fetch
		: await import('node-fetch').then((mod) => mod.default);
	
	// The call will either be a success or failure:
	try {
		response = await fetch(url, options);
	}
	catch (error) {
		response = error.response;
		console.error(response)
    }
    
    let responseStatus = response && response.status === 200 && response.statusText === 'OK';
    return { status: responseStatus, body: await response };
}