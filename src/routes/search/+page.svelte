<script lang="ts">
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import { formatCompactNumber, formatDateTime } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Search — Veritas</title>
</svelte:head>

<div class="search-page">
  <header class="hero">
    <p class="eyebrow">Corpus</p>
    <h1 class="title">Search</h1>
    <p class="lede">Query events and articles (minimum 2 characters). Uses <code>GET /v1/search</code>.</p>

    <form class="search-form" method="get" action="/search">
      <label class="sr-only" for="q">Search query</label>
      <input
        id="q"
        name="q"
        type="search"
        class="search-input"
        placeholder="e.g. election, climate, …"
        value={data.q}
        autocomplete="off"
        minlength="2"
        maxlength="200"
      />
      <button type="submit" class="search-submit">Search</button>
    </form>
  </header>

  {#if data.searchError}
    <ErrorMessage title="Search error" message={data.searchError} />
  {:else if data.skipped}
    <p class="hint">Enter a query to search the intelligence corpus.</p>
  {:else}
    {#if data.meta}
      <p class="meta-line">
        <TagChip label={`${data.meta.eventCount} events`} variant="event" />
        <TagChip label={`${data.meta.articleCount} articles`} variant="neutral" />
      </p>
    {/if}

    <div class="split">
      <section class="col" aria-label="Matching events">
        <h2 class="col-title">Events</h2>
        {#if data.events.length === 0}
          <p class="empty">No matching events.</p>
        {:else}
          <ul class="hits">
            {#each data.events as ev (ev.id)}
              <li class="hit-card">
                <a href="/events/{ev.id}" class="hit-title">{ev.title}</a>
                <p class="hit-meta">
                  <span>{ev.category}</span>
                  ·
                  <span>impact {formatCompactNumber(ev.impactScore)}</span>
                  ·
                  <span>{formatDateTime(ev.happenedAt)}</span>
                </p>
              </li>
            {/each}
          </ul>
        {/if}
      </section>

      <section class="col" aria-label="Matching articles">
        <h2 class="col-title">Articles</h2>
        {#if data.articles.length === 0}
          <p class="empty">No matching articles.</p>
        {:else}
          <ul class="hits">
            {#each data.articles as a (a.id)}
              <li class="hit-card">
                <a href="/articles/{a.id}" class="hit-title">{a.title}</a>
                <p class="hit-meta">
                  <span>{a.source}</span>
                  {#if a.publishedAt}
                    · <span>{formatDateTime(a.publishedAt)}</span>
                  {/if}
                </p>
              </li>
            {/each}
          </ul>
        {/if}
      </section>
    </div>
  {/if}
</div>

<style>
  .search-page {
    max-width: 72rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-6);
  }

  .hero {
    display: grid;
    gap: var(--sp-3);
    padding-bottom: var(--sp-4);
    border-bottom: 1px solid var(--outline-variant);
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
    max-width: 60ch;
    color: var(--ink-soft);
    line-height: 1.65;
  }

  .lede code {
    font-size: 0.9em;
    color: var(--clr-event);
  }

  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    margin-top: var(--sp-2);
  }

  .search-input {
    flex: 1 1 16rem;
    min-width: 0;
    padding: var(--sp-3) var(--sp-3);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
    color: var(--ink);
  }

  .search-submit {
    padding: var(--sp-3) var(--sp-5);
    border: 1px solid var(--outline-variant);
    background: var(--ink);
    color: var(--surface);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: var(--text-label);
  }

  .search-submit:hover {
    opacity: 0.92;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .hint {
    margin: 0;
    color: var(--ink-muted);
  }

  .meta-line {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    margin: 0;
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-6);
  }

  @media (max-width: 900px) {
    .split {
      grid-template-columns: 1fr;
    }
  }

  .col-title {
    margin: 0 0 var(--sp-3);
    font-family: var(--font-serif);
    font-size: 1.25rem;
  }

  .hits {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--sp-3);
  }

  .hit-card {
    padding: var(--sp-3);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
  }

  .hit-title {
    display: inline-block;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: var(--sp-1);
  }

  .hit-title:hover {
    color: var(--clr-event);
    background: transparent;
  }

  .hit-meta {
    margin: 0;
    font-size: var(--text-label);
    color: var(--ink-muted);
  }

  .empty {
    margin: 0;
    color: var(--ink-muted);
  }
</style>
