import supabase from '$lib/db';
import type { Profile } from '$lib/Docs/types';

/**
 * Set a user balance to 40 when a user first registers.
 * @param user_id - uuid of the new user.
 * @returns hopefully returns nothing.
 */
export async function lend40(user_id: string): Promise<void> {
	supabase.rpc('update_balance', { amount: 40, user_id: user_id });
}

/**
 * Check if a given user has permission to see a given link
 * Either because he is the owner or because he purchased.
 * @param link_id - uuid of link
 * @param user_id - uuid of user
 * @returns {Promise<boolean>}
 * @todo - Better Error Checking
 */
export async function checkOwnership(link_id: string, user_id: string): Promise<boolean> {
	try {
		let { purchased_links } = await getProfile(user_id, 'purchased_links');
		let { owned_links } = await getProfile(user_id, 'owned_links');

		if (purchased_links == null) {
			purchased_links = [];
		}
		if (owned_links == null) {
			owned_links = [];
		}
		return (purchased_links.includes(link_id)||owned_links.includes(link_id));
	} catch (error) {
		console.dir(error);
		throw error;
	}
}

/**
 * Check if a given user is the creator of a given link.
 * @param link_id - uuid of link
 * @param user_id - uuid of user
 * @returns {Promise<boolean>}
 * @todo - Better Error Checking
 */
 export async function checkCreatorship(link_id: string, user_id: string): Promise<boolean> {
	try {
		let { owned_links } = await getProfile(user_id, 'owned_links');

		if (owned_links == null) {
			owned_links = [];
		}
		return (owned_links.includes(link_id));
	} catch (error) {
		console.dir(error);
		throw error;
	}
}

/**
 * Get full profile of a user
 * @param userId - uuid of user
 * @param column_name - a specific column name, otherwise will default to '*' aka every column
 * @returns A profile or an error
 */
export async function getProfile(user_id: string, column_name?: string): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.select(column_name)
		.eq('user_id', user_id);
	// DEBUGGING:
	if (data) {
		return data[0];
	} else {
		console.dir(error);
		throw error;
	}
}


