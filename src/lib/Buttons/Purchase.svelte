<script>
    import { addUserToLink } from '$lib/urls/addUserToLink-UNUSED.js';
    import { session } from '$app/stores';
    function purchase(){
        const result = await addUserToLink(linkId, userId, token);
        if (result.status){ 
        } else{message = result.body}
    }
</script>


<button on:click={purchase}><h4>Wrong Form?</h4></button>