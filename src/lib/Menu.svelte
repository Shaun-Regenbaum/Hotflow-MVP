<!-- @component
    This component is designed for the overlay of when a user is looking at content.
    It's structure has three parts:
     - A header where if the user is logged in, well put info related to the content at hand
     - A slot for a component to be provided from outside this component
     - Navigation for if there are multiple components we want the user to be able switch between

    It is important to note that this design is based on handling the state of the menu externally to the menu component.


	@example 
	<Menu minimized={false} />

 -->
<script lang="ts">
	import { slide } from 'svelte/transition';
	export let minimized = false;
	$: visible = minimized ? 'none' : '';
</script>

<div id="menu" transition:slide={{ duration: 600 }}>
	<div id="components" style="display:{visible}">
		<slot />
	</div>
	<section id="toolbar">
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button
			id="minimize"
			on:click={()=>(minimized = !minimized)}
			style="transform: rotateZ( {minimized ? '90deg' : '270deg'}) scale(0.8, 1.4);">&lt;</button
		>
		<slot id="nav" name="nav" />
	</section>
</div>

<style>
	/* Everything here is for mobile and desktop, desktop specific comes after: */
	#menu {
		/* Positioning: */
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		width: fit-content;

		/* Layout: */
		display: flex;
		flex-direction: column;
		/* Container Look: */
		background-color: white;
		border-radius: 10px 10px 0px 0px;
		border-bottom: 0px;
		border-style: solid;
	}

	#components {
		padding: 10px 20px;
		padding-bottom: 20px;
		border-bottom: 2px solid black;
	}
	#toolbar {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 5px auto 10px auto;
		min-height: 1rem;
		max-height: 7rem;
		width: 100%;
		margin: 0px 10px;
	}
	#minimize {
		width: 3rem;
		background: none;
		margin: 0 auto;
	}

	button,
	button:hover,
	button:focus {
		font-size: 2rem;
		border: 0;
		background-color: white;
	}

	/*Between Mobile and Desktop specific:  */
	@media (min-width: 550px) {
		#menu {
			min-width: 380px;
			max-width: 600px;
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
		}
	}

	/* For Desktop: */
	@media (min-width: 1100px) {
		#menu {
			min-width: 600px;
			width: 30%;
		}
	}
</style>
