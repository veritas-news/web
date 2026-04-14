<script lang="ts">
  import type { Article } from '$lib/types/article';
  import { formatDateTime } from '$lib/utils/format';

  interface Props {
    article: Article;
  }

  let { article }: Props = $props();

  let imgErrored = $state(false);
  const imgFailed = $derived(
    imgErrored || (!!article.imageUrl && article.imageUrl.includes('googleusercontent.com'))
  );
  let isBanner = $state(false);
  let imgRatio = $state<string | null>(null);
  let anchorEl = $state<HTMLElement | null>(null);
  let scrollTimer: ReturnType<typeof setTimeout> | null = null;

  function onImgLoad(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    const ratio = img.naturalWidth / img.naturalHeight;
    isBanner = ratio >= 1.5;
    if (isBanner) imgRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
  }

  function onMouseEnter() {
    if (!isBanner || !anchorEl) return;
    scrollTimer = setTimeout(() => {
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      const estimatedImageHeight = anchorEl.offsetWidth * (2 / 3);
      if (rect.bottom + estimatedImageHeight > window.innerHeight || rect.top < 0) {
        anchorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  }

  function onMouseLeave() {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
      scrollTimer = null;
    }
  }
</script>

<a
  bind:this={anchorEl}
  class={['article-row', { banner: isBanner }]}
  href={article.link}
  target="_blank"
  rel="external noreferrer"
  aria-label="{article.title} — {article.source}"
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
>
  {#if article.imageUrl && !imgFailed}
    <!-- thumb-wrap: container for cqi + grid-row collapse trick -->
    <div class="thumb-wrap">
      <div class="thumb-inner">
        <img
          class="thumb"
          src={article.imageUrl}
          alt=""
          loading="lazy"
          style={imgRatio ? `aspect-ratio: ${imgRatio}` : undefined}
          onload={onImgLoad}
          onerror={() => (imgErrored = true)}
        />
      </div>
    </div>
  {/if}

  <div class="row-body">
    <span class="source">{article.source}</span>
    <strong class="title">{article.title}</strong>
    {#if article.description && article.description !== article.title && !article.description.includes(article.title)}
      <p class="description">{article.description}</p>
    {/if}
    <span class="meta">{formatDateTime(article.publishedAt)}</span>
  </div>
</a>

<style>
  /* ── Base ── */
  .article-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface-high);
    color: inherit;
    text-decoration: none;
    transition: background var(--transition);
  }

  .article-row:hover {
    background: var(--surface-highest);
  }

  .article-row:hover .title {
    color: var(--clr-event);
  }

  .article-row:focus-visible {
    outline: 1px solid var(--clr-event);
    outline-offset: -1px;
  }

  /* ── Thumbnail layout (default) ── */
  .thumb-wrap {
    order: 2;
    width: 4.5rem;
    height: 4.5rem;
    flex-shrink: 0;
    overflow: hidden;
  }

  .thumb-inner {
    width: 100%;
    height: 100%;
  }

  .thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter var(--transition);
  }

  .article-row:hover .thumb {
    filter: grayscale(0%);
  }

  .row-body {
    display: grid;
    gap: var(--sp-1);
    min-width: 0;
    order: 1;
  }

  /* ── Banner layout ── */
  .article-row.banner {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 0;
    align-items: start;
  }

  /*
   * Collapse via grid-template-rows: 0fr → 1fr.
   * container-type so cqi on .thumb resolves to this wrapper's width.
   */
  .article-row.banner .thumb-wrap {
    order: 1;
    container-type: inline-size;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .article-row.banner:hover .thumb-wrap {
    grid-template-rows: 1fr;
  }

  /* min-height: 0 allows the inner div to collapse below content size */
  .article-row.banner .thumb-inner {
    min-height: 0;
    overflow: hidden;
    width: 100%;
    height: auto;
  }

  .article-row.banner .thumb {
    width: 100%;
    height: auto;
    /* natural height from inline aspect-ratio, capped at 3:2 */
    max-height: calc(200cqi / 3);
    object-fit: cover;
    filter: grayscale(15%);
    transition: filter var(--transition);
  }

  .article-row.banner:hover .thumb {
    filter: grayscale(0%);
  }

  .article-row.banner .row-body {
    order: 2;
    padding: var(--sp-3) var(--sp-4);
  }

  /* ── Row body content ── */
  .source {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .title {
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    font-weight: 500;
    line-height: 1.45;
    transition: color var(--transition);
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .description {
    margin: 0;
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.55;
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .meta {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
  }
</style>
