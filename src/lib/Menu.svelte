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

	function minimize() {
		minimized = !minimized;
	}
</script>

<div id="menu" transition:slide={{ duration: 600 }}>
	<div id="components" style="display:{visible}">
		<slot />
	</div>
	<section id="toolbar" on:click={minimize}>
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button id="minimize" style="transform: rotateY( {minimized ? '70deg' : '0deg'});" />
	</section>
</div>

<style>
	/* Everything here is for mobile and desktop, desktop specific comes after: */
	#menu {
		/* Positioning: */
		position: absolute;
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
		padding: 10px 20px;
		/* Container Look: */
		background-color: white;
		border-radius: 50px 50px 0px 0px;
		border-bottom: 0px;
		border-style: solid;
	}
	#minimize {
		/*Probably want to redo this guy*/
		/* Centering the Box/Arrow: */
		margin-bottom: 0.5rem;
		width: 40px;
		box-shadow: none;
		border-bottom: rgb(136, 136, 136) dotted 5px;
	}
	#minimize:hover,
	#minimize:active {
		width: 40px;
		box-shadow: none;
	}

	#toolbar {
		margin: 0 auto;
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
