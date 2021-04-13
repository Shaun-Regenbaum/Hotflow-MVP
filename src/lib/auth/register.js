import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post(request) {
    console.log(request)
	const body = await api.post('users/register', {
		"email": request.email,
		"password": request.password,
		"name": request.name,
		"userType": request.userType
	});
	return respond(body);
}