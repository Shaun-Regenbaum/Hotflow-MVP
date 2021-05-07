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
	userToken?: string | undefined;
};
