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

<article class="mx-auto grid max-w-[44rem] gap-sp-5 px-sp-6 pb-sp-10 pt-sp-6">
	<a
		href="/articles"
		class="font-sans text-label font-semibold tracking-[0.04em] text-ink-muted uppercase no-underline hover:bg-transparent hover:text-event"
		>← Articles</a
	>

	{#if data.item.imageUrl}
		<img
			class="max-h-80 w-full border border-outline-variant object-cover"
			src={data.item.imageUrl}
			alt=""
		/>
	{/if}

	<header class="grid gap-sp-2">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-topic uppercase">{data.item.source}</p>
		<h1 class="m-0 font-serif text-[1.75rem] font-semibold leading-tight">{data.item.title}</h1>
		<div class="flex flex-wrap gap-sp-2">
			{#each data.item.categories as c (c)}
				<TagChip label={c} variant="neutral" />
			{/each}
		</div>
	</header>

	<section class="grid gap-0 border-y border-outline-variant py-sp-4" aria-label="Article metadata">
		<MetadataRow label="Author" value={data.item.author || '—'} />
		<MetadataRow label="Published" value={formatDateTime(data.item.publishedAt)} />
		<MetadataRow label="Updated" value={formatDateTime(data.item.updatedAt)} />
	</section>

	{#if data.item.description}
		<div class="leading-[1.7] text-ink-soft">
			<p class="m-0">{data.item.description}</p>
		</div>
	{/if}

	{#if data.item.link}
		<p class="m-0">
			<a
				href={data.item.link}
				class="inline-flex border border-outline-variant bg-surface-low px-sp-4 py-sp-3 font-sans text-label font-bold tracking-[0.04em] text-ink uppercase no-underline hover:border-event hover:bg-transparent hover:text-event"
				target="_blank"
				rel="noopener noreferrer"
			>
				Open original article
			</a>
		</p>
	{/if}
</article>
