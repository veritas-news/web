<script lang="ts">
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';
  import TimelineCard from '$lib/components/timeline/TimelineCard.svelte';
  import TimelineConnector from '$lib/components/timeline/TimelineConnector.svelte';
  import LoadMoreButton from '$lib/components/ui/LoadMoreButton.svelte';
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import type { TimelineCardModel } from '$lib/types/timeline';

  interface Props {
    cards: TimelineCardModel[];
    selectedId: string | null;
    listError?: string | null;
    loadingMore?: boolean;
    hasMore?: boolean;
    onselect: (id: string) => void;
    onloadmore: () => void;
  }

  let {
    cards,
    selectedId,
    listError = null,
    loadingMore = false,
    hasMore = false,
    onselect,
    onloadmore
  }: Props = $props();
</script>

<div class="timeline-container" role="feed" aria-label="Global intelligence timeline">
  {#if listError}
    <ErrorMessage title="Timeline error" message={listError} />
  {:else if cards.length === 0}
    <section class="empty-state" aria-live="polite">
      <p class="empty-eyebrow">Timeline</p>
      <h3 class="empty-heading">Awaiting signal</h3>
      <p class="empty-copy">Events emerge as geopolitical incidents clear quality threshold.</p>
    </section>
  {:else}
    <ol class="feed-list" aria-label="{cards.length} intelligence items">
      {#each cards as card, i (i)}
        <li
          animate:flip={{ duration: 250, easing: cubicOut }}
          in:fly={{ y: 8, duration: 200, delay: Math.min(i * 20, 200), easing: cubicOut }}
        >
          <TimelineConnector type={card.type} terminal={i === cards.length - 1} />
          <TimelineCard
            {card}
            selected={selectedId === card.id}
            onselect={() => onselect(card.id)}
          />
        </li>
      {/each}
    </ol>

    {#if hasMore}
      <div in:fly={{ y: 4, duration: 200 }}>
        <LoadMoreButton loading={loadingMore} onclick={onloadmore} />
      </div>
    {/if}
  {/if}
</div>

<style>
  .timeline-container {
    display: grid;
    gap: var(--sp-4);
  }

  .feed-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .feed-list li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--sp-3);
    align-items: start;
  }

  /* ── Empty state ── */
  .empty-state {
    display: grid;
    gap: var(--sp-2);
    padding: var(--sp-6) var(--sp-4);
    border-left: 2px solid var(--outline-variant);
  }

  .empty-eyebrow {
    margin: 0;
    color: var(--clr-event);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .empty-heading {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-serif);
    font-size: var(--text-headline);
  }

  .empty-copy {
    margin: 0;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.6;
  }
</style>
