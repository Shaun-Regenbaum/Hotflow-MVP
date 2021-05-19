import supabase from '$lib/db';
import type { Profile } from '$lib/Docs/types';
import type { PostgrestError, Response } from '$lib/Endpoints/apiTypes';

/**
 *
 * @param id - This function accepts a userId
 * @returns {string|PostgrestError}
 */
export async function lend(id: string) {
	const { data, error } = await supabase.from('profiles').update({ balance: '40' }).eq('id', id);

	console.log(data, error);
	if (data) {
		return 'Balance Updated';
	} else {
		return error;
	}
}

export async function checkOwnership(linkId: string, userId: string) {
	try {
		const fullProfile: Profile = await getProfile(userId);
		console.log(fullProfile);
		if (fullProfile.links == null) {
			fullProfile.links = [];
		}
		return fullProfile.links.includes(linkId);
	} catch (error) {
		return error;
	}
}

export async function getBalance(userId: string) {
	try {
		const fullProfile: Profile = await getProfile(userId);
		return fullProfile.balance;
	} catch (error) {
		return error;
	}
}
export async function getName(userId: string) {
	try {
		const fullProfile: Profile = await getProfile(userId);
		return fullProfile.name;
	} catch (error) {
		return error;
	}
}

async function getProfile(id: string) {
	const { data, error } = await supabase.from('profiles').select().eq('id', id);
	if (data[0]) {
		console.log;
		return data[0];
	} else {
		throw error;
	}
}
