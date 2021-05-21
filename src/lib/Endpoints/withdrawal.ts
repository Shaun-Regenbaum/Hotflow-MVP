import supabase from '$lib/db';
import type { Withdrawal } from '$lib/Docs/types';

/**
 * Get withdrawal
 * @param withdrawalId - id (not uuid) of withdrawal
 * @returns {Promise<Withdrawal>}
 * @todo - Better Error Checking
 */
export async function getWithdrawal(id: string): Promise<Withdrawal> {
	const { data, error } = await supabase.from('withdrawals').select().eq('id', id);
	if (data[0]) {
		return data[0];
	} else {
		console.dir(error);
		throw error;
	}
}
