<script lang="ts">
  interface Props {
    title?: string;
    message: string;
  }

  let { title = 'Fetch error', message }: Props = $props();
</script>

<section class="error-block" role="alert" aria-live="polite">
  <p class="error-title">{title}</p>
  <p class="error-msg">{message}</p>
</section>

<style>
  .error-block {
    padding: var(--sp-4);
    border-left: 3px solid var(--error);
    background: var(--error-container);
  }

  .error-title {
    margin: 0 0 var(--sp-1);
    color: var(--error);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .error-msg {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.55;
  }
</style>
