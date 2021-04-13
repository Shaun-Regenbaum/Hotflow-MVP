import * as api from '$lib/api.js';

export async function get({ params, context }) {
	const { account } = await api.get(`accounts/${params.user}`, context.user && context.user.token);

	return {
		body: account
	};
}
