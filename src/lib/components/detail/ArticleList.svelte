<script lang="ts">
  import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import type { Article } from '$lib/types/article';

  interface Props {
    articles: Article[];
    loading?: boolean;
    error?: string | null;
  }

  let { articles, loading = false, error = null }: Props = $props();
</script>

<section class="articles-section" aria-label="Supporting coverage">
  <header class="section-head">
    <p class="section-label">Supporting coverage</p>
    {#if loading}
      <span class="loading-indicator" aria-live="polite">
        <Spinner size="sm" />
        <span>Refreshing</span>
      </span>
    {/if}
  </header>

  {#if error}
    <ErrorMessage title="Article fetch" message={error} />
  {:else if articles.length}
    <div class="article-list">
      {#each articles as article, i (i)}
        <ArticleRow {article} />
      {/each}
    </div>
  {:else if !loading}
    <p class="empty-copy">No supporting articles yet.</p>
  {/if}
</section>

<style>
  .articles-section {
    display: grid;
    gap: var(--sp-4);
    padding-top: var(--sp-6);
    border-top: 1px solid var(--outline-variant);
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-4);
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

  .loading-indicator {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
  }

  .article-list {
    display: grid;
    gap: 1px;
    background: var(--outline-variant);
  }

  .empty-copy {
    margin: 0;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.55;
  }
</style>
