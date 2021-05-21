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

/** This type is for a given user's profile. */
export type Profile = {
	/**This is a UUID associated with the porfile, not the user. */
	profileId?: string;
	/**This is a UUID associated with the user, not the profile. */
	id?: string;
	/**This is the name of the brand associated with a creator, if empty, they are not registered as a creator. */
	brand?: string;
	name?: string;
	balance?: number;
	purchases?: string[];
	links?: string[];
	created_at?: string;
	updated_at?: string;
};

/** This type is for a link that has been monetized by a creator*/
export type Link = {
	id?: string;
	brand?: string;
	url?: string;
	ownerId?: string;
	price?: number;
	title?: string;
	payed?: number;
	clicks?: number;
	refunds?: number;
};

/** This type is for a given purchase/refund where one user gains or loses access to a link by sending some amount from one accout balance to another. */
export type Purchase = {
	/**UUID of the purchase itself. Has nothing to do with the participants, it is simply a way to reference a transaction. */
	purchaseId?: string;
	/**UUID of invoker of purchase/refund, i.e. the person gaining or losing access to something. */
	purchaserId?: string;
	/**UUID of the reciever of the purchase, i.e. the person selling something in the transaction. */
	sellerId?: string;
	/**UUID for the link that a given user is gaining/losing access to. */
	linkId?: string;
	/**The amount of the purchase, either positive for purchase or negative for refund. */
	amount?: number;
	/**true for a refund, false for a purchase */
	refunded?: boolean;
	created_at?: string;
	updated_at?: string;
};

/** This type is for a given purchase/refund where one user gains or loses access to a link by sending some amount from one accout balance to another. */
export type Withdrawal = {
	/**Id, not a uuid, of the withdrawal itself. */
	id?: number;
	/**Name of provider we should send money through. */
	provider?: string;
	/**amount the withdrawal is worth: */
	amount?: number;
	/**the identifier we should send the money through */
	identifier?: string;
	email?: string;
	/**Any additional info: */
	addn?: string;
};

