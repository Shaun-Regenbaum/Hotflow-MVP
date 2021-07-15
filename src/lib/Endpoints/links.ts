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

/**
 * Determine if a url is a googledoc
 * @param {string} url
 * @returns {boolean} true or false
 */
export function isGoogleDoc(url: string): boolean {
	return url.indexOf('docs.google.com') > -1;
}

/** 
 * Determine if a link is from youtube
 * then if its not in embed form, return the embed url
 * @param {string} url
 * @returns {string} url
*/
export function youtubeEmbed(url: string): string {
	if (url.indexOf('youtube.com') > -1) {
		return url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
	} else if (url.indexOf('youtu.be') > -1) {
		return url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
	} else {
		return url;
	}
}