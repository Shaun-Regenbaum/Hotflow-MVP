//** This file is for adding, and substracitng balance for a user's profile */
import supabase from '$lib/db'


/**This function is meant to update a balance after a transaction or refund.
 * This can be done in two ways:
 * 1) Either pass in the balance and then just do one API call
 * 2) Do an API call to get the balance on the backend and then do another API call to update it based on the previous value.
 *  */ 
export async function updateBalance(userId:string, amount:number){
    let balance;

    let { data: profile, error } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', userId);

    if (profile){
        balance = profile[0].balance
        const { data, error } = await supabase
            .from('profiles')
            .update({ balance: balance + amount })
            .eq('id', userId)
        if (data){
            // Success
        } else {
            return error.message;
        }
    } else {
        return error.message
    }
    
}