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
	let url = 'https://ft.com';
	let completed = false;
	let title = 'default';
	let mooch = true;
	let price = 10;
	let base;
	let message = '';

	async function submit() {
		const user = supabase.auth.user();
		const { data, error } = await supabase.from('links').insert([
			{
				url: url,
				mooch: mooch,
				ownerId: user.id,
				title: title,
				price: price,
				brand: brand
			}
		]);
		if (data) {
			completed = true;
			base = `${brand}/${title}`;
		} else {
			message = error.message;
		}
	}
</script>

<form id="link_form" on:submit|preventDefault={submit}>
	<fieldset>
		<legend>Monetization Form</legend>
		<section>
			<label for="title">Title for Content - Optional</label>
			<input type="text" name="title" placeholder="Content Title (Optional)" bind:value={title} />
			<label for="title">Source Url of Content</label>
			<input type="url" name="url" placeholder="URL" bind:value={url} />
		</section>
		<section />
		<section>
			<label style="display: inline-block;" for="mooch">
				<input class="checkbox" type="checkbox" name="mooch" bind:checked={mooch} />
				Allow Moochers?
			</label>
			<label for="price">Price</label>
			<p>Price: <input type="number" name="price" bind:value={price} /></p>
			<input type="range" name="price" bind:value={price} />
		</section>
	</fieldset>
	<button type="submit"> Monetize </button>
</form>
{#if completed}
	<h1>Here is your monetized link:</h1>
	<a href={location.origin + '\\' + base}>{location.origin + '\\' + base}</a>
{:else}
	<p>{message}</p>
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
