const appID: string = 'A8D2B6D2-9B17-5895-FF17-30E5A6049800';
const restID: string = '65E6C81A-5B7F-4F1E-91AC-4BF1863C83B3';
/**The base is what we append our resource locations to fetch data from our backend, which in our case is backendless */
const base: string = `https://api.backendless.com/${appID}/${restID}`;


/**This is the info we supply to make the call to the backend */
type CallInfo = {
	/**This can be either get, put, post, or del */
	method: string;
	/**This is the path of the resources we want */
	path: string;
	/**If we are saving data to the backend, we will usually supply it here */
	data?: object;
	/**If we are doing something that is associated with a user, or requires auth, then we will supply that auth token here */
	token?: string;
}

/**
 * This funciton sets up a call to the Backendless API
 * @param {CallInfo} callInfo
 * You can input method, path, data, and a user token for auth
 */
async function send(info: CallInfo): Promise<any> {
	let options: RequestInit = { method: info.method, headers: {} };
	let body: BodyInit = JSON.stringify(info.data);

	if (info.data) {
		options.headers['Content-Type'] = 'application/json';
		options.body = body;
	}
	if (info.token) {
		options.headers['user-token'] = info.token;
	}

	// Check to see if we need Server or Client-Side Fetch:
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);

	// The call will either be a success or failure:
	let result = fetch(`${base}/${info.path}`, options);
	return result
		.then((r: { text: () => any }) => r.text())
		.then((json: string) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

// The main types of calls we can do:

/**
 * This function retrieves a resource from the backend
 * @param {string} path
 * Where is the desired resource?
 * @param {string} token
 * 	Optional: what is the associated user for this request?
 */
export function get(path: string, token?: string) {
	return send({ method: 'GET', path, token });
}

/**
 * This function deletes a resource in the backend
 * @param {string} path
 * Where is the resource?
 * @param {string} token
 * 	Optional: what is the associated user for this request?
 */
export function del(path: string, token?: string) {
	return send({ method: 'DELETE', path, token });
}

/**
 * This function creates or checks a resource in the backend
 * This should be used one time per session for a given resource
 * @param {string} path
 * Where is the resource?
 * @param {object} data
 * What is the data to save?
 * @param {param} token
 * Optional: what is the associated user for this request?
 */
export function post(path: string, data: object, token?: string) {
	return send({ method: 'POST', path, data, token });
}

/**
 * This function can create or check a resource in the backend
 * This can be used many times per session for a given resource
 * @param {string} path
 * Where is the resource?
 * @param {object} data
 * What is the data to save?
 * @param {param} token
 * Optional: what is the associated user for this request?
 */
export function put(path: string, data?: object, token?: string) {
	return send({ method: 'PUT', path, data, token });
}
