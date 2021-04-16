<script>
    import { saveLink } from '$lib/urls/saveURL.js';
    import { session } from '$app/stores';
    let userToken = $session.user['user-token']
    let url;
    let newUrl;
    console.log(location)
function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
        return url;
}

    async function submit(event) {
        console.log(addhttp(url))
        const result = await saveLink(addhttp(url), userToken);
        if (result.status) {
            newUrl = String(location.origin) + '/content/' + String(result.body.data.objectId)}
        else{
            result = await saveLink(addhttps(url), userToken);
        }
    }
</script>

<h1>Put the link you want to monetize below</h1>
<form on:submit|preventDefault={submit}>
    <fieldset>
        <input  type="link" required placeholder="URL" bind:value={url}>
    </fieldset>
    <button type="submit">
        Monetize
    </button>
</form>
{#if newUrl}
<h1>Here is your monetized link:</h1>
<a href={newUrl}>{newUrl}</a>
{/if}
<h1>Preview:</h1>
<iframe
	title="iframe"
	id="monetized"
	style="	width:40%;
	height:30vh;"
	src={addhttp(url)}
/>

