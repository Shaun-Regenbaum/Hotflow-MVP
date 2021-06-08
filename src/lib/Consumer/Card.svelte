<!--  @component Balance_Card

	A small card that contains the balance of a user, and then either a purchase button, or a refund button. This component does not make its own API calls. It requires data from the parent. 
    
    When the butons are click in this component, they simply create events that should be caught by the parent to be acted upon. 

	@example 
	<Blurb purchased={false} balance={0.40} price={price}/>

 -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Optional:
	export let purchased = true;
	export let balance = 40;
	// Required:
	export let price: number;

	const dispatch = createEventDispatcher();
</script>

<div id="container">
	<div id="balance_container">
		<p style="font-size: 0.8rem">Your Balance:</p>
		<p style="font-size: 2rem">
			$ {Number(balance / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
		</p>
	</div>
	<!-- This is where the interative/actionable section is: -->
	<div id="action_container">
		{#if purchased}
			<button
				on:click={() => {
					dispatch('refund');
				}}
			>
				Refund ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
			</button>
		{:else}
			<button
				on:click={() => {
					dispatch('purchase');
				}}
			>
				Purchase for ${Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
			</button>
		{/if}
	</div>
</div>

<style>
	#container {
		/* LAYOUT: */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 250px;
		height: fit-content;
		padding: 20px;
		margin: 0 auto;

		/* DESIGN: */
		border-radius: 25px;
		background-color: rgb(255, 161, 250);
	}
	#balance_container {
		/* LAYOUT: */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 10px 0 30px 15px;
	}

	#action_container {
		align-self: center;
	}
	p {
		margin: 0.1rem 0;
	}

	button {
		font-size: 1.1rem;
		width: 200px;
		box-shadow: none;
	}
</style>
