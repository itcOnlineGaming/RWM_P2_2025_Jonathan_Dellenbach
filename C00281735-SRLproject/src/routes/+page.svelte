<script lang="ts">
  import { base } from '$app/paths';
  import { visualStore } from '$lib/stores/visualStore';

  let selectedMood = $state<string | null>(null);
  let selectedIntensity = $state<number>(3);

  const moods = [
    { id: 'stress', label: 'Stressed', color: '#E91E63', intensity: 5, icon: 'stressed.svg' },
    { id: 'bad', label: 'little stressed', color: '#FF69B4', intensity: 4, icon: 'bad.svg' },
    { id: 'okay', label: 'Okay', color: '#FFA500', intensity: 3, icon: 'okay.svg' },
    { id: 'good', label: 'good', color: '#FFD700', intensity: 2, icon: 'good.svg' },
    { id: 'notStressed', label: 'Not Stressed', color: '#9ACD32', intensity: 1, icon: 'notStressed.svg' }
  ];

  function selectMood(moodLabel: string, intensity: number) {
    selectedMood = moodLabel;
    selectedIntensity = intensity;
    // Save to store
    visualStore.setMoodBefore(moodLabel, intensity);
  }
</script>

<div class="context-container">
  <h1>Background</h1>
  <p>I am a 4th year in Computer Games Development. 
    I are working on a project called Self Regulated Learning (SRL), 
    where I need to design and develop a component under different SRL headings. 
    I am working under the heading of emotional management.</p>
  <h1>Visual Meditation Component</h1>
  <p>This component specifically is a visual meditation excercise to help visual users de-stress. 
     Users can access a guided meditation session when they need to relax.
  </p>
</div>

<div class="mood-section">
  <h1>How Are You Feeling?</h1>
  
  <div class="spectrum-container">
    <span class="spectrum-label">Stressed</span>
    
    <div class="mood-buttons">
      {#each moods as mood}
        <button
          class="mood-button"
          class:selected={selectedMood === mood.label}
          style="--mood-color: {mood.color}"
          onclick={() => selectMood(mood.label, mood.intensity)}
        >
        <img 
          src={`${base}/Images/${mood.icon}`} 
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

<div class="container">
  <div class="button-container">
    <a href={`${base}/visualOptions`} class="submit-button">Go to Component!</a>
  </div>
</div>

<style>
  .context-container {
    padding-top: 2rem;
    max-width: 600px;
    margin: 2rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    text-align: center;
  }

  .mood-section {
    max-width: 800px;
    margin: 1rem auto;
    padding: 1rem;
    text-align: center;
  }

  .mood-section h1 {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .spectrum-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .spectrum-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
    white-space: nowrap;
  }

  .mood-buttons {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
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
    margin-top: 2rem;
    font-size: 1.25rem;
    color: #666;
  }

  .feedback strong {
    color: #333;
    text-transform: capitalize;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    width: 100rem;
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
  }

  .submit-button:hover {
    background-color: #59a155;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .mood-section h1 {
      font-size: 1.5rem;
    }

    .spectrum-container {
      flex-direction: column;
      gap: 1rem;
    }

    .mood-buttons {
      gap: 1rem;
    }

    .mood-button {
      width: 60px;
      height: 60px;
    }
  }
</style>