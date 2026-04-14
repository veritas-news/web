<script lang="ts">
  interface Props {
    title: string;
    meta?: string;
    label?: string;
    variant?: 'event' | 'topic' | 'neutral';
    onclick?: () => void;
  }

  let { title, meta, label, variant = 'neutral', onclick }: Props = $props();
</script>

{#if onclick}
<button
  class={['related-row', variant, 'clickable']}
  type="button"
  {onclick}
>
  {#if label}
    <span class="related-label">{label}</span>
  {/if}
  <span class="related-title">{title}</span>
  {#if meta}
    <span class="related-meta">{meta}</span>
  {/if}
</button>
{:else}
<div class={['related-row', variant]}>
  {#if label}
    <span class="related-label">{label}</span>
  {/if}
  <span class="related-title">{title}</span>
  {#if meta}
    <span class="related-meta">{meta}</span>
  {/if}
</div>
{/if}

<style>
  .related-row {
    display: grid;
    gap: var(--sp-1);
    padding: var(--sp-3) var(--sp-4);
    border-left: 2px solid transparent;
    background: var(--surface-high);
    transition: background var(--transition);
  }

  .related-row.event {
    border-left-color: var(--clr-event);
  }

  .related-row.topic {
    border-left-color: var(--clr-topic);
  }

  button.related-row {
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  button.related-row:hover {
    background: var(--surface-highest);
  }

  button.related-row:focus-visible {
    outline: 1px solid var(--clr-event);
    outline-offset: -1px;
  }

  .related-label {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .related-title {
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    font-weight: 500;
    line-height: 1.4;
  }

  .related-meta {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
  }
</style>
