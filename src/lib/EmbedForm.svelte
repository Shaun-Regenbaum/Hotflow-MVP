<script>
	let url;
	let newUrl;
	let title;
	console.log(location);

	// function addhttps(url) {
	// 	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
	// 		url = 'https://' + url;
	// 	}
	// 	return url;
	// }

	async function submit() {
		// const result = await saveURL(addhttps(url), title, userToken);
		// if (result.status) {
		// 	if (title) {
		// 		newUrl = String(location.origin) + '/content/' + title;
		// 	}
		// } else {
		// 	newUrl = String(location.origin) + '/content/' + String(result.body.objectId);
		// }
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
