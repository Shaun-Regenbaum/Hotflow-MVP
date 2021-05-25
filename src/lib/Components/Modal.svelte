<script>
	import { clickOutside } from '$lib/Components/Modal/clickoutside'
	import { fly } from 'svelte/transition'
	import { showModal } from '$lib/Components/Modal/showModal'
	
	export let title = "Modal title"
	
	const hide = () => $showModal = false
</script>

{#if $showModal}
	<div
			 class="modal"
			 transition:fly='{{y: 20}}'
			 use:clickOutside
			 on:click_outside='{() => $showModal = false}'
		>
		<div class="x-icon" on:click={hide}>
			<svg width="15" height="15" viewBox="0 0 64 64">
				<path d="M7 7L57 57M57 7L7 57" stroke="#bbb" stroke-width="13" stroke-linecap="round"/>
			</svg>
		</div>
		
		<div class="title">
			<h1>{title}</h1>
		</div>
		
		<div class="content">
			<slot name="content"><p>Woohoo, you're reading this text in a modal!</p></slot>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 300px;
		max-width: min(90vw, 500px);
		margin: 2em auto;
		
		background: white;
		box-shadow: 0 2px 10px 3px #0002;
		border-radius: 10px;
	}
	.title {
		min-height: max-content;
		line-height: 10px;
		font-size: 1em;
	}
	.content {
		border-bottom: 1px solid #0001;
		border-top: 1px solid #0001;
		line-height: 3em;
	}
	.content, .title {
		padding: 0 1em;
	}
	.x-icon {
		position: absolute;
		right: 0;
		padding: 0.75em;
		cursor: pointer;
	}
</style>