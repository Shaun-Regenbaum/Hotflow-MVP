<script>
    let url;
    const withHttp = (url) => (!/^http?:\/\//i.test(url) ? `http://${url}` : url);

    async function submit(event) {
        
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

<h1>Preview:</h1>
<iframe
	title="iframe"
	id="monetized"
	style="	width:40%;
	height:30vh;"
	src={withHttp(url)}
/>

