There are a number of custom queries we developed on the backend in supabase, to see them in detail, go to the SQL editor tab in supabase.

To use any of them:

_const { data, error } = await supabase.rpc("INSERT_QUERY_HERE", {INSERT PARAMETERS HERE});_

**update_balance** -> Query to update balance (in the profiles table)

    parameters -> {amount INTEGER: INSERT AMOUNT HERE, user_id TEXT/UUID: INSERT USER ID HERE}

**increment_click** -> Query to increment the click counter on a link (in the links table)

    parameters -> {link_id TEXT/UUID: INSERT LINK ID HERE}

**increment_refund** -> Query to increment the refund counter on a link (in the links table)

    parameters -> {link_id/UUID TEXT: INSERT LINK ID HERE}

**increment_payment** -> Query to increment the payment counter on a link (in the links table)

    parameters -> {link_id TEXT/UUID: INSERT LINK ID HERE}

**add_purchased_link** -> Query to add the uuid of a link to the array of purchased_links in a profile (in the profiles table)

    parameters -> {purchased_id TEXT/UUID: INSERT PURCHASER ID HERE, link_id TEXT/UUID: INSERT LINK ID HERE}

**add_owned_link** -> Query to add the uuid of a link to the array of owned_links in a profile (in the profiles table)

    parameters -> {user_id TEXT/UUID: INSERT USER ID HERE, link_id TEXT/UUID: INSERT LINK ID HERE}
