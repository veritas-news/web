<script lang="ts">
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import { formatDateTime } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let query = $state('');

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.sources;
    return data.sources.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.url.toLowerCase().includes(q) ||
        s.lang.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  });

  const activeCount = $derived(data.sources.filter((s) => s.active).length);
</script>

<svelte:head>
  <title>Sources — Veritas</title>
  <meta name="description" content="RSS and feed sources ingested by the Veritas crawler." />
</svelte:head>

<div class="sources-page">
  <header class="hero">
    <p class="eyebrow">Ingest</p>
    <h1 class="title">Sources</h1>
    <p class="lede">
      Crawler feed endpoints from <code>GET /v1/sources</code>. Filter client-side by title, URL, or language.
    </p>
    <p class="stats">
      <TagChip label="{data.sources.length} total" variant="neutral" />
      <TagChip label="{activeCount} active" variant="event" />
    </p>
    <label class="filter-label">
      <span class="sr-only">Filter sources</span>
      <input
        class="filter-input"
        type="search"
        placeholder="Filter…"
        bind:value={query}
        autocomplete="off"
      />
    </label>
  </header>

  {#if data.error}
    <ErrorMessage title="Sources error" message={data.error} />
  {:else if filtered.length === 0}
    <p class="empty">No sources match this filter.</p>
  {:else}
    <div class="table-wrap" role="region" aria-label="Sources table" tabindex="0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Lang</th>
            <th scope="col">Priority</th>
            <th scope="col">Poll (min)</th>
            <th scope="col">Status</th>
            <th scope="col">Last fetch</th>
            <th scope="col">HTTP</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as s (s.id)}
            <tr class:inactive={!s.active}>
              <td class="title-cell">
                <span class="name">{s.title || '—'}</span>
                <a href={s.url} class="url" target="_blank" rel="noopener noreferrer">{s.url}</a>
              </td>
              <td>{s.lang || '—'}</td>
              <td>{s.priority || '—'}</td>
              <td>{s.pollIntervalMin}</td>
              <td>
                {#if s.active}
                  <TagChip label="Active" variant="event" />
                {:else}
                  <TagChip label="Off" variant="neutral" />
                {/if}
              </td>
              <td class="mono">{s.lastFetchedAt ? formatDateTime(s.lastFetchedAt) : '—'}</td>
              <td class="mono">
                {#if s.lastStatusCode}{s.lastStatusCode}{:else}—{/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .sources-page {
    max-width: 72rem;
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
    color: var(--clr-global);
  }

  .title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .lede {
    margin: 0;
    max-width: 62ch;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .lede code {
    font-size: 0.9em;
    color: var(--clr-event);
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    margin: 0;
  }

  .filter-label {
    margin-top: var(--sp-2);
  }

  .filter-input {
    width: 100%;
    max-width: 20rem;
    padding: var(--sp-3);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
    color: var(--ink);
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

  .empty {
    margin: 0;
    color: var(--ink-muted);
  }

  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--outline-variant);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-body);
  }

  .table th,
  .table td {
    padding: var(--sp-3) var(--sp-3);
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--outline-variant);
  }

  .table th {
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted);
    background: var(--surface-low);
  }

  tr.inactive {
    opacity: 0.65;
  }

  .title-cell {
    min-width: 14rem;
  }

  .name {
    display: block;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: var(--sp-1);
  }

  .url {
    display: block;
    font-size: var(--text-label);
    word-break: break-all;
    color: var(--clr-event);
  }

  .url:hover {
    background: transparent;
    text-decoration: underline;
  }

  .mono {
    font-family: ui-monospace, monospace;
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
  }
</style>
