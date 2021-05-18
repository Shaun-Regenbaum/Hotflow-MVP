import supabase from '$lib/db';
import type { Purchase, Profile, PostgrestError } from '$lib/Endpoints/apiTypes';

type Response = {
	data: Purchase[] | Profile[];
	error: PostgrestError;
};

/**This function creates a purchase in the db, subtracts the purchaser account balance, adds to the seller account balance, and add the bought link to the purcasher's purchases.
 * @todo Really need to optimize the number of calls, right now it is VERY Ineffecient.
 * @param {Purchase} - It takes in a purchase to create
 * @return {string | PostgrestError[]} - We will either return a "Success with the relevant information" or the error message
 */
export default async function makePurchase(purchase: Purchase) {
	try {
		let purchaser: Profile = await getProfile(purchase.purchaserId);
		let seller: Profile = await getProfile(purchase.purchaserId);
		purchase = await createPurchase(purchase);
		purchaser = await updateBalance(purchaser.id, purchaser.balance, -1 * purchase.amount);
		seller = await updateBalance(seller.id, seller.balance, purchase.amount);
		purchaser = await addPurchase(purchaser.id, purchaser.purchases, purchase.purchaseId);
		return purchase;
	} catch (error) {
		return error;
	}
}

async function getProfile(id: string) {
	let { data, error } = await supabase.from('profiles').select().eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}
async function createPurchase(purchase: Purchase) {
	let { data, error }: Response = await supabase.from('purchases').insert([purchase]);
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

async function addPurchase(id: string, purchases: string[], purchase: string) {
	const { data, error }: Response = await supabase
		.from('profiles')
		.update([{ purchases: purchases.push(purchase) }])
		.eq('id', id);
	if (data) {
		return data[0];
	} else {
		throw error;
	}
}
