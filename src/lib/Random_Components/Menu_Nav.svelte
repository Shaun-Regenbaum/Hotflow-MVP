
<script> import Logout from '$lib/Auth/Logout.svelte'</script>
<nav>
    <ul>
        <li>
            <button><a href="/account">Account</a></button>
        </li>
        <li>
            <button><a href="/account">Other</a></button>
        </li>
        <li>
            <Logout/>
        </li>
    </ul>
</nav>

<style>
    nav{

		/* Nuero: */
		box-shadow: var(--divot);
		border-radius: 20px;
        padding: 5px;
        margin: 0 10px;
    }
    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-around;
        align-items: center;
        padding: 0;
    }
    li{
        display: inline;
    }
</style>