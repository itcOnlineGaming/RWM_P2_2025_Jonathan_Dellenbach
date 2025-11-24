<script lang="ts">
	import VisualSelector from '$lib/components/VisualOption.svelte';
	import { visualStore } from '$lib/stores/visualStore';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Subscribe to the store to get the current selected visual
	let selectedVisual = $state<string | null>($visualStore.selectedVisual);

	function handleVisualSelect(visual: string) {
		selectedVisual = visual;
		// Save to store immediately when user selects
		visualStore.setVisual(visual as 'lava-lamp' | 'flowing-goo');
	}

	function handleSubmit() {
		if (selectedVisual) {
			// Store is already updated, so we can navigate
			console.log('Selected visual stored:', selectedVisual);
			
			// Navigate to the next page
			goto(`${base}/timerOptions`);
			
			// For now, just show confirmation
			alert(`Visual "${selectedVisual}" has been saved!`);
		}
	}
</script>

<div class="page-container">
	<VisualSelector 
		onSelect={handleVisualSelect} 
		selectedVisual={selectedVisual}
		onSubmit={handleSubmit}
	/>
</div>

<style>
	.page-container {
		height: 100vh;
		width: 100vw;
		background-color: #d2612f;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>