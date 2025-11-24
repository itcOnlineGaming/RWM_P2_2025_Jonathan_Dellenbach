<script lang="ts">
	interface Props {
		onSelect: (duration: number) => void;
		selectedDuration?: number | null;
		onStart?: () => void;
		selectedVisual?: string | null;
	}

	let { onSelect, selectedDuration = null, onStart, selectedVisual = null }: Props = $props();

	const durations = [
		{ value: 30, label: '30', unit: 'Sec' },
		{ value: 180, label: '3', unit: 'Min' },
		{ value: 300, label: '5', unit: 'Min' },
		{ value: 600, label: '10', unit: 'Min' },
		{ value: 900, label: '15', unit: 'Min' }
	];

	function handleSelect(duration: number) {
		onSelect(duration);
	}
</script>

<div class="timer-selector">
	<div class="visual-display-container">
		<div class="visual-box">
			{#if selectedVisual === 'lava-lamp'}
				<div class="placeholder lava-lamp"></div>
			{:else if selectedVisual === 'flowing-goo'}
				<div class="placeholder flowing-goo"></div>
			{:else}
				<div class="visual-placeholder">No visual selected</div>
			{/if}
		</div>
	</div>

	<h1>How long would you like to meditate?</h1>
	
	<div class="duration-options">
		{#each durations as duration}
			<button
				class="duration-button"
				class:selected={selectedDuration === duration.value}
				onclick={() => handleSelect(duration.value)}
			>
				<div class="duration-number">{duration.label}</div>
				<div class="duration-unit">{duration.unit}</div>
			</button>
		{/each}
	</div>

	<button
		class="start-button"
		onclick={onStart}
		disabled={selectedDuration === null}
	>
		Start
	</button>
</div>

<style>
	.timer-selector {
		text-align: center;
		background: #f9eae6;
		padding: 2.5rem 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		max-width: 600px;
		width: 100%;
	}

	.visual-display-container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.visual-box {
		width: 200px;
		height: 200px;
		border: 3px solid #2196F3;
		border-radius: 8px;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.placeholder {
		width: 60%;
		height: 60%;
	}

	.placeholder.lava-lamp {
		background-color: #5DBBDE;
		border-radius: 60% 40% 50% 50%;
	}

	.placeholder.flowing-goo {
		background-color: #E84545;
		border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		width: 80%;
		height: 80%;
	}

	.visual-placeholder {
		color: #999;
		font-size: 1rem;
	}

	h1 {
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.duration-options {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.duration-button {
		background-color: #d2612f;
		color: white;
		border: none;
		border-radius: 8px;
		padding: 1rem 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 80px;
		box-shadow: 0 3px 8px rgba(210, 97, 47, 0.3);
	}

	.duration-button:hover {
		background-color: #b84f23;
		transform: translateY(-2px);
		box-shadow: 0 5px 12px rgba(210, 97, 47, 0.4);
	}

	.duration-button.selected {
		background-color: #4CAF50;
		box-shadow: 0 5px 12px rgba(76, 175, 80, 0.4);
		transform: translateY(-2px);
	}

	.duration-number {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 0.25rem;
	}

	.duration-unit {
		font-size: 0.875rem;
		font-weight: 500;
		opacity: 0.9;
	}

	.start-button {
		padding: 0.875rem 3rem;
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1.125rem;
		box-shadow: 0 3px 8px rgba(76, 175, 80, 0.3);
		transition: all 0.3s ease;
		cursor: pointer;
		width: 100%;
		max-width: 400px;
	}

	.start-button:hover:not(:disabled) {
		background-color: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 5px 12px rgba(76, 175, 80, 0.4);
	}

	.start-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		opacity: 0.6;
		box-shadow: none;
	}

	@media (max-width: 600px) {
		.timer-selector {
			padding: 2rem 1.5rem;
		}

		.visual-box {
			width: 150px;
			height: 150px;
		}

		h1 {
			font-size: 1.25rem;
		}

		.duration-options {
			gap: 0.75rem;
		}

		.duration-button {
			min-width: 70px;
			padding: 0.875rem 1.25rem;
		}

		.duration-number {
			font-size: 1.25rem;
		}
	}
</style>