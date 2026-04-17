<script lang="ts">
  import { untrack } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import TimelineContainer from '$lib/components/timeline/TimelineContainer.svelte';
  import EventDetail from '$lib/components/detail/EventDetail.svelte';
  import TopicDetail from '$lib/components/detail/TopicDetail.svelte';
  import GlobalDetail from '$lib/components/detail/GlobalDetail.svelte';
  import DetailActionBar from '$lib/components/detail/DetailActionBar.svelte';
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import { describeAPIError } from '$lib/api/client';
  import { getEvent } from '$lib/api/events';
  import { getTopic } from '$lib/api/topics';
  import { getGlobalEvent } from '$lib/api/global';
  import { fetchFeedPage, type TimelineScope } from '$lib/services/timelineFeed';
  import { toTimelineCard } from '$lib/utils/timeline';
  import type {
    AnyDetail,
    UnifiedTimelineItem,
    EventDetail as EventDetailType,
    TopicEventDetail,
    GlobalEventDetail,
    EventType
  } from '$lib/types/event';
  import type { UnifiedPageData } from '$lib/types/timeline';

  interface Props {
    data: UnifiedPageData;
    scope?: TimelineScope;
  }

  let { data, scope = 'unified' }: Props = $props();

  let items = $state<UnifiedTimelineItem[]>([]);
  let hasMore = $state(false);
  let nextCursor = $state<string | null>(null);
  let selectedId = $state<string | null>(null);
  let selectedType = $state<EventType | null>(null);
  let detail = $state<AnyDetail | null>(null);
  let listError = $state<string | null>(null);
  let detailError = $state<string | null>(null);
  let loadingMore = $state(false);
  let loadingDetail = $state(false);
  let activeRequest = 0;

  const cards = $derived(items.map(toTimelineCard));

  // Derive accent class from selected type
  const accentClass = $derived(
    selectedType === 'topic_event' ? 'accent-topic'
    : selectedType === 'global_event' ? 'accent-global'
    : 'accent-event'
  );

  const feedEyebrow = $derived(
    scope === 'events' ? 'Level 1 — Events'
    : scope === 'topics' ? 'Level 2 — Topics'
    : scope === 'global' ? 'Level 3 — Global'
    : 'Global Intelligence'
  );

  untrack(() => seed(data));

  function seed(source: UnifiedPageData) {
    items = [...source.items];
    hasMore = source.hasMore;
    nextCursor = source.nextCursor;
    selectedId = source.selectedId;
    selectedType = source.items.find(i => i.id === source.selectedId)?.type ?? null;
    detail = source.detail;
    listError = source.listError;
    detailError = source.detailError;
  }

  async function selectItem(id: string) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (id === selectedId && detail) return;

    selectedId = id;
    selectedType = item.type;
    detail = null;
    detailError = null;
    loadingDetail = true;

    const reqId = ++activeRequest;
    try {
      let result: AnyDetail;
      if (item.type === 'event') result = await getEvent(fetch, id);
      else if (item.type === 'topic_event') result = await getTopic(fetch, id);
      else result = await getGlobalEvent(fetch, id);

      if (reqId !== activeRequest) return;
      detail = result;
    } catch (err) {
      if (reqId !== activeRequest) return;
      detailError = describeAPIError(err, {
        notFound: 'Item not found.',
        fallback: 'Unable to load detail.'
      });
    } finally {
      if (reqId === activeRequest) loadingDetail = false;
    }
  }

  async function loadMoreItems() {
    if (!hasMore || !nextCursor || loadingMore) return;
    loadingMore = true;
    listError = null;

    try {
      const page = await fetchFeedPage(fetch, scope, nextCursor);
      const seen = new Set(items.map((i) => i.id));
      items = [...items, ...page.items.filter((i) => !seen.has(i.id))];
      hasMore = page.hasMore;
      nextCursor = page.nextCursor;
    } catch (err) {
      listError = describeAPIError(err, { fallback: 'Unable to load more.' });
    } finally {
      loadingMore = false;
    }
  }
</script>

