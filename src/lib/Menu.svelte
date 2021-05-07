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

<div id="menu">
	<section on:click="{minimize}" style="height: {minimized ? '1rem' : 'inherit'};">
		<!-- Right now we are essentially doing fancy css stuff to make an arrow, we may want to simplify that -->
		<button id='minimize' style='transform: rotate({minimized ? '225deg' : '45deg'});'></button>
	</section>
	<section style="display:{visible}">
		<div id="creator">
			<div id="picture" />
			<p id="name">{name}</p>
		</div>
	</section>
	<section style="display:{visible}">
		<div id="card">
			<svelte:component this={current_component.component} />
		</div>
	</section>
	<section style="display:{visible}">
		<nav>
			{#each components as component}
				<li style="display: inline;"><button on:click={switchComponent(component.name)}>{component.name}</button></li>
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
		grid-template-rows: auto auto 1fr auto;

		/* Size of Container: */
		width: 40%;
		max-width: 50%;
		max-height: 50vh;

		/* Colors: */
		background-color: #85ffbe; /* Fallback for older browsers */
		background-image: linear-gradient(45deg, #85c4ff98, #fffb7dc5);

		/* To round the top two corners: */
		border-radius: 40px 40px 0 0;
	}
	#minimize {
		/* Centering the Box/Arrow: */
		margin-left: 50%;

		/* Size of Box/Arrow */
		height: 1rem;
  		width: 1rem;

		/* Color of Box/Arrow: */
  		border-color:rgba(0, 213, 255, 0.527);
		background-color: rgba(0, 0, 0, 0);

		/* Transforming the border of a box into an arrow */
  		border-width: 0px 3px 3px 0px;

		/* Padding, to make it not rest on top on minimied: */
		padding: 0.4rem;
	}
	#creator {
		/* Size of container: */
		height: 100%;
		max-height: 5rem;

		/* Grid Layout: */
		display: grid;
		grid-template-columns: 20% 80%;
	}

	#picture {
		/* To make a perfect square: */
		width: 3rem;
		height: 0;
		padding-top: 3rem;
		/* To make the square circular: */
		border-radius: 50%;

		/* To center it: */
		margin: 0 auto;
		margin-top: 10%;
		margin-bottom: 10%;

		/* Colors: */
		background: linear-gradient(
			30deg,
			rgba(248, 4, 4, 0.609) 0%,
			rgba(167, 140, 20, 0.644) 45%,
			rgba(1, 85, 33, 0.623) 100%
		);
	}

	#name {
		/* To center: */
		margin: auto 0;
	}

	#card {
		/* Positioning: */
		overflow-y: auto;
		max-height: 20vh;
		/* To give padding: */
		padding: 0% 8% 0% 8%;
	}

	nav {
		/* To make menu items evely spaced: */
		display: flex;
		align-items: stretch;
		justify-content: space-around;

		/* To make it always stay nicely on bottom:*/
		max-height: 3rem;
	}

	section{
		/* This is to give padding between all the sections */
		padding-top: 1%;
	}
</style>
