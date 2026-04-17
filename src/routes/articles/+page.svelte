<script lang="ts">
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import LoadMoreButton from '$lib/components/ui/LoadMoreButton.svelte';
  import { listArticles } from '$lib/api/articles';
  import { describeAPIError } from '$lib/api/client';
  import { formatDateTime } from '$lib/utils/format';
  import type { Article } from '$lib/types/article';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let items = $state<Article[]>([...data.items]);
  let nextCursor = $state<string | null>(data.nextCursor);
  let loading = $state(false);
  let moreError = $state<string | null>(null);

  const hasMore = $derived(nextCursor != null);

  async function loadMore() {
    if (!nextCursor || loading) return;
    loading = true;
    moreError = null;
    try {
      const page = await listArticles(fetch, { cursor: nextCursor });
      const seen = new Set(items.map((a) => a.id));
      items = [...items, ...page.items.filter((a) => !seen.has(a.id))];
      nextCursor = page.nextCursor;
    } catch (err) {
      moreError = describeAPIError(err, { fallback: 'Unable to load more articles.' });
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Articles — Veritas</title>
  <meta name="description" content="Latest ingested articles from the intelligence pipeline." />
</svelte:head>

<div class="articles-page">
  <header class="hero">
    <p class="eyebrow">Corpus</p>
    <h1 class="title">Articles</h1>
    <p class="lede">Latest coverage from the pipeline, newest first.</p>
  </header>

  {#if data.listError}
    <ErrorMessage title="Feed error" message={data.listError} />
  {:else}
    <ul class="grid" aria-label="Article list">
      {#each items as article (article.id)}
        <li class="card">
          {#if article.imageUrl}
            <img class="thumb" src={article.imageUrl} alt="" loading="lazy" />
          {:else}
            <div class="thumb placeholder" aria-hidden="true"></div>
          {/if}
          <div class="card-body">
            <a href="/articles/{article.id}" class="card-title">{article.title}</a>
            <p class="card-meta">
              <span>{article.source}</span>
              {#if article.publishedAt}
                · <span>{formatDateTime(article.publishedAt)}</span>
              {/if}
            </p>
            {#if article.description}
              <p class="card-desc">{article.description}</p>
            {/if}
            {#if article.link}
              <a href={article.link} class="ext" target="_blank" rel="noopener noreferrer">Original article</a>
            {/if}
          </div>
        </li>
      {/each}
    </ul>

    {#if moreError}
      <ErrorMessage title="Pagination error" message={moreError} />
    {/if}

    <div class="more-wrap">
      {#if hasMore}
        <LoadMoreButton loading={loading} onclick={loadMore} />
      {/if}
    </div>
  {/if}
</div>

<style>
  .articles-page {
    max-width: 56rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-6);
  }

  .hero {
    border-bottom: 1px solid var(--outline-variant);
    padding-bottom: var(--sp-4);
  }

  .eyebrow {
    margin: 0;
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--clr-event);
  }

  .title {
    margin: var(--sp-1) 0 0;
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .lede {
    margin: var(--sp-2) 0 0;
    color: var(--ink-soft);
    max-width: 52ch;
    line-height: 1.65;
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--sp-4);
  }

  .card {
    display: grid;
    grid-template-columns: 7.5rem 1fr;
    gap: var(--sp-4);
    padding: var(--sp-4);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
  }

  @media (max-width: 640px) {
    .card {
      grid-template-columns: 1fr;
    }
  }

  .thumb {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border: 1px solid var(--outline-variant);
  }

  .thumb.placeholder {
    background: linear-gradient(135deg, rgba(195, 199, 204, 0.12), rgba(236, 145, 255, 0.08));
  }

  .card-body {
    display: grid;
    gap: var(--sp-2);
    align-content: start;
    min-width: 0;
  }

  .card-title {
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--ink);
  }

  .card-title:hover {
    color: var(--clr-topic);
    background: transparent;
  }

  .card-meta {
    margin: 0;
    font-size: var(--text-label);
    color: var(--ink-muted);
  }

  .card-desc {
    margin: 0;
    color: var(--ink-soft);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ext {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    justify-self: start;
  }

  .more-wrap {
    display: flex;
    justify-content: center;
    min-height: 2.5rem;
  }

  .loading {
    display: grid;
    place-items: center;
  }
</style>
