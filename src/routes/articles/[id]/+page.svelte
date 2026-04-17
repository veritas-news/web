<script lang="ts">
  import TagChip from '$lib/components/ui/TagChip.svelte';
  import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
  import { formatDateTime } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.item.title} — Article — Veritas</title>
</svelte:head>

<article class="article-detail">
  <a href="/articles" class="back">← Articles</a>

  {#if data.item.imageUrl}
    <img class="hero-img" src={data.item.imageUrl} alt="" />
  {/if}

  <header class="header">
    <p class="source">{data.item.source}</p>
    <h1 class="headline">{data.item.title}</h1>
    <div class="chips">
      {#each data.item.categories as c (c)}
        <TagChip label={c} variant="neutral" />
      {/each}
    </div>
  </header>

  <section class="meta" aria-label="Article metadata">
    <MetadataRow label="Author" value={data.item.author || '—'} />
    <MetadataRow label="Published" value={formatDateTime(data.item.publishedAt)} />
    <MetadataRow label="Updated" value={formatDateTime(data.item.updatedAt)} />
  </section>

  {#if data.item.description}
    <div class="body">
      <p class="description">{data.item.description}</p>
    </div>
  {/if}

  {#if data.item.link}
    <p class="actions">
      <a href={data.item.link} class="primary-link" target="_blank" rel="noopener noreferrer">
        Open original article
      </a>
    </p>
  {/if}
</article>

<style>
  .article-detail {
    max-width: 44rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-5);
  }

  .back {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  .back:hover {
    color: var(--clr-event);
    background: transparent;
  }

  .hero-img {
    width: 100%;
    max-height: 20rem;
    object-fit: cover;
    border: 1px solid var(--outline-variant);
  }

  .header {
    display: grid;
    gap: var(--sp-2);
  }

  .source {
    margin: 0;
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--clr-topic);
  }

  .headline {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
  }

  .meta {
    display: grid;
    gap: 0;
    padding: var(--sp-4) 0;
    border-top: 1px solid var(--outline-variant);
    border-bottom: 1px solid var(--outline-variant);
  }

  .body {
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .description {
    margin: 0;
  }

  .actions {
    margin: 0;
  }

  .primary-link {
    display: inline-flex;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: var(--text-label);
    padding: var(--sp-3) var(--sp-4);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
    color: var(--ink);
  }

  .primary-link:hover {
    border-color: var(--clr-event);
    color: var(--clr-event);
    background: transparent;
  }
</style>
