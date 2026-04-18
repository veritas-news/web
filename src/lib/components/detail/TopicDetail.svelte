<script lang="ts">
	import RelationshipsSection from '$lib/components/detail/RelationshipsSection.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
	import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
	import RelatedItemRow from '$lib/components/ui/RelatedItemRow.svelte';
	import { detail as d } from '$lib/ui/detailClasses';
	import type { TopicEventDetail } from '$lib/types/event';
	import { formatCompactNumber, formatDateRange, formatDateTime } from '$lib/utils/format';
	import { supportingArticlesSortedByImage } from '$lib/utils/articleDisplay';

	interface Props {
		item: TopicEventDetail;
	}

	let { item }: Props = $props();

	const supportingArticles = $derived(supportingArticlesSortedByImage(item.supportingArticles));

	const conviction = $derived(Math.min(100, Math.max(0, Math.round(item.analystConviction))));
	const impact = $derived(Math.min(100, Math.max(0, Math.round(item.impactScore))));
	const sentiment = $derived.by(() => {
		const s = item.sentimentIndex;
		if (s == null || Number.isNaN(s)) return '—';
		return Math.round(s * 100) / 100;
	});
</script>

<article class={d.root} aria-label="Topic: {item.title}">
	<header class={d.hero}>
		<div class={d.heroType}>
			<TagChip label="Topic Event" variant="topic" />
			<TagChip label={item.regionScope} variant="neutral" />
		</div>

		<p class={d.subtitle}>{item.subtitle}</p>
		<h2 class={d.headlineTopic}>{item.title}</h2>
		{#if item.description !== item.title && !item.description.includes(item.title)}
			<p class={d.description}>{item.description}</p>
		{/if}

		<p class={d.timespan} aria-label="Time range">
			<span class={d.timespanLabelTopic}>Span</span>
			{formatDateRange(item.timeStart, item.timeEnd)}
		</p>
	</header>

	<section class={d.signalMeters} aria-label="Signal strength">
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Impact</span>
			<div class={d.meterBar} role="meter" aria-valuenow={impact} aria-valuemin={0} aria-valuemax={100}>
				<div class="h-full bg-topic transition-[width] duration-veritas" style="width: {impact}%"></div>
			</div>
			<span class={d.meterVal}>{impact}</span>
		</div>
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Conviction</span>
			<div class={d.meterBar} role="meter" aria-valuenow={conviction} aria-valuemin={0} aria-valuemax={100}>
				<div class="h-full bg-topic transition-[width] duration-veritas" style="width: {conviction}%"></div>
			</div>
			<span class={d.meterVal}>{conviction}%</span>
		</div>
	</section>

	<section class={d.metaGrid} aria-label="Topic metadata">
		<MetadataRow label="Region" value={item.regionScope} />
		<MetadataRow label="Size" value={formatCompactNumber(item.size)} />
		<MetadataRow label="Articles" value={formatCompactNumber(item.articleCount)} />
		<MetadataRow label="Sentiment" value={sentiment} />
		<MetadataRow label="Article density" value={item.articleDensity.toFixed(2)} />
		<MetadataRow label="Relevance gap" value={item.relevanceGap.toFixed(2)} />
		<MetadataRow label="Updated" value={formatDateTime(item.lastUpdatedAt)} />
		<MetadataRow label="Generated" value={formatDateTime(item.generatedAt)} />
	</section>

	{#if item.relatedSubEvents.length}
		<section class={d.relatedSection} aria-label="Related sub-events">
			<p class={d.sectionLabel}>Related sub-events</p>
			<div class={d.relatedList}>
				{#each item.relatedSubEvents as sub (sub.id)}
					<a href="/events/{sub.id}" class={d.relatedLink} data-sveltekit-preload-data="hover">
						<RelatedItemRow
							title={sub.title}
							subtitle={sub.subtitle}
							meta={formatDateTime(sub.timelineAt ?? sub.happenedAt)}
							label={sub.primaryCategory}
							variant="event"
						/>
					</a>
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

	<RelationshipsSection surface="topic" id={item.id} />
</article>
