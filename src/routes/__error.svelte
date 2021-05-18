<script context="module">
	/**
	 * @type {import('@sveltejs/kit').ErrorLoad}
	 */
	export async function load({ error, status }) {
		return {
			props: {
				status: status,
				error: error
			}
		};
	}
</script>

<script>
	export let status;
	export let error;
</script>

<h1>{status}</h1>
<p>{error.message}</p>
<!-- {#if error.stack}
	<pre>{error.stack}</pre>
{/if} -->
