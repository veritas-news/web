<script lang="ts">
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
  import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
  import RelatedItemRow from '$lib/components/ui/RelatedItemRow.svelte';
  import type { TopicEventDetail } from '$lib/types/event';
  import { formatCompactNumber, formatDateRange, formatDateTime } from '$lib/utils/format';

  interface Props {
    item: TopicEventDetail;
  }

  let { item }: Props = $props();

  const conviction = $derived(Math.min(100, Math.max(0, Math.round(item.analystConviction))));
  const impact = $derived(Math.min(100, Math.max(0, Math.round(item.impactScore))));
  const sentiment = $derived(Math.round(item.sentimentIndex * 100) / 100);
</script>

<article class="detail" aria-label="Topic: {item.title}">
  <!-- Hero -->
  <header class="hero">
    <div class="hero-type">
      <TagChip label="Topic Event" variant="topic" />
      <TagChip label={item.regionScope} variant="neutral" />
    </div>

    <p class="subtitle">{item.subtitle}</p>
    <h2 class="headline">{item.title}</h2>
    {#if item.description !== item.title && !item.description.includes(item.title)}<p class="description">{item.description}</p>{/if}

    <p class="timespan" aria-label="Time range">
      <span class="timespan-label">Span</span>
      {formatDateRange(item.timeStart, item.timeEnd)}
    </p>
  </header>

  <!-- Signal meters -->
  <section class="signal-meters" aria-label="Signal strength">
    <div class="meter-group">
      <span class="meter-label">Impact</span>
      <div class="meter-bar" role="meter" aria-valuenow={impact} aria-valuemin={0} aria-valuemax={100}>
        <div class="meter-fill topic" style="width: {impact}%"></div>
      </div>
      <span class="meter-val">{impact}</span>
    </div>
    <div class="meter-group">
      <span class="meter-label">Conviction</span>
      <div class="meter-bar" role="meter" aria-valuenow={conviction} aria-valuemin={0} aria-valuemax={100}>
        <div class="meter-fill topic" style="width: {conviction}%"></div>
      </div>
      <span class="meter-val">{conviction}%</span>
    </div>
  </section>

  <!-- Metadata grid -->
  <section class="meta-grid" aria-label="Topic metadata">
    <MetadataRow label="Region" value={item.regionScope} />
    <MetadataRow label="Size" value={formatCompactNumber(item.size)} />
    <MetadataRow label="Articles" value={formatCompactNumber(item.articleCount)} />
    <MetadataRow label="Sentiment" value={sentiment} />
    <MetadataRow label="Article density" value={item.articleDensity.toFixed(2)} />
    <MetadataRow label="Relevance gap" value={item.relevanceGap.toFixed(2)} />
    <MetadataRow label="Updated" value={formatDateTime(item.lastUpdatedAt)} />
    <MetadataRow label="Generated" value={formatDateTime(item.generatedAt)} />
  </section>

  <!-- Related sub-events -->
  {#if item.relatedSubEvents.length}
    <section class="related-section" aria-label="Related sub-events">
      <p class="section-label">Related sub-events</p>
      <div class="related-list">
        {#each item.relatedSubEvents as sub (sub.id)}
          <RelatedItemRow
            title={sub.title}
            meta={formatDateTime(sub.happenedAt)}
            label={sub.primaryCategory}
            variant="event"
          />
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
    max-width: 72ch;
  }

  .timespan {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    margin: 0;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
  }

  .timespan-label {
    color: var(--clr-topic);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

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

  .meter-fill.topic { background: var(--clr-topic); }

  .meter-val {
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1px;
    background: var(--outline-variant);
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

  .related-section, .articles-section {
    display: grid;
    gap: var(--sp-4);
    padding-top: var(--sp-6);
    border-top: 1px solid var(--outline-variant);
  }

  .related-list, .article-list {
    display: grid;
    gap: 1px;
    background: var(--outline-variant);
  }
</style>
