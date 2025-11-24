<script lang="ts">
	interface Props {
		onSelect: (visual: string) => void;
		selectedVisual?: string | null;
		onSubmit?: () => void;
	}

	let { onSelect, selectedVisual = null, onSubmit }: Props = $props();

	function handleSelect(visual: string) {
		onSelect(visual);
	}
</script>

<div class="visual-selector">
	<h1>Which Visual Would You Like</h1>
	
	<div class="visual-options">
		<button
			class="visual-option"
			class:selected={selectedVisual === 'lava-lamp'}
			onclick={() => handleSelect('lava-lamp')}
		>
			<div class="visual-box">
				<div class="placeholder lava-lamp"></div>
			</div>
			<span class="visual-label">Lava Lamp</span>
		</button>

		<button
			class="visual-option"
			class:selected={selectedVisual === 'flowing-goo'}
			onclick={() => handleSelect('flowing-goo')}
		>
			<div class="visual-box">
				<div class="placeholder flowing-goo"></div>
			</div>
			<span class="visual-label">Flowing Goo</span>
		</button>
	</div>

	<div class="button-container">
		<button
			class="submit-button"
			onclick={onSubmit}
			disabled={selectedVisual === null}
		>
			Continue
		</button>
	</div>
</div>

<style>
	.visual-selector {
		text-align: center;
		background: #f9eae6;
		padding: 2.5rem 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		max-width: 600px;
		width: 100%;
	}

	h1 {
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.visual-options {
		display: flex;
		gap: 2rem;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.visual-option {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: transform 0.2s ease;
	}

	.visual-option:hover {
		transform: scale(1.05);
	}

	.visual-option.selected .visual-box {
		border-color: #4CAF50;
		border-width: 4px;
		box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
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
		margin-bottom: 0.75rem;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.placeholder {
		width: 60%;
		height: 60%;
		border-radius: 50%;
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

	.visual-label {
		display: block;
		font-size: 1rem;
		color: #333;
		font-weight: 500;
	}

	.button-container {
		display: flex;
		justify-content: center;
		margin-top: 1.5rem;
	}

	.submit-button {
		padding: 0.875rem 3rem;
		background-color: #d2612f;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1rem;
		box-shadow: 0 3px 8px rgba(210, 97, 47, 0.3);
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.submit-button:hover:not(:disabled) {
		background-color: #b84f23;
		transform: translateY(-2px);
		box-shadow: 0 5px 12px rgba(210, 97, 47, 0.4);
	}

	.submit-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		opacity: 0.6;
		box-shadow: none;
	}

	@media (max-width: 600px) {
		.visual-selector {
			padding: 2rem 1.5rem;
		}

		.visual-options {
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
		}

		.visual-box {
			width: 150px;
			height: 150px;
		}

		h1 {
			font-size: 1.25rem;
		}
	}
</style>