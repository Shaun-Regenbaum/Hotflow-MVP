<!-- @component
    This component is designed for the landing page to show possibilities of what you can monetize:
        1) What they know:
            a. The basics of what 402 is.
        2) What they don't know:
            a. What are the limnits to what I can sell?
            b. Is everything offered?
            c. More?
        3) What they will want to know:
            a. Concrete Examples
            b. Inspiration
 -->
<div id="offerings">
	<div class="offer">Google Docs</div>
	<div class="offer">Airtables</div>
	<div class="offer">Prezis</div>
	<div class="offer">Files</div>
	<div class="offer">Videos</div>
	<div class="offer">Courses</div>
	<div class="offer">Figma Templates</div>
	<div class="offer">Google Docs</div>
	<div class="offer">Google Docs</div>
	<div class="offer">Google Docs</div>
</div>

<style>
	#offerings {
		/* Container: */
		max-width: 500px;
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		flex-grow: 20;
		background: var(--bg);

		/* Rouncing Corners: */
		border-radius: 20px;

		/* Nueromprhic Design: */
		box-shadow: var(--card);

		/* Animations: */
		transition: all 0.2s ease;
	}

	.offer {
		/* Color: */
		background: rgba(128, 128, 128, 0.281);

		/* Container: */
		padding: 5px;
		margin: 5px;
		border-radius: 8px;

		/* Nueromorphic: */
		box-shadow: var(--card);
	}
</style>
