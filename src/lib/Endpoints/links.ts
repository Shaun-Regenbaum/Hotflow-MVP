import type { Profile } from '$lib/Docs/types';
import type { Link } from '$lib/Docs/types';
import supabase from '$lib/db'
/**
 * Get full data of a link
 * @param linkId - uuid of link
 * @returns {Promise<Link>}
 * @todo - Better Error Checking + Allow for calls for specific columns with Typesupport (will it improve performance?) 
 */
 export async function getLink(id: string): Promise<Link> {
	const { data, error } = await supabase.from('links').select().eq('id', id);
	if (data[0]) {
		return data[0];
	} else {
		console.dir(error)
		throw error;
	}
}