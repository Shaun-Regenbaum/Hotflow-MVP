import * as api from '$lib/backendlessAPI';
import { getFromTitle } from '$lib/urls/getURL';


/**This is the data that backendless takes to save a purchase*/
type purchaseData = {
	amount: number;
}

// This function creates a purchase, this purchase has an owner and it says what links they purchased.
// A purchase is essentially adding a site to the history of a user.
export async function createPurchase(amount:number, name:string, token:string) {
	// We need the path, amount to create the purchase:
	const path1:string = 'data/purchases';
	const data1:purchaseData = {
		amount: amount
	};

	// Making the call:
	const response1 = await api.post(path1, data1, token);
	const parentObjectId:string = response1.objectId;

	//Get object id of the embed:
	const response = await getFromTitle(name);
	const objectId: string = response.body[0].objectId;
	console.log(response)

	// We now want to add the relation to the link in the purchase
	const path2:string = `data/purchases/${parentObjectId}/link`;
	const data2: [string] = [objectId];


	// Adding the relation
	const response2 = await api.put(path2, data2, token);
	console.log(response2);
	return response2;
}
