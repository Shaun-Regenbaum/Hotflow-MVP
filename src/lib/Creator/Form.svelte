<!-- @component
	PROPERTIES:

		1) brand -> name of content creator to show.
	DESCRIPTION:

    This component is designed to show up for whenever a user needs to login or register:

        1) What they know:
            a. That they want to monetize a link.
        2) What they don't know:
            a. What does it take to monetize a link?
            b. How customizable is it?
			c. More?
        3) What they will want to know:
            a. ?
 -->
<script>
	import supabase from '$lib/db';
	export let brand;

	$: submitted = false;
	let url =
		'https://docs.google.com/document/d/e/2PACX-1vT7qXp6doZoEUJVpe8i71Wq1h4yr7Gx23-UpKxJdJHCR_aHAO9DIJM8z4A8k1NgLvEohyX3Rz57yCVG/pub';
	let title = 'default';
	let price = 10;
	let promise;
	async function submit() {
		const user = supabase.auth.user();
		promise = supabase.from('links').insert([
			{
				url: url,
				owner_id: user.id,
				title: title,
				price: price,
				brand: brand
			}
		]);
		promise.then(function ({ data }) {
			supabase.rpc('add_owned_link', { user_id: user.id, link_id: data[0].link_id });
		});
		submitted = true;
	}
</script>

{#if !submitted}
	<form id="link_form" on:submit|preventDefault={submit}>
		<fieldset>
			<legend>Monetization Form</legend>
			<label for="title">Title for Content - Optional</label>
			<input type="text" name="title" placeholder="Content Title (Optional)" bind:value={title} />
			<label for="title">Source Url of Content</label>
			<input type="url" name="url" placeholder="URL" bind:value={url} />
			<label for="price">Price</label>
			<p>Price: <input type="number" name="price" bind:value={price} /></p>
			<input type="range" name="price" bind:value={price} />
		</fieldset>
		<button type="submit"> Monetize </button>
	</form>
{:else}
	{#await promise}
		<p>Setting Stuff Up...</p>
	{:then { error }}
		{#if error}
			<p>{error.message}</p>
		{:else}
			<h1>Here is your monetized link:</h1>
			<a href={location.origin + '\\' + brand + '\\' + title}
				>{location.origin + '\\' + brand + '\\' + title}</a
			>
		{/if}
	{/await}
{/if}

<style>
	/* Container Properties: */
	#link_form {
		/* Keeping the Login Form Centered: */
		text-align: center;

		/*Padding: */
		padding: 1rem;

		/* Neuromorphism */
		border-radius: 25px;
		box-shadow: 0px 0px 10px var(--nuero-dark);
	}
	/* Css For form elements: */
	fieldset {
		/* Removing the fieldset borders */
		border: 0;
	}

	/* Element Properties: */
	/* TODO - We need to rehaul these */
	input[type='number'] {
		width: 2rem;
	}
	input[type='range'] {
		appearance: none;
		width: 10rem;
	}
	input[type='checkbox']:focus,
	input[type='checkbox']:checked {
		background: none;
		box-shadow: inset 5px 5px 10px var(--neuro-dark), inset -5px -5px 10px var(--neuro-light),
			-2px -2px 5px var(--neuro-dark), 2px 2px 5px var(--neuro-light);
	}
</style>
