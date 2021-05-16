//** This file is for adding, and substracitng balance for a user's profile */
import supabase from '$lib/db'

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