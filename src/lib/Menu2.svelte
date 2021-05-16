<!-- @component
    This component is designed for the overlay of when a user is looking at content.
    It's structure has three parts:
     - A header where if the user is logged in, well put info related to the content at hand
     - A slot for a component to be provided from outside this component
     - Navigation for if there are multiple components we want the user to be able switch between

    It is important to note that this design is based on handling the state of the menu externally to the menu component.

 -->
<script context="module" lang="ts">
	/**This is an object containing a component and all the details associated to display in a menu */
	export type MenuComponent = {
		/**This is the actual component to supply to another component */
		component;
		/**This is the name of the component if we needt to navigate between multiple components */
		name: string;
	};
</script>

<script lang="ts">
	import Default from '$lib/Default.svelte';
	export let components: MenuComponent[] = [{ component: Default, name: 'Default' }];
	export let starting_component: MenuComponent = components[0];
	let current_component: MenuComponent = starting_component;

	let minimized = false;
	$: visible = minimized ? 'none' : '';

	function minimize() {
		console.log('Hello');
		minimized = !minimized;
	}
</script>

<div
	id="menu">
	<section id="toolbar" on:click={minimize}>
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button id="minimize" style="transform: rotate( {minimized ? '180deg' : '0deg'});" />
	</section>
	<div id="card" style="display:{visible}">
		<slot/>
	</div>
</div>

<style>
	/* Everything here is for mobile and desktop, desktop specific comes after: */
	#menu {
		/* Positioning: */
		position: absolute;
		z-index: 1000;
		bottom: 0;
		left: 0;

		/* Layout: */
		display:flex;
		flex-direction: column;
		flex-wrap: nowrap;

		/* Container Look: */
		background-color: white;
		border-radius: 50px;
		border-style: solid;
	}

	#minimize {
		/*Probably want to redo this guy*/
		/* Centering the Box/Arrow: */
		margin-left: 47%;

		/* Color of Box/Arrow: */
		background-color: rgba(134, 134, 134, 0.404);
	}
	/*Between Mobile and Desktop specific:  */
	@media (min-width: 550px) {
		#menu {
			min-width: 380px;
			max-width: 550px;
			width: 50%;
			left: 10%;
		}
	}

	/* For Desktop: */
	@media (min-width: 1100px) {
		#menu {
			min-width: 550px;
			width: 30%;
		}
	}
</style>
