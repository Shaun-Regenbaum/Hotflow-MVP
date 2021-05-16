/** This File just contains types for my main components, to make it easier and simpler to see what they are calling
 *
 */

/**This is the user info stored in local storage */
export type User = {
	/**This is the name of user */
	name?: string | undefined;
	/**This is the uuid of the user in the database to reference */
	userId?: string | undefined;
	/**This is the session token for the user for permissions*/
	token?: string | boolean;
};

export type LoadInput = {
	page: {
		host: string;
		path: string;
		params: Record<string, string | string[]>;
		query: URLSearchParams;
	};
	fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
	session: any;
	context: Record<string, any>;
};

export type LoadOutput = {
	status?: number;
	error?: Error;
	redirect?: string;
	props?: Record<string, any>;
	context?: Record<string, any>;
	maxage?: number;
};
