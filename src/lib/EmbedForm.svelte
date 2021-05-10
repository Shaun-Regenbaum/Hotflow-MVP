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
<div id="link_form">
	<h1>Put the link you want to monetize below</h1>
<form on:submit|preventDefault={submit}>
	<fieldset>
		<input type="link" required placeholder="URL" bind:value={url} />
		<input type="title" required placeholder="Title (Optional)" bind:value={title} />
	</fieldset>
	<button type="submit"> Monetize </button>
</form>
{#if newUrl}
	<h1>Here is your monetized link:</h1>
	<a href={newUrl}>{newUrl}</a>
{/if}
</div>


<style>
	#link_form {
		/* Keeping the Login Form Centered: */
		text-align: center;

		/*Padding: */
		padding: 1rem;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: inset 3px 3px 5px #eeeeee, inset -3px -3px 5px #bebebe;
	}
	fieldset {
			/* Removing the fieldset borders */
			border: 0;
		}

		input {
			/* Removing all the default outlines: */
			border: none;
			outline: none;
			/* Text: */
			color: rgba(65, 65, 65, 0.719);
			/* Making the input fields nueromorphic: */
			
			background: rgba(255, 255, 255, 0.383);
			padding: 0.5rem 1rem 0.5rem 1rem;
			margin-bottom: 0.4rem;
			border-radius: 25px;
			box-shadow: inset 3px 3px 10px #64606052, inset -3px -3px 10px #fff7f7;

			/* Animations: */
			transition: all 0.2s ease;
		}
		input:focus {
			box-shadow: inset 5px 5px 6px #64606052, inset -5px -5px 6px #fff7f7;
		}

		button {
			/* Removing all the default outlines: */
			border: 0;
			outline: 0;
			padding: 0.2rem 0.5rem 0.2rem 0.5rem;
			margin-top: 0.5rem;
			margin-inline: 1rem;
			color: rgba(65, 65, 65, 0.719);
			border-radius: 10px;
			background: #e0e0e0;
			box-shadow: 5px 5px 10px #9b9b9b, -5px -5px 10px #ffffff;

			/* Animations: */
			transition: all 0.2s ease;
		}

		button:hover, button:active {
			box-shadow: 1px 1px 5px #9b9b9b, -1px -1px 5px #ffffff;
			
		}
</style>