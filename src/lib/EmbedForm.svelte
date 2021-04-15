<script>
    import { saveLink } from '$lib/db/savelink.js';
    import { session } from '$app/stores';
    let userToken = $session.user['user-token']
    let url;
    let newUrl;
    console.log(location)
    const withHttp = (url) => (!/^http?:\/\//i.test(url) ? `http://${url}` : url);
    const withHttps = (url) => (!/^https?:\/\//i.test(url) ? `https://${url}` : url);

    async function submit(event) {
        console.log(withHttp(url))
        const result = await saveLink(withHttps(url), userToken);
        if (result.status) {
            newUrl = String(location.origin) + '/content/' + String(result.body.data.objectId)}
        else{
            result = await saveLink(withHttp(url), userToken);
            if (result.status) {
                newUrl = String(location.origin) + '/content/' + String(result.body.data.objectId)
            }
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
	src={withHttp(url)}
/>

