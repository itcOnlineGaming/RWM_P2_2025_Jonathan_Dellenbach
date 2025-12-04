<script lang="ts">
  import { 
    VisualOption, 
    TimerOption,
    LavaLampVisual,
    FlowingGoo,
    Conclusion,
    visualStore
  } from '@my-srl/stress-timer';
  import { base } from '$app/paths';
  
  let currentStep = $state<'visual' | 'timer' | 'meditation' | 'conclusion'>('visual');
  let selectedVisual = $state<string | null>(null);
  let selectedDuration = $state<number | null>(null);
  
  // Subscribe to store
  let storeState = $state(visualStore.getState());
  visualStore.subscribe(state => {
    storeState = state;
  });
  
  function handleVisualSelect(visual: string) {
    selectedVisual = visual;
  }
  
  function handleVisualSubmit() {
    if (selectedVisual) {
      visualStore.setVisual(selectedVisual as any);
      currentStep = 'timer';
    }
  }
  
  function handleDurationSelect(duration: number) {
    selectedDuration = duration;
  }
  
  function handleTimerStart() {
    if (selectedDuration) {
      visualStore.setDuration(selectedDuration);
      visualStore.setMoodBefore('Stressed', 5);
      currentStep = 'meditation';
    }
  }
  
  function handleMeditationComplete() {
    currentStep = 'conclusion';
  }
  
  function handleReset() {
    visualStore.reset();
    selectedVisual = null;
    selectedDuration = null;
    currentStep = 'visual';
  }
</script>

<div class={currentStep === 'conclusion' ? 'page-container conclusion-bg' : 'page-container'}>
  {#if currentStep === 'visual'}
    <VisualOption 
      onSelect={handleVisualSelect}
      selectedVisual={selectedVisual}
      onSubmit={handleVisualSubmit}
    />
  {:else if currentStep === 'timer'}
    <TimerOption
      onSelect={handleDurationSelect}
      selectedDuration={selectedDuration}
      onStart={handleTimerStart}
      selectedVisual={selectedVisual}
    />
  {:else if currentStep === 'meditation'}
    {#if storeState.selectedVisual === 'lava-lamp'}
      <LavaLampVisual
        duration={storeState.selectedDuration || 60}
        onComplete={handleMeditationComplete}
      />
    {:else if storeState.selectedVisual === 'flowing-goo'}
      <FlowingGoo
        duration={storeState.selectedDuration || 60}
        onComplete={handleMeditationComplete}
      />
    {/if}
  {:else if currentStep === 'conclusion'}
    <Conclusion
      imagesPath="{base}/Images"
      onReset={handleReset}
    />
  {/if}
</div>

<style>
  .page-container {
    min-height: 100vh;
    width: 100vw;
    background-color: #e8a87c;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    box-sizing: border-box;
  }
  
  .conclusion-bg {
    background-color: white !important;
  }
</style>