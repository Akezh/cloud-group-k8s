<script>
  export let message = "Loading...";
</script>

<div class="spinner-container">
  <div class="spinner"></div>
  <p>{message}</p>
</div>

<style>
  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(79, 70, 229, 0.2);
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }

  p {
    color: var(--light-text);
    font-size: 0.875rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
