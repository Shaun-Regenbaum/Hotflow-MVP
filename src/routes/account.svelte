<script lang="ts">
    import type {Profile} from '$lib/Docs/types'
    import supabase from '$lib/db'
    import {getProfile} from '$lib/Endpoints/profile'
    import History from '$lib/Consumer/History.svelte'
    import Balance from '$lib/Consumer/Balance.svelte'
import { onMount } from 'svelte'
    let name="..."
    let user = {
        id: null
    };
    let profile:Profile ={purchased_links: []};
    onMount(async function(){
        user = supabase.auth.user();
        profile = await getProfile(user.id)
        name=profile.name;
    })
</script>

<div id="container">
    <div id="nav"></div>
    <div id="name"><h1>{name}</h1></div>
    <div id="balance"><Balance balance={profile.balance}/></div>
    <div id="collection"><History purchaser_id={user.id} purchases={profile.purchased_links}/></div>

</div>
<style>
    #container{
        /* GRID: */
        display:grid;
        grid-template-rows: [nav-row] 70px [name-row] 100px [balance-row] 300px [items-row] 400px;
        grid-template-columns: 100%;
        justify-items: center;
    }
    #nav{
        /* GRID: */
        grid-row-start: nav-row;
        grid-row-end: name-row;
    }
    #name{
        /* GRID: */
        grid-row-start: name-row;
        grid-row-end: balance-row;
    }
    #balance{
        /* GRID: */
        padding-top: 1rem;
        grid-row-start: balance-row;
        grid-row-end: items-row;
    }

    #items{
        /* GRID: */
        grid-row-start: items-row;
    }
</style>