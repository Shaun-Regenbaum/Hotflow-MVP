export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
    }
    const json = JSON.stringify(body["user-token"]);
	const value = json
	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}