<script>
  import { currentStep } from "../stores/appStore";

  function resetApp() {
    currentStep.set(1);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      resetApp();
    }
  }
</script>

<header>
  <div class="container header-content">
    <div
      class="logo"
      on:click={resetApp}
      on:keydown={handleKeyDown}
      tabindex="0"
      role="button"
      aria-label="Reset application"
    >
      <h1>Speech to Text</h1>
    </div>
    <nav>
      <ul>
        <li>
          <a
            href="https://github.com/yourusername/speech-to-text"
            target="_blank"
            rel="noopener noreferrer">GitHub</a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  .logo svg {
    color: var(--primary-color);
  }

  .logo h1 {
    font-size: 1.5rem;
    margin: 0;
    color: var(--primary-color);
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
  }

  nav a {
    color: var(--text-color);
    font-weight: 500;
    transition: color 0.2s;
  }

  nav a:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
</style>
