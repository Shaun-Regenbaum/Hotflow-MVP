import supabase from '$lib/db';
import type { Profile } from '$lib/Docs/types';

/**
 * Set a user balance to 40 when a user first registers. 
 * @param userId - uuid of new user.
 * @returns {Promise<void>}
 * @todo - We may to avoid using await, but I think since its in an async function, it should have no impact on performance.
 */
export async function lend(userId: string): Promise<void> {
	const { data, error } = await supabase.from('profiles').update({ balance: '40' }).eq('id', userId);
	if (data) {
	} else {
		console.dir(error)
		throw error;
	}
}

/**
 * Check if a given user has permission to see a given link. 
 * @param linkId - uuid of link
 * @param userId - uuid of user
 * @returns {Promise<boolean>}
 * @todo - Better Error Checking
 */
export async function checkOwnership(linkId: string, userId: string): Promise<boolean> {
	try {
		const fullProfile: Profile = await getProfile(userId);
		if (fullProfile.links == null) {
			fullProfile.links = [];
		}
		return fullProfile.links.includes(linkId);
	} catch (error) {
		console.dir(error);
		throw error;
	}
}

/**
 * Get balance of a user's profile
 * @param userId - uuid of user
 * @returns {Promise<number>}
 * @todo - Better Error Checking
 */
export async function getBalance(userId: string):Promise<number> {
	try {
		const fullProfile:Profile = await getProfile(userId);
		return fullProfile.balance;
	} catch (error) {
		console.dir(error)
		throw error;
	}
}

/**
 * Get name of a user's profile
 * @param userId - uuid of user
 * @returns {Promise<string>}
 * @todo - Better Error Checking
 */
export async function getName(userId: string):Promise<string> {
	try {
		const fullProfile: Profile = await getProfile(userId);
		return fullProfile.name;
	} catch (error) {
		console.dir(error)
		throw error;
	}
}
/**
 * Get full profile of a user
 * @param userId - uuid of user
 * @returns {Promise<Profile>}
 * @todo - Better Error Checking + Allow for calls for specific columns with Typesupport (will it improve performance?) 
 */
export async function getProfile(id: string): Promise<Profile> {
	const { data, error } = await supabase.from('profiles').select().eq('id', id);
	if (data[0]) {
		return data[0];
	} else {
		console.dir(error)
		throw error;
	}
}
