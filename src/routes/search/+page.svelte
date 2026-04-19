<script lang="ts">
	import SearchFiltersForm from '$lib/components/search/SearchFiltersForm.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import { formatImpactLine, titleImpactScore } from '$lib/metrics/displayBands';
	import { formatCompactNumber, formatDateTime } from '$lib/utils/format';
	import { articleDetailPath } from '$lib/utils/articleRouteId';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Search — Veritas</title>
</svelte:head>

<div class="mx-auto grid max-w-[72rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="grid gap-sp-3 border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-topic uppercase">Corpus</p>
		<h1 class="m-0 font-serif text-headline font-semibold">Search</h1>
		<p class="m-0 max-w-[60ch] leading-[1.65] text-ink-soft">
			Query events and articles (minimum 2 characters). Uses <code class="text-[0.9em] text-event">GET /v1/search</code>.
		</p>

		<SearchFiltersForm q={data.q} filters={data.filters} />
		<p class="m-0 font-sans text-label text-ink-muted">
			Filters apply to event hits only (server-enforced via
			<code class="text-[0.9em] text-event">GET /v1/search</code>).
		</p>
	</header>

	{#if data.searchError}
		<ErrorMessage title="Search error" message={data.searchError} />
	{:else if data.skipped}
		<p class="m-0 text-ink-muted">Enter a query to search the intelligence corpus.</p>
	{:else}
		{#if data.meta}
			<p class="m-0 flex flex-wrap gap-sp-2">
				<TagChip label={`${data.meta.eventCount} events`} variant="event" />
				<TagChip label={`${data.meta.articleCount} articles`} variant="neutral" />
			</p>
		{/if}

		<div class="grid gap-sp-6 lg:grid-cols-2">
			<section aria-label="Matching events">
				<h2 class="mb-sp-3 mt-0 font-serif text-title-lg">Events</h2>
				{#if data.events.length === 0}
					<p class="m-0 text-ink-muted">No matching events.</p>
				{:else}
					<ul class="m-0 grid list-none gap-sp-3 p-0">
						{#each data.events as ev (ev.id)}
							<li class="border border-outline-variant bg-surface-low p-sp-3">
								<a
									href="/events/{ev.id}"
									class="mb-sp-1 inline-block font-semibold text-ink no-underline hover:bg-transparent hover:text-event"
									>{ev.title}</a
								>
								<p class="m-0 font-sans text-label text-ink-muted">
									<span>{ev.category}</span>
									·
									<span title={titleImpactScore(ev.impactScore)}>{formatImpactLine(ev.impactScore)}</span>
									·
									<span>{formatDateTime(ev.happenedAt)}</span>
								</p>
							</li>
						{/each}
					</ul>
				{/if}
			</section>

			<section aria-label="Matching articles">
				<h2 class="mb-sp-3 mt-0 font-serif text-title-lg">Articles</h2>
				{#if data.articles.length === 0}
					<p class="m-0 text-ink-muted">No matching articles.</p>
				{:else}
					<ul class="m-0 grid list-none gap-sp-3 p-0">
						{#each data.articles as a (a.id)}
							<li class="border border-outline-variant bg-surface-low p-sp-3">
								<a
									href={articleDetailPath(a.id)}
									class="mb-sp-1 inline-block font-semibold text-ink no-underline hover:bg-transparent hover:text-event"
									>{a.title}</a
								>
								<p class="m-0 font-sans text-label text-ink-muted">
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
