<script lang="ts">
	import FlowingGooVisual from '$lib/components/FlowingGoo.svelte';
	import { visualStore } from '$lib/stores/visualStore';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// subscribe to the store to get reactive values
	let storeState = $state<{ selectedVisual: string | null, selectedDuration: number | null }>({ 
		selectedVisual: null, 
		selectedDuration: null 
	});
	
	visualStore.subscribe(state => {
		storeState = state;
	});

	function handleMeditationComplete() {
		console.log('Meditation session complete!');
		//reset the store or navigate back
		visualStore.reset();
		goto(`${base}/visualOptions`);
	}

	//redirect if no duration selected
	$effect(() => {
		if (!storeState.selectedDuration || !storeState.selectedVisual) {
			console.log('No duration or visual selected, redirecting...');
			goto(`${base}/visualOptions`);
		}
	});
</script>

<div class="page-container">
	{#if storeState.selectedDuration && storeState.selectedVisual === 'flowing-goo'}
		<FlowingGooVisual 
			duration={storeState.selectedDuration} 
			onComplete={handleMeditationComplete}
		/>
	{:else}
		<div class="loading">Loading meditation...</div>
	{/if}
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

	.loading {
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>