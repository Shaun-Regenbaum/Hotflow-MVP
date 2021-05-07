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

<div id="menu" style="width:{minimized ? '3%' : '30%'}; border-radius: {minimized ?  '7px 7px 0 0': '30px 30px 0 0'};">
	<section on:click="{minimize}" style="height: {minimized ? '1rem' : 'inherit'};">
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button id='minimize' style='transform: rotate({minimized ? '225deg' : '45deg'});'></button>
	</section>
	<section style="display:{visible}">
		<div id="card">
			<svelte:component this={current_component.component} />
		</div>
	</section>
	<section style="display:{visible}">
		<nav>
			{#each components as component}
				<li style="display: inline;"><button class="component" on:click={switchComponent(component.name)}>{component.name}</button></li>
			{/each}
		</nav>
	</section>
</div>

<style>
	#menu {
		/* Positioning: */
		position: absolute;
		z-index: 2;
		bottom: 0;
		right: 10%;
		padding-bottom: 20px;

		/* Grid Layout: */
		display: grid;
		grid-template-rows: 10% 70% 10%;

		/* Size of Container: */
		max-width: 50%;
		max-height: 50vh;

		/* Colors: */
		background-color: #e0e0e0; /* Fallback for older browsers */

		/* Nueromorphism: */
		box-shadow:  -5px -5px 20px #bebebe,
             5px 5px 15px #ffffff;
	}
	#minimize {
		/* Centering the Box/Arrow: */
		margin-left: 50%;

		/* Size of Box/Arrow */
		height: 1rem;
  		width: 1rem;

		/* Color of Box/Arrow: */
  		border-color:rgba(0, 213, 255, 0.527);
		background-color: rgba(246, 185, 185, 0.404);

		/* Transforming the border of a box into an arrow */
  		border-width: 0px 3px 3px 0px;

		/* Padding, to make it not rest on top on minimied: */
		padding-top: 0.3rem;

			border: 0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe,
             -3px -3px 10px #ffffff;
	}

	#card {
		/* Positioning: */
		overflow-y: auto;
		max-height: 20vh;
		/* To give padding: */
		padding: 1rem 1rem 1rem 1rem;
	}

	nav {
		/* To make menu items evely spaced: */
		display: flex;
		align-items: stretch;
		justify-content: space-around;

		/* To make it always stay nicely on bottom:*/
		max-height: 3rem;

		/* Shape of menu bar: */
		border-radius: 4rem/1.3rem;

		/* Nueuromorphism: */
		padding: 10px 0 10px 0;
		margin: 5px 1rem 5px 1rem;
		background: linear-gradient(145deg, #cacaca, #f0f0f0);
		box-shadow:   inset 2px 2px 10px #a7a7a773,
			inset -3px -3px 10px #ffebeb73,
            10px 10px 10px #ffffffb2,
			inset -20px -20px 130px #ebebebb2;

	}

	section{
		/* This is to give padding between all the sections */
		padding-top: 1%;
	}

	.component {
		/* Removing all the default outlines: */
		border: 0;
  		outline:0;
		background: #e0e0e0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		color:rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe,
             -3px -3px 10px #ffffff;
	}
</style>
