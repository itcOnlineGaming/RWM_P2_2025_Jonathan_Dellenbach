<script lang="ts">
	interface Props {
		duration: number; // duration in seconds
		onComplete?: () => void;
	}

	let { duration, onComplete }: Props = $props();

	let timeRemaining = $state(duration);
	let isPaused = $state(false);
	let phase = $state<'expand' | 'hold-top' | 'contract' | 'hold-bottom'>('expand');
	let cycleCount = $state(0);
	let width = $state(40); // width as percentage
	let flowOffset = $state(0);

	let startTime: number;
	let pausedTime = 0;
	let pauseStartTime = 0;
	let animationFrameId: number;

	const totalCycles = Math.floor(duration / 12); // 12-second cycles for 4-2-4-2 pattern
	const WAVE_PERIOD = 30; // Wave repeats every 30 units for seamless loop

	function animate() {
		if (!isPaused) {
			const elapsed = (Date.now() - startTime - pausedTime) / 1000;
			const remaining = Math.max(0, duration - elapsed);
			timeRemaining = remaining;

			// Calculate current position in the 12-second cycle
			const cyclePosition = elapsed % 12;
			const currentCycle = Math.floor(elapsed / 12);
			
			cycleCount = currentCycle;

			// Continuous flowing animation - seamless loop that repeats every WAVE_PERIOD
			flowOffset = (elapsed * 15) % WAVE_PERIOD;

			// Determine phase and width based on position in cycle
			if (cyclePosition < 4) {
				// Breathe In: 0-4 seconds
				phase = 'expand';
				// Expand: 40% to 70% over 4 seconds
				width = 40 + (cyclePosition / 4) * 30;
			} else if (cyclePosition < 6) {
				// Hold (at top): 4-6 seconds
				phase = 'hold-top';
				// Hold: stay at 70%
				width = 70;
			} else if (cyclePosition < 10) {
				// Breathe Out: 6-10 seconds
				phase = 'contract';
				// Contract: 70% to 40% over 4 seconds
				const contractProgress = (cyclePosition - 6) / 4;
				width = 70 - (contractProgress * 30);
			} else {
				// Hold (at bottom): 10-12 seconds
				phase = 'hold-bottom';
				// Hold: stay at 40%
				width = 40;
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
			case 'hold-top':
			case 'hold-bottom':
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
			case 'hold-top':
			case 'hold-bottom':
				return '2 seconds';
			case 'contract':
				return '4 seconds';
			default:
				return '';
		}
	}

	// Generate seamless wave path that loops perfectly
	function generateWavePath(leftX: number, rightX: number, offset: number): string {
		const segments = 8; // Number of wave segments to cover the visible area
		let path = `M ${leftX} ${-WAVE_PERIOD + offset}`;
		
		// Create smooth wave on left edge
		for (let i = 0; i < segments; i++) {
			const y = -WAVE_PERIOD + offset + (i * WAVE_PERIOD);
			const y1 = y + WAVE_PERIOD * 0.25;
			const y2 = y + WAVE_PERIOD * 0.75;
			const y3 = y + WAVE_PERIOD;
			
			path += ` C ${leftX - 6} ${y1}, ${leftX + 6} ${y2}, ${leftX} ${y3}`;
		}
		
		// Connect to right side at bottom
		path += ` L ${rightX} ${-WAVE_PERIOD + offset + (segments * WAVE_PERIOD)}`;
		
		// Create smooth wave on right edge going back up
		for (let i = segments - 1; i >= 0; i--) {
			const y = -WAVE_PERIOD + offset + (i * WAVE_PERIOD);
			const y1 = y + WAVE_PERIOD * 0.75;
			const y2 = y + WAVE_PERIOD * 0.25;
			const y3 = y;
			
			path += ` C ${rightX + 6} ${y1}, ${rightX - 6} ${y2}, ${rightX} ${y3}`;
		}
		
		path += ' Z';
		return path;
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
	</div>

	<div class="visual-display-container">
		<div class="visual-box">
			<svg class="river-svg" viewBox="0 0 100 200" preserveAspectRatio="none">
				<defs>
					<linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style="stop-color:#E84545;stop-opacity:0.9" />
						<stop offset="50%" style="stop-color:#E84545;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#E84545;stop-opacity:0.9" />
					</linearGradient>
				</defs>
				<!-- Flowing goo with seamless waves -->
				<path
					d={generateWavePath(50 - width/2, 50 + width/2, flowOffset)}
					fill="url(#riverGradient)"
				/>
			</svg>
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
		position: relative;
	}

	.river-svg {
		width: 100%;
		height: 100%;
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