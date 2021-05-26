import type { Link } from '$lib/Docs/types';
import supabase from '$lib/db';
/**
 * Get full data of a link
 * @param link_id - uuid of link
 * @returns a promise containing either a link or an error
 */
export async function getLink(link_id: string): Promise<Link> {
	const { data, error } = await supabase.from('links').select().eq('link_id', link_id);
	if (data[0]) {
		return data[0];
	} else {
		console.dir(error);
		throw error;
	}
}
