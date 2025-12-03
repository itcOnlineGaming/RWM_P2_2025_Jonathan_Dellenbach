<script lang="ts">
	import TimerOption from '$lib/components/TimerOption.svelte';
	import { visualStore } from '$lib/stores/visualStore';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	//get the selected visual from the store
	let selectedVisual = $state<string | null>($visualStore.selectedVisual);
	let selectedDuration = $state<number | null>(null);

	function handleDurationSelect(duration: number) {
		selectedDuration = duration;
		// save duration to store
		visualStore.setDuration(duration);
	}

	function handleStart() {
		if (selectedDuration && selectedVisual) {
			console.log('Starting meditation:', {
				visual: selectedVisual,
				duration: selectedDuration
			});
			
			console.log('Stored state:', visualStore.getState());
			
			// Navigate to the correct visual page based on selection
			if (selectedVisual === 'lava-lamp') {
				goto(`${base}/lavaLampVisual`);
			} else if (selectedVisual === 'flowing-goo') {
				goto(`${base}/flowingGooVisual`);
			}
		}
	}

	$effect(() => {
		if (!selectedVisual) {
			console.log('No visual selected, redirecting...');
			goto(`${base}/visualOptions`);
		}
	});
</script>

<div class="page-container">
	<TimerOption 
		onSelect={handleDurationSelect} 
		selectedDuration={selectedDuration}
		onStart={handleStart}
		selectedVisual={selectedVisual}
	/>
</div>

<style>
	.page-container {
		min-height: 100vh;
		width: 100vw;
		background-color: #e8a87c;;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		box-sizing: border-box;
	}
</style>