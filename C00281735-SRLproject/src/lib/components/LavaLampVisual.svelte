<script lang="ts">
	interface Props {
		duration: number; // duration in seconds
		onComplete?: () => void;
	}

	let { duration, onComplete }: Props = $props();

	let timeRemaining = $state(duration);
	let isPaused = $state(false);
	let phase = $state<'expand' | 'hold' | 'contract'>('expand');
	let cycleCount = $state(0);
	let scale = $state(0.5);

	let startTime: number;
	let pausedTime = 0;
	let pauseStartTime = 0;
	let animationFrameId: number;

	const totalCycles = Math.floor(duration / 10);

	function animate() {
		if (!isPaused) {
			const elapsed = (Date.now() - startTime - pausedTime) / 1000;
			const remaining = Math.max(0, duration - elapsed);
			timeRemaining = remaining;

			//calculate current position in the 10-second cycle
			const cyclePosition = elapsed % 10;
			const currentCycle = Math.floor(elapsed / 10);
			
			cycleCount = currentCycle;

			//determine phase and scale based on position in cycle
			if (cyclePosition < 4) {
				phase = 'expand';
				//expand: 0.5 to 1.0 over 4 seconds
				scale = 0.5 + (cyclePosition / 4) * 0.5;
			} else if (cyclePosition < 6) {
				phase = 'hold';
				//hold: stay at 1.0
				scale = 1.0;
			} else {
				phase = 'contract';
				//contract: 1.0 to 0.5 over 4 seconds
				const contractProgress = (cyclePosition - 6) / 4;
				scale = 1.0 - (contractProgress * 0.5);
			}

			if (remaining > 0) {
				animationFrameId = requestAnimationFrame(animate);
			} else {
				onComplete?.();
			}
		}
	}

	function togglePause() {
		if (isPaused) {
			pausedTime += Date.now() - pauseStartTime;
		} else {
			pauseStartTime = Date.now();
		}
		isPaused = !isPaused;
		if (!isPaused) {
			animationFrameId = requestAnimationFrame(animate);
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function getPhaseInstruction(): string {
		switch (phase) {
			case 'expand':
				return 'Breathe In';
			case 'hold':
				return 'Hold';
			case 'contract':
				return 'Breathe Out';
			default:
				return '';
		}
	}

	function getPhaseDuration(): string {
		switch (phase) {
			case 'expand':
				return '4 seconds';
			case 'hold':
				return '2 seconds';
			case 'contract':
				return '4 seconds';
			default:
				return '';
		}
	}

	$effect(() => {
		startTime = Date.now();
		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	});
</script>

<div class="meditation-container">
	<div class="timer-display">
		<div class="time-remaining">{formatTime(timeRemaining)}</div>
		<div class="cycle-info">Cycle {cycleCount + 1} of {totalCycles}</div>
	</div>

	<div class="visual-display-container">
		<div class="visual-box">
			<div 
				class="lava-lamp"
				style="transform: scale({scale});"
			></div>
		</div>
	</div>

	<div class="instruction-container">
		<div class="phase-instruction">{getPhaseInstruction()}</div>
		<div class="phase-duration">{getPhaseDuration()}</div>
	</div>

	<button class="pause-button" onclick={togglePause}>
		{isPaused ? 'Resume' : 'Pause'}
	</button>
</div>

<style>
	.meditation-container {
		text-align: center;
		background: #f9eae6;
		padding: 2.5rem 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		max-width: 600px;
		width: 100%;
	}

	.timer-display {
		margin-bottom: 2rem;
	}

	.time-remaining {
		font-size: 2.5rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.cycle-info {
		font-size: 1.125rem;
		color: #666;
	}

	.visual-display-container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.visual-box {
		width: 320px;
		height: 320px;
		border: 3px solid #2196F3;
		border-radius: 8px;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.lava-lamp {
		width: 60%;
		height: 60%;
		background-color: #5DBBDE;
		border-radius: 60% 40% 50% 50%;
		transition: transform 1s ease-in-out;
	}

	.instruction-container {
		margin-bottom: 2rem;
	}

	.phase-instruction {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.phase-duration {
		font-size: 0.875rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pause-button {
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

	.pause-button:hover {
		background-color: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 5px 12px rgba(76, 175, 80, 0.4);
	}

	@media (max-width: 600px) {
		.meditation-container {
			padding: 2rem 1.5rem;
		}

		.visual-box {
			width: 240px;
			height: 240px;
		}

		.time-remaining {
			font-size: 2rem;
		}

		.phase-instruction {
			font-size: 1.5rem;
		}
	}
</style>