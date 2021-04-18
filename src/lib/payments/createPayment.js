import * as api from '$lib/sqaureAPI.js';


export async function createPayment(amount) {
    // We just need the path and amount to create the charge:
    const path  = 'v2/payments'
    const data =  {
    "amount_money": {
      "amount": amount,
      "currency": "USD"
    },
    "idempotency_key": "9dd408bf-983b-4a2d-acbf-33f32aad4c7d",
    "source_id": "cnon:card-nonce-ok"
  }
  
    // Making the call:
    const response = await api.get(path, data);

     // Checking to see if it was a success
    let responseStatus = response.url ? true : false
    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}