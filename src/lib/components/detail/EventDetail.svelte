<script lang="ts">
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
	import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
	import { detail as d } from '$lib/ui/detailClasses';
	import type { EventDetail } from '$lib/types/event';
	import { formatCompactNumber, formatDateTime } from '$lib/utils/format';
	import { supportingArticlesSortedByImage } from '$lib/utils/articleDisplay';

	interface Props {
		item: EventDetail;
	}

	let { item }: Props = $props();

	const supportingArticles = $derived(supportingArticlesSortedByImage(item.supportingArticles));

	const conviction = $derived(Math.min(100, Math.max(0, Math.round(item.analystConviction))));
	const impact = $derived(Math.min(100, Math.max(0, Math.round(item.impactScore))));
	const sentiment = $derived(
		item.sentimentIndex == null ? null : Math.min(100, Math.max(-100, Math.round(item.sentimentIndex)))
	);
</script>

<article class={d.root} aria-label="Event: {item.title}">
	<header class={d.hero}>
		<div class={d.heroType}>
			<TagChip label="Event" variant="event" />
			{#if item.primaryCategory}
				<TagChip label={item.primaryCategory} variant="neutral" />
			{/if}
			{#if item.secondaryCategory}
				<TagChip label={item.secondaryCategory} variant="neutral" />
			{/if}
		</div>

		<p class={d.subtitle}>{item.subtitle}</p>
		<h2 class={d.headlineEvent}>{item.title}</h2>
		{#if item.description !== item.title && !item.description.includes(item.title)}
			<p class={d.description}>{item.description}</p>
		{/if}

		{#if item.location}
			<p class={d.location} aria-label="Location: {item.location}">
				<span class={d.locationIcon} aria-hidden="true">↗</span>{item.location}
			</p>
		{/if}
	</header>

	<section class={d.signalMeters} aria-label="Signal strength">
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Impact</span>
			<div
				class={d.meterBar}
				role="meter"
				aria-valuenow={impact}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Impact score {impact}"
			>
				<div class="h-full bg-event transition-[width] duration-veritas" style="width: {impact}%"></div>
			</div>
			<span class={d.meterVal}>{impact}</span>
		</div>
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Conviction</span>
			<div
				class={d.meterBar}
				role="meter"
				aria-valuenow={conviction}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Analyst conviction {conviction}%"
			>
				<div class="h-full bg-event transition-[width] duration-veritas" style="width: {conviction}%"></div>
			</div>
			<span class={d.meterVal}>{conviction}%</span>
		</div>
	</section>

	<section class={d.metaGrid} aria-label="Event metadata">
		{#if sentiment != null}
			<MetadataRow label="Sentiment index" value={String(sentiment)} />
		{/if}
		<MetadataRow label="Cluster size" value={formatCompactNumber(item.clusterSize)} />
		<MetadataRow label="Sources" value={formatCompactNumber(item.sourceCount)} />
		<MetadataRow label="Happened" value={formatDateTime(item.happenedAt)} />
		<MetadataRow label="Updated" value={formatDateTime(item.lastUpdatedAt)} />
		<MetadataRow label="Generated" value={formatDateTime(item.generatedAt)} />
	</section>

	{#if item.keywords.length}
		<section class={d.chipSection} aria-label="Keywords">
			<p class={d.sectionLabel}>Keywords</p>
			<div class={d.chipGroup}>
				{#each item.keywords as kw (kw)}
					<TagChip label={kw} variant="neutral" />
				{/each}
			</div>
		</section>
	{/if}

	{#if item.entities.length}
		<section class={d.chipSection} aria-label="Entities">
			<p class={d.sectionLabel}>Entities</p>
			<div class={d.chipGroup}>
				{#each item.entities as entity (entity)}
					<TagChip label={entity} variant="event" />
				{/each}
			</div>
		</section>
	{/if}

	{#if supportingArticles.length}
		<section class={d.articlesSection} aria-label="Supporting coverage">
			<p class={d.sectionLabel}>Supporting coverage</p>
			<div class={d.articleList}>
				{#each supportingArticles as article (article.id)}
					<ArticleRow {article} />
				{/each}
			</div>
		</section>
	{/if}
</article>
