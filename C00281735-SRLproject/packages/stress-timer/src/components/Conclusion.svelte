<script lang="ts">
  import { visualStore } from '../stores/visualStore';

  interface Props {
    imagesPath?: string;
    onReset?: () => void;
  }

  let { imagesPath = 'Images', onReset }: Props = $props();

  let selectedMood = $state<string | null>(null);
  let selectedIntensity = $state<number>(3);

  const moods = [
    { id: 'stress', label: 'Stressed', color: '#E91E63', intensity: 5, icon: 'stressed.svg' },
    { id: 'bad', label: 'little stressed', color: '#FF69B4', intensity: 4, icon: 'bad.svg' },
    { id: 'okay', label: 'Okay', color: '#FFA500', intensity: 3, icon: 'okay.svg' },
    { id: 'good', label: 'Good', color: '#FFD700', intensity: 2, icon: 'good.svg' },
    { id: 'notStressed', label: 'Not Stressed', color: '#9ACD32', intensity: 1, icon: 'notStressed.svg' }
  ];

  let storeState = $state(visualStore.getState());

  visualStore.subscribe(state => {
    storeState = state;
  });

  function selectMood(moodLabel: string, intensity: number) {
    selectedMood = moodLabel;
    selectedIntensity = intensity;
    visualStore.setMoodAfter(moodLabel, intensity);
  }
</script>

<div class="conclusion-container">

  <div class="context-container">
    <h1>Thank You For Using My Component</h1>
    <p>Take a moment to notice how you feel.</p>

    <h2>About This Component</h2>
    <p>
      Thank you for testing my Visual Meditation Component.<br />
      I am a 4th year Computer Games Development student working on a Self Regulated Learning (SRL)
      project focused on emotional management.
    </p>

    <h2>Purpose</h2>
    <p>
      This visual meditation exercise is designed to help users de-stress through guided visual breathing.
      The 4-2-4-2 breathing pattern helps activate the body's relaxation response and supports emotional regulation.
    </p>
  </div>

  <div class="mood-comparison-section">
    {#if storeState.moodBefore}
      <div class="before-mood">
        <h2>Before Meditation</h2>
        <p>You felt: <strong>{storeState.moodBefore}</strong></p>
      </div>
    {/if}

    <div class="mood-section">
      <h2>How Are You Feeling Now?</h2>

      <div class="spectrum-container">
        <span class="spectrum-label">Stressed</span>

        <div class="mood-buttons-wrapper">
          {#each moods as mood}
            <button
              class="mood-button"
              class:selected={selectedMood === mood.label}
              style="--mood-color: {mood.color}"
              onclick={() => selectMood(mood.label, mood.intensity)}
            >
              <img
                src={`${imagesPath}/${mood.icon}`}
                alt={mood.label}
                class="mood-icon"
              />
            </button>
          {/each}
        </div>

        <span class="spectrum-label">Not Stressed</span>
      </div>

      {#if selectedMood}
        <p class="feedback">You selected: <strong>{selectedMood}</strong></p>
      {/if}
    </div>

    {#if storeState.moodBefore && selectedMood}
      <div class="improvement-message">
        {#if storeState.intensityBefore && selectedIntensity < storeState.intensityBefore}
          <p class="positive">Great! You're feeling less stressed!</p>
        {:else if storeState.intensityBefore && selectedIntensity === storeState.intensityBefore}
          <p class="neutral">You're feeling about the same. Keep practicing!</p>
        {:else}
          <p class="neutral">Remember, meditation is a practice. Keep it up!</p>
        {/if}
      </div>
    {/if}
  </div>

  <div class="container">
    <div class="button-container">
      {#if onReset}
        <button class="submit-button" onclick={onReset}>Go To The Start!</button>
      {:else}
        <a href="../" class="submit-button">Go To The Start!</a>
      {/if}
    </div>
  </div>
</div>

<style>
  .conclusion-container {
    max-width: 800px;
    width: 100%;
  }

  .context-container {
    max-width: 600px;
    margin: 1rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    text-align: center;
  }

  .mood-comparison-section {
    max-width: 600px;
    margin: 1rem auto;
    padding: 1rem;
    text-align: center;
  }

  .before-mood {
    background: rgba(33, 150, 243, 0.1);
    padding: 0.1rem 1rem;
    border-radius: 8px;
    margin: 0rem auto;
    border-left: 4px solid #2196f3;
    max-width: 400px;
    text-align: center;
  }

  .before-mood h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .before-mood p {
    font-size: 1.25rem;
    color: #666;
  }

  .before-mood strong {
    color: #2196f3;
    text-transform: capitalize;
  }

  .mood-section {
    margin: 1rem 0;
  }

  .mood-section h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .spectrum-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    gap: 1rem;
  }

  .mood-buttons-wrapper {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex: 1;
  }

  .spectrum-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
    white-space: nowrap;
  }

  .mood-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border: 3px solid var(--mood-color);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
  }

  .mood-button:hover {
    transform: scale(1.1);
  }

  .mood-button.selected {
    background: var(--mood-color);
  }

  .mood-icon {
    width: 60%;
    height: 60%;
    object-fit: contain;
    pointer-events: none;
  }

  .feedback {
    margin-top: 0.5rem;
    font-size: 1.25rem;
    color: #666;
  }

  .feedback strong {
    color: #333;
    text-transform: capitalize;
  }

  .improvement-message {
    margin: 1.5rem auto;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    background: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4caf50;
    max-width: 500px;
    text-align: center;
  }

  .improvement-message p {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }

  .improvement-message .positive {
    color: #4caf50;
  }

  .improvement-message .neutral {
    color: #666;
  }

  .container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
  }

  .submit-button {
    padding: 1rem 2rem;
    background-color: #69bd64;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-block;
  }

  .submit-button:hover {
    background-color: #59a155;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .mood-section h2 {
      font-size: 1.25rem;
    }

    .spectrum-container {
      flex-direction: column;
      gap: 1rem;
    }

    .mood-button {
      width: 60px;
      height: 60px;
    }

    .before-mood h2,
    .feedback,
    .improvement-message p {
      font-size: 1rem;
    }
  }
</style>
