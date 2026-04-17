<script lang="ts">
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import LoadMoreButton from '$lib/components/ui/LoadMoreButton.svelte';
	import { listArticles } from '$lib/api/articles';
	import { describeAPIError } from '$lib/api/client';
	import { formatDateTime } from '$lib/utils/format';
	import { articleDetailPath } from '$lib/utils/articleRouteId';
	import type { Article } from '$lib/types/article';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Extra pages after "Load more"; reset when server `data` changes. */
	let moreItems = $state<Article[]>([]);
	/**
	 * Cursor for the next page: `undefined` means "still on initial server page" (use `data.nextCursor`).
	 * After load-more, holds the API `nextCursor` (including `null` when exhausted).
	 */
	let paginationCursor = $state<string | null | undefined>(undefined);
	let loading = $state(false);
	let moreError = $state<string | null>(null);

	$effect(() => {
		data.items;
		data.nextCursor;
		moreItems = [];
		paginationCursor = undefined;
		moreError = null;
	});

	const items = $derived([...data.items, ...moreItems]);

	const nextCursor = $derived(
		paginationCursor === undefined ? data.nextCursor : paginationCursor
	);

	const hasMore = $derived(nextCursor != null);

	async function loadMore() {
		const cursor = nextCursor;
		if (cursor == null || loading) return;
		loading = true;
		moreError = null;
		try {
			const page = await listArticles(fetch, { cursor });
			const seen = new Set(items.map((a) => a.id));
			moreItems = [...moreItems, ...page.items.filter((a) => !seen.has(a.id))];
			paginationCursor = page.nextCursor;
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

<div class="mx-auto grid max-w-[56rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-event uppercase">Corpus</p>
		<h1 class="mt-sp-1 mb-0 font-serif text-headline font-semibold">Articles</h1>
		<p class="mt-sp-2 mb-0 max-w-[52ch] leading-[1.65] text-ink-soft">Latest coverage from the pipeline, newest first.</p>
	</header>

	{#if data.listError}
		<ErrorMessage title="Feed error" message={data.listError} />
	{:else}
		<ul class="m-0 grid list-none gap-sp-4 p-0" aria-label="Article list">
			{#each items as article (article.id)}
				<li
					class="grid gap-sp-4 border border-outline-variant bg-surface-low p-sp-4 sm:grid-cols-[7.5rem_1fr]"
				>
					{#if article.imageUrl}
						<img
							class="aspect-[4/3] w-full border border-outline-variant object-cover"
							src={article.imageUrl}
							alt=""
							loading="lazy"
						/>
					{:else}
						<div
							class="aspect-[4/3] w-full border border-outline-variant bg-[linear-gradient(135deg,rgb(195_199_204/0.12),rgb(236_145_255/0.08))]"
							aria-hidden="true"
						></div>
					{/if}
					<div class="grid min-w-0 content-start gap-sp-2">
						<a
							href={articleDetailPath(article.id)}
							class="text-[1.05rem] font-semibold text-ink no-underline hover:bg-transparent hover:text-topic"
							>{article.title}</a
						>
						<p class="m-0 font-sans text-label text-ink-muted">
							<span>{article.source}</span>
							{#if article.publishedAt}
								· <span>{formatDateTime(article.publishedAt)}</span>
							{/if}
						</p>
						{#if article.description}
							<p class="m-0 line-clamp-3 leading-[1.55] text-ink-soft">{article.description}</p>
						{/if}
						{#if article.link}
							<a
								href={article.link}
								class="justify-self-start font-sans text-label font-semibold tracking-[0.04em] text-event uppercase"
								target="_blank"
								rel="noopener noreferrer">Original article</a
							>
						{/if}
					</div>
				</li>
			{/each}
		</ul>

		{#if moreError}
			<ErrorMessage title="Pagination error" message={moreError} />
		{/if}

		<div class="flex min-h-10 justify-center">
			{#if hasMore}
				<LoadMoreButton loading={loading} onclick={loadMore} />
			{/if}
		</div>
	{/if}
</div>
