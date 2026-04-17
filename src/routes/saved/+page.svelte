<script lang="ts">
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import { intelligenceDetailPath } from '$lib/utils/intelligenceLinks';
  import { savedItems, removeSaved, clearSaved } from '$lib/stores/savedItems';
  import { formatDateTime } from '$lib/utils/format';
  import type { EventType } from '$lib/types/event';

  function typeLabel(t: EventType): string {
    if (t === 'event') return 'Event';
    if (t === 'topic_event') return 'Topic';
    return 'Global';
  }

  function variant(t: EventType): 'event' | 'topic' | 'global' {
    if (t === 'topic_event') return 'topic';
    if (t === 'global_event') return 'global';
    return 'event';
  }
</script>

<svelte:head>
  <title>Saved — Veritas</title>
  <meta name="description" content="Bookmarked intelligence items stored in this browser." />
</svelte:head>

<div class="saved-page">
  <header class="hero">
    <p class="eyebrow">Bookmarks</p>
    <h1 class="title">Saved</h1>
    <p class="lede">
      Items you star from the timeline detail panel. Stored only in this browser (<code>localStorage</code>).
    </p>
    {#if $savedItems.length}
      <button type="button" class="clear" onclick={() => clearSaved()}>Clear all</button>
    {/if}
  </header>

  {#if $savedItems.length === 0}
    <p class="empty">Nothing saved yet. Open a timeline item and choose <strong>Save</strong>.</p>
  {:else}
    <ul class="list">
      {#each $savedItems as item (item.id + item.type)}
        <li class="row">
          <div class="row-main">
            <TagChip label={typeLabel(item.type)} variant={variant(item.type)} />
            <a href={intelligenceDetailPath(item.type, item.id)} class="row-title">{item.title}</a>
            <p class="row-meta mono">Saved {formatDateTime(item.savedAt)}</p>
          </div>
          <button
            type="button"
            class="remove"
            onclick={() => removeSaved(item.id, item.type)}
            aria-label="Remove {item.title}"
          >
            Remove
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .saved-page {
    max-width: 44rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-6);
  }

  .hero {
    display: grid;
    gap: var(--sp-3);
    border-bottom: 1px solid var(--outline-variant);
    padding-bottom: var(--sp-4);
  }

  .eyebrow {
    margin: 0;
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--clr-topic);
  }

  .title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .lede {
    margin: 0;
    max-width: 52ch;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .lede code {
    font-size: 0.9em;
    color: var(--clr-event);
  }

  .clear {
    justify-self: start;
    padding: var(--sp-2) var(--sp-4);
    border: 1px solid var(--error-container);
    background: transparent;
    color: var(--error);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .clear:hover {
    background: rgba(238, 125, 119, 0.08);
  }

  .empty {
    margin: 0;
    color: var(--ink-muted);
    line-height: 1.65;
  }

  .empty strong {
    color: var(--ink);
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--sp-3);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp-3);
    padding: var(--sp-4);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
  }

  .row-main {
    display: grid;
    gap: var(--sp-2);
    min-width: 0;
    flex: 1;
  }

  .row-title {
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
  }

  .row-title:hover {
    color: var(--clr-event);
    background: transparent;
  }

  .row-meta {
    margin: 0;
    font-size: var(--text-label);
    color: var(--ink-muted);
  }

  .remove {
    padding: var(--sp-2) var(--sp-3);
    border: 1px solid var(--outline-variant);
    background: var(--surface);
    color: var(--ink-muted);
    font-size: var(--text-label);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    cursor: pointer;
  }

  .remove:hover {
    border-color: var(--error);
    color: var(--error);
  }

  .mono {
    font-family: ui-monospace, monospace;
    font-variant-numeric: tabular-nums;
  }
</style>
