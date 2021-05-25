/** This File just contains types for my main components, to make it easier and simpler to see what they are calling
 *
 */

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
	balance?: number;
	/**This is the name of the brand associated with a creator, if empty, they are not registered as a creator. */
	brand?: string;
	created_at?: string;
	name?: string;
	owned_links?: string[];
	purchased_links?: string[];
	updated_at?: string;
	user_id?: string;
};

/** This type is for a link that has been monetized by a creator*/
export type Link = {
	brand?: string;
	clicks?: number;
	created_at?: string;
	link_id?: string;
	owner_id?: string;
	payments?: number;
	price?: number;
	refunds?: number;
	title?: string;
	url?: string;
};

/** This type is for a given purchase/refund where one user gains or loses access to a link by sending some amount from one accout balance to another. */
export type Transaction_Record = {
	/**The amount of the purchase, only positive, subtraction/addition will be determined by transaction type. */
	amount?: number;
	created_at?: string;
	link_id?: string;
	purchaser_id?: string;
	/**UUID of invoker of purchase/refund, i.e. the person gaining or losing access to something. */
	seller_id?: string;
	transaction_id?: string;
	/**type of refund, can be either purchase or refund */
	type?: 'refund' | 'purchase';
};

/** This type is for a given purchase/refund where one user gains or loses access to a link by sending some amount from one accout balance to another. */
export type Withdrawal = {
	/**Any additional info: */
	additional_info?: string;
	/**amount the withdrawal is worth: */
	amount?: number;
	email?: string;
	/**Id, not a uuid, of the withdrawal itself. */
	withdrawal_id?: string;
	/**the identifier we should send the money through */
	identifier?: string;
	/**Name of provider we should send money through. */
	platform?: string;
};
