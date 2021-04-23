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
}

/**This is the data that backendless takes to register a user*/
type RegistrationData = {
	/**This can either be a phone number or an email*/
	email: string;
	password: string;
	name: string;
	userType?: string;
}

/**This function initiates the call to register a user*/
export async function register(name:string, email:string, password:string, userType:string = "Consumer") {
	const path:string = 'users/register';
	const data:RegistrationData = {
		email: email,
		password: password,
		name: name,
		userType: userType
	};

	// Making the call:
	const response:LoginResult = await api.post(path, data);

	// Checking to see if it was a success
	let responseStatus:boolean = response.email ? true : false;
	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response };
}
