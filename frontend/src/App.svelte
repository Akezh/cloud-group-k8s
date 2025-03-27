<script>
  import Header from "./components/Header.svelte";
  import AudioUploader from "./components/AudioUploader.svelte";
  import Transcription from "./components/Transcription.svelte";
  import Summary from "./components/Summary.svelte";
  import Footer from "./components/Footer.svelte";
  import { transcription, summary, currentStep } from "./stores/appStore";
</script>

<Header />

<main class="container">
  <div class="app-container">
    <div class="steps">
      <div class="step" class:active={$currentStep >= 1}>
        <div class="step-number">1</div>
        <div class="step-label">Upload Audio</div>
      </div>
      <div class="step-connector"></div>
      <div class="step" class:active={$currentStep >= 2}>
        <div class="step-number">2</div>
        <div class="step-label">Transcription</div>
      </div>
      <div class="step-connector"></div>
      <div class="step" class:active={$currentStep >= 3}>
        <div class="step-number">3</div>
        <div class="step-label">Summary</div>
      </div>
    </div>

    {#if $currentStep === 1}
      <AudioUploader />
    {:else if $currentStep === 2}
      <Transcription />
    {:else if $currentStep === 3}
      <Summary />
    {/if}
  </div>
</main>

<Footer />

<style>
  main {
    padding: 2rem 0;
    min-height: calc(100vh - 140px);
  }

  .app-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  .step.active {
    opacity: 1;
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .step-label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .step-connector {
    flex-grow: 1;
    height: 2px;
    background-color: var(--border-color);
    margin: 0 1rem;
    position: relative;
    top: -10px;
  }
</style>
