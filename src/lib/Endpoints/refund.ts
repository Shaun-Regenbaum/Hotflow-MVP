import supabase from '$lib/db';
import type { Purchase, Profile } from '$lib/Docs/types';
import type { Response } from '$lib/Endpoints/apiTypes';

/**This function changes a purchase in the db to a refunded purchase, adds to the purchaser account balance, substracts from the seller account balance, and removes the bought link from the purcasher's purchases.
 * @todo Really need to optimize the number of calls, right now it is VERY Ineffecient.
 * @param {Purchase} - It takes in a purchase to create
 * @return {string | PostgrestError[]} - We will either return a "Success with the relevant information" or the error message
 */
export default async function makeRefund(
	purchaserId: string,
	sellerId: string,
	linkId: string,
	amount: number
) {
	try {
		let purchaser: Profile = await getProfile(purchaserId);
		let seller: Profile = await getProfile(sellerId);
		const purchase: Purchase = await createRefund({
			purchaserId: purchaserId,
			sellerId: sellerId,
			linkId: linkId,
			amount: amount,
			refunded: true
		});
		purchaser = await updateBalance(purchaser.id, purchaser.balance, purchase.amount);
		await updateBalance(seller.id, seller.balance, -1 * purchase.amount);
		await removePurchase(purchaser.id, purchaser.purchases, purchase.purchaseId);
		return purchase;
	} catch (error) {
		return error;
	}
}

async function getProfile(id: string) {
	const { data, error } = await supabase.from('profiles').select().eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}
async function createRefund(purchase: Purchase) {
	const { data, error }: Response = await supabase.from('purchases').upsert([purchase]);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}

async function updateBalance(id: string, initial_balance: number, amount: number) {
	const { data, error }: Response = await supabase
		.from('profiles')
		.update([{ balance: initial_balance + amount }])
		.eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}

async function removePurchase(id: string, purchases: string[], purchaseId: string) {
	const { data, error }: Response = await supabase
		.from('profiles')
		.update([{ purchases: purchases.filter((purchase) => purchase != purchaseId) }])
		.eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}
