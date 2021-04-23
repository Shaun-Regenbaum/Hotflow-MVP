import * as api from '$lib/backendlessAPI';
import { getBalance } from '$lib/payments/getBalance';

export async function update_balance(amount, objectId, add = true, userToken) {
	// We need the path, objectID, data, and associated userToken for the call:
	const path = 'users/balance';
	let balance = await getBalance(objectId);
	let newBalance = add ? balance.body + amount : balance.body - amount;
	const data = { balance: newBalance };
	const token = userToken;

	// Making the call:
	const response = await api.post(path, data, token);
	// Checking to see if it was a success
	let responseStatus = response.url ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
