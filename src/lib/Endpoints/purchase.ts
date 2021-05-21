import type { Purchase, Profile } from '$lib/Docs/types';
import type { Response } from '$lib/Endpoints/apiTypes';

import supabase from '$lib/db';
import { getProfile } from '$lib/Endpoints/profile';

/** 5 Parts:
 * 1) Creates purchase in db
 * 2) Subtracts from purchaser account balance
 * 3) Add to seller account balance
 * 4) Append purchase id to purcasheses array
 * 5) Append link id to the links array
 * @param {purchaserId} - uuid of purchaser
 * @param {sellerId} - uuid of seller
 * @param {linkId} - uuid of link
 * @param {price} - price of link
 * @return {void} - It will always succeed :)
 * @todo - Error Handling + Undoing previous calls on failure, may impact performance though, fix addPurchase and addLink
 */
export async function makePurchase(
	purchaserId: string,
	sellerId: string,
	linkId: string,
	price: number
): Promise<any> {
	try {
		let purchaser: Profile = await getProfile(purchaserId);
		const purchase: Purchase = await createPurchase({
			purchaserId: purchaserId,
			sellerId: sellerId,
			linkId: linkId,
			amount: price
		});
		const negative_amount: number = -1 * price;
		await supabase.rpc('update_balance2', { amount: negative_amount, user_id: purchaserId });
		await supabase.rpc('update_balance2', { amount: price, user_id: sellerId });
		addPurchase(purchaser.id, purchaser.purchases, purchase.purchaseId);
		addLink(purchaserId, purchaser.links, linkId);
	} catch (error) {
		console.dir(error);
		throw error;
	}
}

/** Insert purchase in db
 * @param {Purchase} - Purchase Type
 * @return {Promise<Purchase>} - It will always succeed :)
 * @todo - Error Checking | maybe turn into stored procedure in supabase?
 */
async function createPurchase(purchase: Purchase): Promise<Purchase> {
	const { data, error }: Response = await supabase.from('purchases').insert([purchase]);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}

/** Add a purchaseId to purchases array in user profile
 * @todo - Need to turn into stored procedure in supabase
 */
async function addPurchase(id: string, purchases: string[], purchaseId: string) {
	// This fixes an annoying supabase error:
	if (purchases == null) {
		purchases = [];
	}
	const { data, error }: Response = await supabase
		.from('profiles')
		.update([{ purchases: purchases.concat([purchaseId]) }])
		.eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}

/** Add a linkId to links array in user profile
 * @todo - Need to turn into stored procedure in supabase
 */
async function addLink(id: string, links: string[], linkId: string) {
	// This fixes an annoying supabase error:
	if (links == null) {
		links = [];
	}
	const { data, error }: Response = await supabase
		.from('profiles')
		.update([{ links: links.concat([linkId]) }])
		.eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}