<div class="workspace">
  <!-- ── Left: timeline panel (40%) ── -->
  <section class="timeline-wrap" data-timeline-scroll aria-label="Intelligence timeline">
    <header class="panel-head">
      <div>
        <p class="panel-eyebrow {accentClass}">{feedEyebrow}</p>
        <h2 class="panel-heading">Timeline</h2>
      </div>
      <div class="head-right">
        <span class="item-count" aria-label="{cards.length} items loaded">{cards.length}</span>
      </div>
    </header>

    <TimelineContainer
      {cards}
      {selectedId}
      {listError}
      {loadingMore}
      {hasMore}
      onselect={selectItem}
      onloadmore={loadMoreItems}
    />
  </section>

  <!-- ── Right: detail panel (60%) ── -->
  <section class="detail-wrap {accentClass}" aria-label="Item detail" aria-live="polite">
    {#if loadingDetail}
      <div class="panel-state loading-state" aria-busy="true">
        <div class="loading-icon {accentClass}">
          <Spinner />
        </div>
        <div>
          <p class="panel-eyebrow {accentClass}">Fetching</p>
          <h2 class="panel-heading">Loading intelligence</h2>
          <p class="panel-copy">Retrieving source data and analytics…</p>
        </div>
      </div>
    {:else if detailError}
      <div class="detail-inner" in:fly={{ x: 16, duration: 200, easing: cubicOut }}>
        <ErrorMessage title="Detail error" message={detailError} />
      </div>
    {:else}
      {#key selectedId}
        <div class="detail-inner" in:fly={{ x: 20, duration: 220, easing: cubicOut }}>
          {#if detail}
            <DetailActionBar id={detail.id} type={detail.type} title={detail.title} />
          {/if}
          {#if detail?.type === 'event'}
            <EventDetail item={detail as EventDetailType} />
          {:else if detail?.type === 'topic_event'}
            <TopicDetail item={detail as TopicEventDetail} />
          {:else if detail?.type === 'global_event'}
            <GlobalDetail item={detail as GlobalEventDetail} />
          {:else if items.length === 0 && !listError}
            <div class="panel-state">
              <p class="panel-eyebrow">Timeline</p>
              <h2 class="panel-heading">Awaiting signal</h2>
              <p class="panel-copy">No intelligence items yet. Feed activates as events clear quality threshold.</p>
            </div>
          {:else}
            <div class="panel-state">
              <p class="panel-eyebrow">Detail</p>
              <h2 class="panel-heading">Select an item</h2>
              <p class="panel-copy">Choose a card from the timeline to inspect sources, metrics, and related intelligence.</p>
            </div>
          {/if}
        </div>
      {/key}
    {/if}
  </section>
</div>

<style>
  .workspace {
    display: grid;
    grid-template-columns: 2fr 3fr;
    min-height: 100vh;
    background: var(--surface);
  }

  /* ── Timeline panel ── */
  .timeline-wrap {
    position: sticky;
    top: 0;
    align-self: start;
    display: grid;
    gap: var(--sp-4);
    max-height: 100vh;
    overflow-y: auto;
    padding: var(--sp-6);
    background: var(--surface-low);
    scrollbar-width: thin;
    scrollbar-color: var(--outline-variant) transparent;
  }

  /* ── Detail panel ── */
  .detail-wrap {
    padding: var(--sp-6) var(--sp-8);
    background: var(--surface);
    /* type-specific subtle left accent */
    border-left: 1px solid var(--outline-variant);
    transition: border-left-color var(--transition);
  }

  .detail-wrap.accent-event  { border-left-color: rgba(195, 199, 204, 0.2); }
  .detail-wrap.accent-topic  { border-left-color: rgba(254, 179, 0, 0.2); }
  .detail-wrap.accent-global { border-left-color: rgba(236, 145, 255, 0.2); }

  .detail-inner {
    position: relative;
  }

  /* ── Panel header ── */
  .panel-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--sp-4);
    padding-bottom: var(--sp-4);
    border-bottom: 1px solid var(--outline-variant);
  }

  .head-right {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  .panel-eyebrow {
    margin: 0;
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color var(--transition);
  }

  /* Eyebrow color tracks selected type */
  .panel-eyebrow.accent-event  { color: var(--clr-event); }
  .panel-eyebrow.accent-topic  { color: var(--clr-topic); }
  .panel-eyebrow.accent-global { color: var(--clr-global); }
  .panel-eyebrow:not(.accent-event):not(.accent-topic):not(.accent-global) {
    color: var(--ink-muted);
  }

  .panel-heading {
    margin: var(--sp-1) 0 0;
    color: var(--ink);
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .item-count {
    display: inline-grid;
    place-items: center;
    min-width: 2.2rem;
    height: 2.2rem;
    padding: 0 var(--sp-2);
    border: 1px solid var(--outline-variant);
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  /* ── Panel states ── */
  .panel-state {
    display: grid;
    gap: var(--sp-3);
    align-content: start;
    padding-top: var(--sp-8);
  }

  .loading-state {
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--sp-4);
    padding-top: var(--sp-8);
  }

  .loading-icon {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--outline-variant);
  }

  .panel-copy {
    margin: var(--sp-2) 0 0;
    max-width: 48ch;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.65;
  }

  @media (max-width: 1024px) {
    .workspace {
      grid-template-columns: 1fr;
    }

    .timeline-wrap {
      position: static;
      max-height: none;
    }

    .detail-wrap {
      border-left: none;
      border-top: 1px solid var(--outline-variant);
    }
  }
</style>
