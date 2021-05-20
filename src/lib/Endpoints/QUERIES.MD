There are a number of custom queries we developed on the backend in supabase, to see them in detail, go to the SQL editor tab in supabase.

To use any of them:

*const { data, error } = await supabase.rpc("INSERT_QUERY_HERE", {INSERT PARAMETERS HERE});*


NOTE: There is a really stupid bug in supabase right now, where you can't update a query, so in the meantime, we have to to use wierd names for the Queries (as I had to make new queries everytime I wanted to make a change).

Otherwise, I will simply list them here for reference:

**update_balance2** -> Query to update balance (in the profiles table)

    parameters -> {amount: INSERT AMOUNT HERE, user_id: INSERT USER ID HERE}

**add_click** -> Query to increment all values in click column (in the links table)

**add_refund** -> Query to increment all values in refund column (in the links table)

