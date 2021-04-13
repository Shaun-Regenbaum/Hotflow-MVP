import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post(request) {
    console.log(request)
	const body = await api.post('users/login', {
        "login": request.email,
        "password": request.password
	});
	return respond(body);
}