<script lang="ts">
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
  import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
  import type { EventDetail } from '$lib/types/event';
  import { formatCompactNumber, formatDateTime } from '$lib/utils/format';

  interface Props {
    item: EventDetail;
  }

  let { item }: Props = $props();

  const conviction = $derived(Math.min(100, Math.max(0, Math.round(item.analystConviction))));
  const impact = $derived(Math.min(100, Math.max(0, Math.round(item.impactScore))));
</script>

<article class="detail" aria-label="Event: {item.title}">
  <!-- Hero -->
  <header class="hero">
    <div class="hero-type">
      <TagChip label="Event" variant="event" />
      {#if item.primaryCategory}
        <TagChip label={item.primaryCategory} variant="neutral" />
      {/if}
      {#if item.secondaryCategory}
        <TagChip label={item.secondaryCategory} variant="neutral" />
      {/if}
    </div>

    <p class="subtitle">{item.subtitle}</p>
    <h2 class="headline">{item.title}</h2>
    {#if item.description !== item.title && !item.description.includes(item.title)}<p class="description">{item.description}</p>{/if}

    {#if item.location}
      <p class="location" aria-label="Location: {item.location}">
        <span class="location-icon" aria-hidden="true">↗</span>{item.location}
      </p>
    {/if}
  </header>

  <!-- Signal meters -->
  <section class="signal-meters" aria-label="Signal strength">
    <div class="meter-group">
      <span class="meter-label">Impact</span>
      <div class="meter-bar" role="meter" aria-valuenow={impact} aria-valuemin={0} aria-valuemax={100} aria-label="Impact score {impact}">
        <div class="meter-fill event" style="width: {impact}%"></div>
      </div>
      <span class="meter-val">{impact}</span>
    </div>
    <div class="meter-group">
      <span class="meter-label">Conviction</span>
      <div class="meter-bar" role="meter" aria-valuenow={conviction} aria-valuemin={0} aria-valuemax={100} aria-label="Analyst conviction {conviction}%">
        <div class="meter-fill event" style="width: {conviction}%"></div>
      </div>
      <span class="meter-val">{conviction}%</span>
    </div>
  </section>

  <!-- Metadata grid -->
  <section class="meta-grid" aria-label="Event metadata">
    <MetadataRow label="Cluster size" value={formatCompactNumber(item.clusterSize)} />
    <MetadataRow label="Sources" value={formatCompactNumber(item.sourceCount)} />
    <MetadataRow label="Happened" value={formatDateTime(item.happenedAt)} />
    <MetadataRow label="Updated" value={formatDateTime(item.lastUpdatedAt)} />
    <MetadataRow label="Generated" value={formatDateTime(item.generatedAt)} />
  </section>

  <!-- Keywords -->
  {#if item.keywords.length}
    <section class="chip-section" aria-label="Keywords">
      <p class="section-label">Keywords</p>
      <div class="chip-group">
        {#each item.keywords as kw (kw)}
          <TagChip label={kw} variant="neutral" />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Entities -->
  {#if item.entities.length}
    <section class="chip-section" aria-label="Entities">
      <p class="section-label">Entities</p>
      <div class="chip-group">
        {#each item.entities as entity (entity)}
          <TagChip label={entity} variant="event" />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Supporting articles -->
  {#if item.supportingArticles.length}
    <section class="articles-section" aria-label="Supporting coverage">
      <p class="section-label">Supporting coverage</p>
      <div class="article-list">
        {#each item.supportingArticles as article, i (i)}
          <ArticleRow {article} />
        {/each}
      </div>
    </section>
  {/if}
</article>

<style>
  .detail {
    display: grid;
    gap: var(--sp-8);
  }

  /* ── Hero ── */
  .hero {
    display: grid;
    gap: var(--sp-3);
    padding-bottom: var(--sp-6);
    border-bottom: 1px solid var(--outline-variant);
  }

  .hero-type {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
  }

  .subtitle {
    margin: 0;
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .headline {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--text-headline);
    font-weight: 600;
    line-height: 1.2;
  }

  .description {
    margin: 0;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.65;
  }

  .location {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    margin: 0;
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .location-icon {
    color: var(--clr-event);
  }

  /* ── Signal meters ── */
  .signal-meters {
    display: grid;
    gap: var(--sp-3);
  }

  .meter-group {
    display: grid;
    grid-template-columns: 6rem 1fr 3rem;
    align-items: center;
    gap: var(--sp-3);
  }

  .meter-label {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .meter-bar {
    height: 2px;
    background: var(--surface-highest);
    overflow: hidden;
  }

  .meter-fill {
    height: 100%;
    transition: width var(--transition);
  }

  .meter-fill.event { background: var(--clr-event); }

  .meter-val {
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  /* ── Metadata grid ── */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1px;
    background: var(--outline-variant);
  }

  /* ── Chip sections ── */
  .chip-section {
    display: grid;
    gap: var(--sp-3);
  }

  .section-label {
    margin: 0;
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .chip-group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
  }

  /* ── Articles ── */
  .articles-section {
    display: grid;
    gap: var(--sp-4);
    padding-top: var(--sp-6);
    border-top: 1px solid var(--outline-variant);
  }

  .article-list {
    display: grid;
    gap: 1px;
    background: var(--outline-variant);
  }
</style>
