<script>
	export let left = 100;
	export let top = 100;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			left -= e.movementX;
			top -= e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 5px gray;
		position: absolute;
        width: 9vw;
        height: 2vh;
        text-align: center;
	}
</style>

<section on:mousedown={onMouseDown} style="right: {left}px; bottom: {top}px;" class="draggable">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />