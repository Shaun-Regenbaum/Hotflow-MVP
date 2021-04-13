<script>
    import { session } from '$app/stores';
    import Login from "$lib/Login.svelte";
    import Register from "$lib/Register.svelte";
</script>

{#if !session.user}
<Register />
<a href="/login">Already have an accont?</a>
{:else}
<h1>You are already logged in!</h1>
{/if}