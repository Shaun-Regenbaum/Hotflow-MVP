<!-- @component
	PROPERTIES:

		1) NONE
	DESCRIPTION:

    This component is designed to be the refund button. IT NEEDS WORK.
	
        1) What they know:
			a. ?
        2) What they don't know:
            a. ?
        3) What they will want to know:
            a. ?
 -->
<script>
	import Form from '$lib/Creator/Form.svelte';
	import New from '$lib/Creator/New.svelte';

	export let brand;
	export let userId;
</script>

{#if brand}
	<Form {brand} />
{:else}
	<New />
{/if}
