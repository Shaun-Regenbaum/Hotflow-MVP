  
<script context="module">
	export function load({ session }) {
		return {
			status: 302,
			redirect: session.user ? `/account/@${session.user.username}` : '/login'
		};
	}
</script>