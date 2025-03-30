<script>
  import {
    transcription,
    summary,
    currentStep,
    isLoading,
    error,
  } from "../stores/appStore";
  import LoadingSpinner from "./LoadingSpinner.svelte";

  let editedTranscription = $transcription;

  function goBack() {
    currentStep.set(1);
  }

  async function generateSummary() {
    if (!editedTranscription.trim()) {
      error.set("Transcription cannot be empty");
      return;
    }

    isLoading.set(true);
    error.set(null);

    try {
      const response = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcription: editedTranscription }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      summary.set(data.summary);
      transcription.set(editedTranscription);
      currentStep.set(3);
    } catch (err) {
      error.set(`Error: ${err.message}`);
    } finally {
      isLoading.set(false);
    }
  }
</script>

<div class="card">
  <h2>Transcription</h2>
  <p>Review and edit the transcription if needed</p>

  {#if $error}
    <div class="error-message">
      {$error}
    </div>
  {/if}

  {#if $isLoading}
    <LoadingSpinner message="Generating summary..." />
  {:else}
    <div class="transcription-container">
      <textarea
        bind:value={editedTranscription}
        placeholder="Transcription will appear here..."
        rows="10"
      ></textarea>

      <div class="word-count">
        {editedTranscription.trim().split(/\s+/).filter(Boolean).length} words
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
        Back
      </button>
      <button class="next-btn" on:click={generateSummary}>
        Generate Summary
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
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
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

  .transcription-container {
    position: relative;
    margin-bottom: 1.5rem;
  }

  textarea {
    width: 100%;
    min-height: 300px;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
  }

  .word-count {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    font-size: 0.75rem;
    color: var(--light-text);
    background-color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid var(--border-color);
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

  .next-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error-message {
    background-color: #fee2e2;
    color: var(--danger-color);
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }
</style>
