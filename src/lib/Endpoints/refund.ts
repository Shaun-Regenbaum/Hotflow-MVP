import supabase from '$lib/db';
import type { Transaction_Record } from '$lib/Docs/types';
import type { Response } from '$lib/Endpoints/apiTypes';

/** 5 Parts:
 * 1) Creates a refund transaction record in the db
 * 2) Subtracts from purchaser account balance
 * 3) Add to seller account balance
 * 4) remove purchase id to purchased_links
 * 5) incremement refunds counter in link entry
 * @param purchaser_id uuid of purchaser
 * @param seller_id - uuid of seller
 * @param link_id - uuid of link
 * @param amount - price of link
 * @return - return nothing on success, return PostgrestError otherwise
 * @todo - I am not sure if it needs to be async, but better safe than sorry I suppose.
 */
export default async function makeRefund(
	purchaser_id: string,
	seller_id: string,
	link_id: string,
	amount: number
): Promise<any> {
	const purchase: Transaction_Record = {
		purchaser_id: purchaser_id,
		seller_id: seller_id,
		link_id: link_id,
		amount: amount,
		type: 'refund'
	};
	const { data, error }: Response = await supabase.from('transaction_records').insert([purchase]);
	if (data[0]) {
		const negative_amount: number = -1 * amount;
		await supabase.rpc('update_balance', { amount: amount, user_id: purchaser_id });
		await supabase.rpc('update_balance', { amount: negative_amount, user_id: seller_id });
		await supabase.rpc('remove_purchased_link', { purchaser_id: purchaser_id, link_id: link_id });
		await supabase.rpc('increment_refund', { link_id });
	} else {
		console.dir(error);
		return error;
	}
}
