<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const base = page.host
		console.log(page);
		return {
			props: {
				host: base
			}
		};
	}
</script>

<script lang='ts'>
	import supabase from '$lib/db'
	// import session from '$app/stores'
	import { browser } from '$app/env';


	let url:string = "https://nocodeneeded.com/shaun";
	let completed:boolean = false;
	let title:string = "default";
	let mooch:boolean;	
	let price:number = 10;
	let base:string;
	let message:string = '';
	export let host;


	function addhttps(url) {
		if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
			url = 'https://' + url;
		}
		return url;
	}

	async function submit() {
		const { data, error } = await supabase
			.from('links')
			.insert([
				{ link: addhttps(url), mooch:mooch, owner: "1d2147a7-d81f-41a7-b4ca-c61d8ba0ac9d", title: title, price: price }
			])
		if (data) {
			completed=true;
			base = `content\\${title}`
			console.log(host)
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
			<input type="text" name='title' placeholder="Content Title (Optional)" bind:value={title} />
			<label for="title">Source Url of Content</label>
			<input type="url" name='url' placeholder="URL" bind:value={url} />
		</section>
		<section>

		</section>
		<section>
			<label style="display: inline-block;" for="mooch">
				<input class="checkbox" type="checkbox" name="mooch" bind:checked={mooch}/>
				Allow Moochers?
			</label>
			<label for="price">Price</label>
			<p>Price: <input type="number" name="price" bind:value={price}/></p>
			<input type="range" name="price" bind:value={price}/>
	
		</section>
	</fieldset>
	<button type="submit"> Monetize </button>
</form>
{#if completed}
	<h1>Here is your monetized link:</h1>
	<a href={host + base}>{host+ base}</a>
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
		box-shadow:  0px 0px 10px var(--nuero-dark)
	}
	/* Css For form elements: */
	fieldset {
		/* Removing the fieldset borders */
		border: 0;
	}

	/* Element Properties: */
	label {
		/* We want label for accessibility reasons, but we want to hide it for aesthetics: */
		display: none;
	}
	input{
		/* Removing all the default outlines: */
		border: none;
		outline: none;

		/* Text: */
		color: rgba(65, 65, 65, 0.719);
		padding: 0.5rem 1rem 0.5rem 1rem;
		margin: 0.5rem;
		vertical-align:middle;

		/* Making the input fields nueromorphic: */
		background: var(--bg);
		border-radius: 25px;
		box-shadow: inset 5px 5px 10px var(--neuro-dark), 
						inset -5px -5px 10px var(--neuro-light),
						-2px -2px 5px var(--neuro-dark), 
						2px 2px 5px var(--neuro-light);

		/* Animations: */
		transition: all 0.2s ease-in-out;
	}
	input[type="number"]
	{
		width:2rem;
	}
	input[type="range"]
	{
		appearance: none;
		width:10rem;
	
	}
	input[type="checkbox"]:focus, input[type="checkbox"]:checked  {
		background: none;
		box-shadow: inset 5px 5px 10px var(--neuro-dark), 
						inset -5px -5px 10px var(--neuro-light),
						-2px -2px 5px var(--neuro-dark), 
						2px 2px 5px var(--neuro-light);
	}
	input:focus {
		/* Making selection very clear: */
		background: var(--neuro1-bg);
		box-shadow: inset 5px 5px 10px var(--neuro1-dark), 
					 inset -5px -5px 10px var(--neuro1-light),
					 -2px -2px 5px var(--neuro1-dark), 
					 2px 2px 5px var(--neuro1-light);
	}

	.checkbox {
		box-shadow: inset 3px 3px 7px var(--neuro-dark), 
					 inset -3px -3px 7px var(--neuro-light),
					 -1px -1px 5px var(--neuro-dark), 
					 1px 1px 5px var(--neuro-light);
		width:2rem;
		height:2rem;
	}



	/* Below is all the CSS for the Price Slider: */


	/* CSS for submission buttons: */
	button {
		/* Removing all the default outlines: */
		border: 0;
		outline: 0;

		/* Adding some padding around button text: */
		padding: 0.5rem 1rem 0.5rem 1rem;

		/* Keeping Next door buttons seperate: */
		margin: 0.7rem 0.5rem;

		/* Button Nueromorphism */
		color: var(--primary-color);
		border-radius: 10px;
		background: var(--bg);
		box-shadow:  5px 5px 7px var(--neuro-dark), 
					 -5px -5px 7px var(--neuro-light),
					inset -2px -2px 5px var(--neuro-dark), 
					inset 2px 2px 5px var(--neuro-light);	
	
		/* Animations: */
		transition: all 0.2s ease;
	}

	/* Unsure whether we want to use this: */
	/* .button_container{
		padding-right: 0.1rem;
		padding-bottom: 0.2rem;

		display: inline-block;
		border-radius: 10px;
		box-shadow: inset 1px 1px 3px var(--neuro-dark), 
					 inset -1px -1px 3px var(--neuro-light),
					 -2px -2px 3px var(--neuro-dark), 
					 2px 2px 3px var(--neuro-light);
	} */

	button:hover {
		box-shadow: 2px 2px 5px var(--neuro-dark), 
						-2px -2px 5px var(--neuro-light),
						inset -2px -2px 5px var(--neuro-dark), 
						inset 2px 2px 5px var(--neuro-light);
	}
	button:active, button:focus	 {
		background: var(--neuro1-bg);
		box-shadow:   2px 2px 3px var(--neuro1-dark), 
						-2px -2px 3px var(--neuro1-light),
						inset -2px -2px 5px var(--neuro1-dark), 
						inset 2px 2px 5px var(--neuro1-light);
	}	
</style>
