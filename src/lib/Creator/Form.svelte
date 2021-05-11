<script lang='ts'>
	import supabase from '$lib/db'
	// import session from '$app/stores'
	// import { browser } from '$app/env';


	let url:string = "https://nocodeneeded.com/shaun";
	let completed:boolean = false;
	let title:string = "default";
	let mooch:boolean;	
	let price:number = 10;
	let base:string;
	let message:string = '';

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
		box-shadow:  0px 0px 10px var(--nuero-dark)
	}
	/* Css For form elements: */
	fieldset {
		/* Removing the fieldset borders */
		border: 0;
	}

	/* Element Properties: */
	/* TODO - We need to rehaul these */
	label {
		/* We want label for accessibility reasons, but we want to hide it for aesthetics: */
		display: none;
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

</style>
