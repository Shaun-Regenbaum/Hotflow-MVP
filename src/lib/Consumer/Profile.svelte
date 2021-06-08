<!-- @component Profile
	A component to show the most basic information about a user. Which right now, is literally just the name...

	@example
	<Profile name={name}/>
 -->
<script lang="ts">
	export let name = 'Mr. Anonymous';
</script>

<body id="container">
	<div class="account_detail">Welcome Back <i>{name}</i></div>
</body>

<style>
	#container {
		/* Layout */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		/* Positioning: */
		justify-content: space-evenly;
		min-width: 200px;
	}
	.account_detail {
		align-self: center;
		padding: 10px;
		font-size: 2rem;
	}
</style>
