import * as api from '$lib/backendlessAPI';

import { getObjectIdfromName } from '$lib/urls/getURL.js';

// This function creates a purchase, this purchase has an owner and it says what links they purchased.
// A purchase is essentially adding a site to the history of a user.
export async function createPurchase(amount, name, token) {
	// We need the path, amount to create the purchase:
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

	// Adding the relation
	const response2 = await api.put(path2, data2, token);
	console.log(response2);
	return response2;
}
