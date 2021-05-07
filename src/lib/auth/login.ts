import * as api from '$lib/backendlessAPI';

/**This is the data that backendless sends when a user logs in*/
type LoginResult = {
	accountType: string;
	balance: number;
	blUserLocale: string;
	created: number;
	email: string;
	lastLogin: number;
	name: string;
	oAuthIdentities: string[];
	objectId: string;
	ownerId: string;
	socialAccount: string;
	updated: number;
	'user-token': string;
	userStatus: string;
	userType: string;
};

/**This is the data that backendless takes to log in a user*/
type LoginData = {
	/**This can either be a phone number or an email*/
	login: string;
	password: string;
};

/**This function initiates the call to login the user*/
export async function login(email: string, password: string) {
	const path: string = 'users/login';
	const data: LoginData = {
		login: email,
		password: password
	};

	// Making the call:
	const response: LoginResult = await api.post(path, data);

	// Checking to see if it was a success
	let responseStatus: boolean = response.objectId ? true : false;

	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
