<script lang="ts">
  interface Props {
    loading?: boolean;
    onclick: () => void;
  }

  let { loading = false, onclick }: Props = $props();
</script>

<button
  type="button"
  class="load-more"
  disabled={loading}
  aria-busy={loading}
  {onclick}
>
  {#if loading}
    <span class="spinner" aria-hidden="true"></span>
    Loading
  {:else}
    Load more
  {/if}
</button>

<style>
  .load-more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2);
    width: 100%;
    border: 1px solid var(--outline-variant);
    border-radius: var(--radius);
    background: transparent;
    padding: var(--sp-3) var(--sp-4);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background var(--transition),
      border-color var(--transition),
      color var(--transition);
  }

  .load-more:hover:not(:disabled) {
    border-color: var(--clr-event);
    background: var(--surface-high);
    color: var(--ink);
  }

  .load-more:focus-visible {
    outline: 1px solid var(--clr-event);
    outline-offset: 2px;
  }

  .load-more:disabled {
    opacity: 0.5;
    cursor: progress;
  }

  .spinner {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border: 1.5px solid rgba(160, 167, 181, 0.25);
    border-top-color: var(--clr-event);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
