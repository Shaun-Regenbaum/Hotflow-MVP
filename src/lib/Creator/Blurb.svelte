<!--  @component Blurb

	A small component that contains minimal information about the creator of some content on a page. It requires data from the parent, aka does NOT make its own API calls. 

	@example 
	<Blurn brand_name={Mr. Anonymous} supporters={supporters}/>

 -->
<script>
	export let brand_name = 'Anonymous Brand Inc.';
	export let supporters = 100;
</script>

<div id="container">
	<div id="picture" />
	<div id="details_container">
		<p style="font-size: 1.2rem;">{brand_name}</p>
		<p style="font-size: 0.8rem;">{supporters} Supporters</p>
	</div>
</div>

<style>
	:root {
		--pic-length: 3rem;
	}
	#container {
		/* Layout */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		/* Positionging: */
		justify-content: flex-start;
	}

	#details_container {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Positionging: */
		justify-content: left;
		margin-left: 30px;
	}
	#picture {
		/* Positionging: */
		align-self: center;

		/* Picture Size and shape: */
		width: var(--pic-length);
		height: var(--pic-length);
		border-radius: 100%;
		background: rgb(238,174,202);
		background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
	}
	p {
		margin: 0.25rem 0;
	}
</style>
