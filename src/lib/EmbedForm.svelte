<script>
    import { saveURL } from '$lib/urls/saveURL.js';
    import { session } from '$app/stores';
    let userToken = $session.user['user-token']
    let url;
    let newUrl;
    let title;
    console.log(location)

function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
        return url;
}

    async function submit(event) {
        const result = await saveURL(addhttps(url), title, userToken);
        if (result.status) {
            if (title) {
                newUrl = String(location.origin) + '/content/' + title}
            }else{
                newUrl = String(location.origin) + '/content/' + String(result.body.objectId)
            }
    }
</script>

<h1>Put the link you want to monetize below</h1>
<form on:submit|preventDefault={submit}>
	<fieldset>
		<input type="link" required placeholder="URL" bind:value={url} />
		<input type="title" required placeholder="Title (Optional" bind:value={title} />
	</fieldset>
	<button type="submit"> Monetize </button>
</form>
{#if newUrl}
	<h1>Here is your monetized link:</h1>
	<a href={newUrl}>{newUrl}</a>
{/if}
<h1>Preview:</h1>
<iframe title="iframe" id="monetized" style="	width:40%;
	height:30vh;" src={addhttps(url)} />
