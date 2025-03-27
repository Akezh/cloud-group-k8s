<script>
  import { onMount } from "svelte";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import {
    transcription,
    currentStep,
    isLoading,
    error,
  } from "../stores/appStore";

  let dragActive = false;
  let audioFile = null;
  let audioName = "";
  let audioPreview = null;
  let audioElement;

  onMount(() => {
    // Reset stores when component mounts
    transcription.set("");
    error.set(null);
  });

  function handleDragOver(e) {
    e.preventDefault();
    dragActive = true;
  }

  function handleDragLeave() {
    dragActive = false;
  }

  function handleDrop(e) {
    e.preventDefault();
    dragActive = false;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleFileInput(e) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }

  function handleFile(file) {
    if (!file.type.startsWith("audio/")) {
      error.set("Please upload an audio file");
      return;
    }

    audioFile = file;
    audioName = file.name;
    error.set(null);

    // Create audio preview
    const url = URL.createObjectURL(file);
    audioPreview = url;
  }

  async function uploadAudio() {
    if (!audioFile) {
      error.set("Please select an audio file");
      return;
    }

    isLoading.set(true);
    error.set(null);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      // const backendUrl = BACKEND_URL;
      // const response = await fetch(`${backendUrl}/api/transcribe`, {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await fetch(`/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      transcription.set(data.transcription);
      currentStep.set(2);
    } catch (err) {
      error.set(`Error: ${err.message}`);
    } finally {
      isLoading.set(false);
    }
  }

  function removeAudio() {
    audioFile = null;
    audioName = "";
    audioPreview = null;
    error.set(null);
  }
</script>

<div class="card">
  <h2>Upload Audio</h2>
  <p>Upload an audio file to transcribe its content</p>

  {#if $error}
    <div class="error-message">
      {$error}
    </div>
  {/if}

  {#if $isLoading}
    <LoadingSpinner message="Transcribing audio..." />
  {:else if !audioFile}
    <!-- File upload area -->
    <div
      class="upload-area"
      class:active={dragActive}
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      on:drop={handleDrop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
      <p>Drag and drop your audio file here</p>
      <p class="or">or</p>
      <label class="file-input-label">
        Browse Files
        <input
          type="file"
          accept="audio/*"
          on:change={handleFileInput}
          style="display: none;"
        />
      </label>
      <p class="file-types">Supported formats: MP3, WAV, M4A, FLAC</p>
    </div>
  {:else}
    <!-- Audio preview -->
    <div class="audio-preview">
      <div class="file-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"
          ></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0z"></path>
          <path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0z"></path>
          <path d="M2 19v-3a6 6 0 0 1 12 0v3"></path>
        </svg>
        <div>
          <p class="file-name">{audioName}</p>
          <p class="file-size">
            {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
        <button class="remove-btn" on:click={removeAudio}>
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <audio
        controls
        src={audioPreview}
        bind:this={audioElement}
        class="audio-player"
      ></audio>
    </div>

    <button class="submit-btn" on:click={uploadAudio}>
      Transcribe Audio
    </button>
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

  .upload-area {
    border: 2px dashed var(--border-color);
    border-radius: 0.5rem;
    padding: 2.5rem;
    text-align: center;
    transition: all 0.2s;
    cursor: pointer;
  }

  .upload-area.active {
    border-color: var(--primary-color);
    background-color: rgba(79, 70, 229, 0.05);
  }

  .upload-area svg {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .upload-area p {
    margin-bottom: 0.5rem;
  }

  .or {
    margin: 0.75rem 0;
    font-size: 0.875rem;
  }

  .file-input-label {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 1rem;
  }

  .file-input-label:hover {
    background-color: var(--primary-hover);
  }

  .file-types {
    font-size: 0.75rem;
    color: var(--light-text);
    margin-top: 1rem;
  }

  .audio-preview {
    margin-bottom: 1.5rem;
  }

  .file-info {
    display: flex;
    align-items: center;
    background-color: var(--secondary-color);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .file-info svg {
    color: var(--primary-color);
    margin-right: 1rem;
  }

  .file-name {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .file-size {
    font-size: 0.75rem;
    color: var(--light-text);
    margin: 0;
  }

  .remove-btn {
    margin-left: auto;
    background: none;
    color: var(--light-text);
    padding: 0.25rem;
    border-radius: 0.25rem;
  }

  .remove-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .audio-player {
    width: 100%;
    margin-top: 1rem;
  }

  .submit-btn {
    width: 100%;
    margin-top: 1rem;
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
