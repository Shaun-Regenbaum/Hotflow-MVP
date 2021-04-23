import * as api from '$lib/backendlessAPI.js';
import * as apiSQR from '$lib/sqaureAPI.js';

import { getObjectIdfromName } from '$lib/urls/getURL.js';

export async function createPurchase(amount, name, token) {
	// We just need the path, amount, and data to create the purhcase:
	const path1 = 'data/purchases';
	const data1 = {
		amount: amount
	};

	// Making the call:
	const response1 = await api.post(path1, data1, token);
	console.log(response1);
	//Get object id of the embed:
	const siteId = await getObjectIdfromName(name);
	console.log(siteId);

	// We now want to add the relation to the link in the purchase
	const path2 = 'data/purchases/' + response1.objectId + '/link';
	const data2 = [siteId];

	const response2 = await api.put(path2, data2, token);
	console.log(response2)
	return response2;
}
