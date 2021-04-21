import * as api from '$lib/backendlessAPI.js';
import * as apiSQR from '$lib/sqaureAPI.js';

import { getObjectIdfromName } from '$lib/urls/getURL.js';

export async function createPayment(amount, url, token) {
	// We just need the path and amount to create the charge:
	const path = 'data/payments';
	const data = {
    "amount": amount,
	};

	// Making the call:
	const response = await api.get(path, data);

	// Checking to see if it was a success
	let responseStatus = response.url ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
