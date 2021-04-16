import * as api from '$lib/backendlessAPI.js';

export async function register(name, email, password, userType) {
	// We need the path and registration data for the call:
	const path = 'users/register'
	
	const data = {
		"email": email,
		"password": password,
		"name": name,
		"userType": userType
	}

	// Making the call:
	const response = await api.post(path, data);

    // Checking to see if it was a success
    let responseStatus = response.email ? true : false
    // Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
