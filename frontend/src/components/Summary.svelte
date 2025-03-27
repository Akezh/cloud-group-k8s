<script>
  import { transcription, summary, currentStep } from "../stores/appStore";

  function goBack() {
    currentStep.set(2);
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showCopyNotification();
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  let copyNotification = false;
  function showCopyNotification() {
    copyNotification = true;
    setTimeout(() => {
      copyNotification = false;
    }, 2000);
  }

  function startOver() {
    currentStep.set(1);
  }
</script>

<div class="card">
  <h2>Summary</h2>
  <p>Here's the AI-generated summary of your transcription</p>

  <div class="summary-container">
    <div class="summary-header">
      <h3>Summary</h3>
      <button class="copy-btn" on:click={() => copyToClipboard($summary)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          ></path>
        </svg>
        Copy
      </button>
    </div>
    <div class="summary-text">
      {$summary}
    </div>
  </div>

  <div class="original-container">
    <div class="summary-header">
      <h3>Original Transcription</h3>
      <button class="copy-btn" on:click={() => copyToClipboard($transcription)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          ></path>
        </svg>
        Copy
      </button>
    </div>
    <div class="original-text">
      {$transcription}
    </div>
  </div>

  <div class="actions">
    <button class="back-btn" on:click={goBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to Transcription
    </button>
    <button class="start-over-btn" on:click={startOver}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 2v6h6"></path>
        <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
      </svg>
      Start Over
    </button>
  </div>

  {#if copyNotification}
    <div class="copy-notification">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied to clipboard!
    </div>
  {/if}
</div>

<style>
  h2 {
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--light-text);
    margin-bottom: 1.5rem;
  }

  .summary-container,
  .original-container {
    background-color: var(--secondary-color);
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }

  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #e5e7eb;
    border-bottom: 1px solid var(--border-color);
  }

  .summary-header h3 {
    font-size: 1rem;
    margin: 0;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    color: var(--text-color);
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }

  .copy-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .summary-text,
  .original-text {
    padding: 1rem;
    white-space: pre-wrap;
    line-height: 1.6;
  }

  .summary-text {
    font-weight: 500;
  }

  .original-text {
    max-height: 200px;
    overflow-y: auto;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--secondary-color);
    color: var(--text-color);
  }

  .back-btn:hover {
    background-color: #e5e7eb;
  }

  .start-over-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--primary-color);
  }

  .copy-notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--success-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 1rem);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
