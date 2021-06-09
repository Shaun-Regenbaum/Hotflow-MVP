<!-- @component
	PROPERTIES:

		1) brand -> name of content creator to show.
	DESCRIPTION:

    This component is designed to show up for whenever a user needs to login or register:
 -->
<script>
	import supabase from '$lib/db';
	export let brand;

	$: submitted = false;
	let url =
		'https://docs.google.com/document/d/e/2PACX-1vT7qXp6doZoEUJVpe8i71Wq1h4yr7Gx23-UpKxJdJHCR_aHAO9DIJM8z4A8k1NgLvEohyX3Rz57yCVG/pub';
	let title = 'default';
	let dollars = 0.1;
	$: price = dollars * 100;
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
		promise.then(async function ({ data }) {
			await supabase.rpc('add_owned_link', { user_id: user.id, link_id: data[0].link_id });
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
			<div id="align_together">
				<span class="currency_symbol">
					<input type="number" id="amount" name="amount" step="0.01" bind:value={dollars} />
				</span>
				<input type="range" name="price" step="0.01" max="10" bind:value={dollars} />
			</div>
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
		width: 3rem;
	}
	input[type='range'] {
		appearance: none;
		}
	label {
		color: black;
	}
	#align_together {
		display: flex;
		justify-content: flex-start;
	}

	.currency_symbol {
		position: relative;
	}
	.currency_symbol input {
		padding-left: 25px;
	}
	.currency_symbol:before {
		position: absolute;
		top: 0px;
		content: '$';
		left: 10px;
	}
</style>
