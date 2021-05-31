<!-- @component
    This component is designed for the overlay of when a user is looking at content.
    It's structure has three parts:
     - A header where if the user is logged in, well put info related to the content at hand
     - A slot for a component to be provided from outside this component
     - Navigation for if there are multiple components we want the user to be able switch between

    It is important to note that this design is based on handling the state of the menu externally to the menu component.

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
		<button id="minimize" style="transform: rotate( {minimized ? '180deg' : '0deg'});" />
	</section>
</div>

<style>
	/* Everything here is for mobile and desktop, desktop specific comes after: */
	#menu {
		/* Positioning: */
		position: absolute;
		z-index: 1000;
		top: 0px;
		left: 0;

		/* Layout: */
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		/* Container Look: */
		background-color: white;
		border-radius: 5px 5px 50px 50px;
		border-style: solid;
	}
	#minimize {
		/*Probably want to redo this guy*/
		/* Centering the Box/Arrow: */
		margin-left: 47%;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		width: 40px;
		box-shadow: none;
	}
	#minimize:hover, #minimize:active{
		width: 40px;
		box-shadow: none;
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
