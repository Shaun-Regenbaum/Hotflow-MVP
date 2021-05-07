<!-- @component
    This component is designed for the overlay of when a user is looking at content.
    It's structure has three parts:
     - A header where if the user is logged in, well put info related to the content at hand
     - A slot for a component to be provided from outside this component
     - Navigation for if there are multiple components we want the user to be able switch between

 -->
<script context="module" lang="ts">
	/**This is an object containing a component and all the details associated to display in a menu */
	export type MenuComponent = {
		/**This is the actual component to supply to another component */
		component: any | undefined;
		/**This is the name of the component if we needt to navigate between multiple components */
		name: string;
	};
</script>

<script lang="ts">
	export let components: MenuComponent[];
	export let starting_component: MenuComponent = components[0];
	let current_component: MenuComponent = starting_component;
	export let name = 'Mr. Anonymous';



	let minimized = false
	$: visible = minimized ? 'none' : ''

	function minimize(){
		console.log("Hello")
		minimized = !minimized
	}

	function switchComponent(selection:string){
		let select = components.filter(component => component.name == selection)
		current_component = select[0];
	}

</script>

<div id="menu" style="width:{minimized ? '10rem' : '30%'}; border-radius: {minimized ?  '7px 7px 0 0': '30px 30px 0 0'};">
	<section id="toolbar" on:click="{minimize}" style="height: {minimized ? '1rem' : 'inherit'}; width: {minimized ? '5rem' : ''}; ">
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button id='minimize' style='transform: rotate({minimized ? '225deg' : '45deg'});'></button>
	</section>
	<div id="card" style="display:{visible}">
		<svelte:component this={current_component.component} />
	</div>
	<nav style="display:{visible}">
		{#each components as component}
		<li style="display: inline;"><button on:click={switchComponent(component.name)}>{component.name}</button></li>
		{/each}
	</nav>

</div>

<style>
	#menu {
		/* Positioning: */
		position: absolute;
		z-index: 2;
		bottom: 0;
		right: 10%;

		/* Grid Layout: */
		display: grid;
		grid-template-rows: 2rem 1fr 1rem 3rem 1rem;
		grid-template-columns: 2rem 1fr 2rem;

		/* Size of Container: */
		max-height: 50vh;

		/* Colors: */
		background-color: #e0e0e0; /* Fallback for older browsers */

		/* Nueromorphism: */
		box-shadow:  -5px -5px 20px #00000021,
             5px 5px 15px #ffffff21;
	}
	#toolbar{
		/*Grid Placement:*/
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	#minimize {  /*Probably want to redo this guy*/
		/* Centering the Box/Arrow: */
		margin-left: 50%;

		/* Size of Box/Arrow */
		height: 1rem;
  		width: 1rem;

		/* Color of Box/Arrow: */
		background-color: rgba(246, 185, 185, 0.404);

		/* Transforming the border of a box into an arrow */
  		border-width: 0px 3px 3px 0px;

		/* Padding, to make it not rest on top on minimied: */

		border: 0;
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe,
             -3px -3px 10px #ffffff;
	}

	#card {
		/*Grid Placement:*/
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
		/* Positioning: */
		overflow-y: auto;
		max-height: 40vh;
	}

	nav {
		/*Grid Placement:*/
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 4;

		/* To make menu items evely spaced: */
		display: flex;
		align-items: center;
		justify-content: space-around;

		/* Shape of menu bar: */
		border-radius: 1rem/2rem;

		/* Nueuromorphism: */
		background: #e2e2e2f3;
		box-shadow: 3px 5px 5px #ffffff,
		 -3px -3px 10px #9c9c9c,
		  inset 1px 5px 20px #b3b0b0,
		 inset -1px -10px 30px #e9e9e9;

	}

	button {
		/* Removing all the default outlines: */
		border: 0;
  		outline:0;
		background: #e0e0e0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		color:rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 8px #bebebe,
             -3px -3px 8px #ffffff;
	}
</style>
