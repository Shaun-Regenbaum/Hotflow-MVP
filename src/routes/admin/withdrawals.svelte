
<script context="module" lang="ts">
    import supabase from '$lib/db'

	/** Gets relevant information from the url to know what content you want.
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const { data } = await supabase.from('withdrawals').select()
		if (data) {
			// If Successful 
			return {
				props: {
					links: data
				}
			};
		}
		// If Error
		return {
			status: 404,
			error: 'Could not find data'
		};
	}
</script>

<script lang='ts'>
    export let links;

</script>

{#each links as link}
    {JSON.stringify(link)}
    <br>
    <br>
{/each}