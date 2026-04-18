<script lang="ts">
	import RelationshipsSection from '$lib/components/detail/RelationshipsSection.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
	import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
	import RelatedItemRow from '$lib/components/ui/RelatedItemRow.svelte';
	import { detail as d } from '$lib/ui/detailClasses';
	import type { GlobalEventDetail } from '$lib/types/event';
	import { formatCompactNumber, formatDateRange, formatDateTime } from '$lib/utils/format';
	import { supportingArticlesSortedByImage } from '$lib/utils/articleDisplay';

	interface Props {
		item: GlobalEventDetail;
	}

	let { item }: Props = $props();

	const supportingArticles = $derived(supportingArticlesSortedByImage(item.supportingArticles));

	const conviction = $derived(Math.min(100, Math.max(0, Math.round(item.analystConviction))));
	const impact = $derived(Math.min(100, Math.max(0, Math.round(item.impactScore))));
</script>

<article class={d.root} aria-label="Global event: {item.title}">
	<header class={d.hero}>
		<div class={d.heroType}>
			<TagChip label="Global Event" variant="global" />
		</div>

		<p class={d.subtitle}>{item.subtitle}</p>
		<h2 class={d.headlineGlobal}>{item.title}</h2>
		{#if item.description !== item.title && !item.description.includes(item.title)}
			<p class={d.descriptionGlobal}>{item.description}</p>
		{/if}

		<p class={d.timespan} aria-label="Time range">
			<span class={d.timespanLabelGlobal}>Window</span>
			{formatDateRange(item.timeStart, item.timeEnd)}
		</p>
	</header>

	<section class={d.signalMeters} aria-label="Signal strength">
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Impact</span>
			<div class={d.meterBar} role="meter" aria-valuenow={impact} aria-valuemin={0} aria-valuemax={100}>
				<div class="h-full bg-global transition-[width] duration-veritas" style="width: {impact}%"></div>
			</div>
			<span class={d.meterVal}>{impact}</span>
		</div>
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Conviction</span>
			<div class={d.meterBar} role="meter" aria-valuenow={conviction} aria-valuemin={0} aria-valuemax={100}>
				<div class="h-full bg-global transition-[width] duration-veritas" style="width: {conviction}%"></div>
			</div>
			<span class={d.meterVal}>{conviction}%</span>
		</div>
	</section>

	<section class={d.metaGrid} aria-label="Global event metadata">
		<MetadataRow label="Topics" value={formatCompactNumber(item.topicCount)} />
		<MetadataRow label="Events" value={formatCompactNumber(item.eventCount)} />
		<MetadataRow label="Articles" value={formatCompactNumber(item.articleCount)} />
		<MetadataRow label="Updated" value={formatDateTime(item.lastUpdatedAt)} />
		<MetadataRow label="Generated" value={formatDateTime(item.generatedAt)} />
	</section>

	{#if item.relatedTopics.length}
		<section class={d.relatedSection} aria-label="Related regional topics">
			<p class={d.sectionLabel}>Regional topics</p>
			<div class={d.relatedList}>
				{#each item.relatedTopics as topic (topic.id)}
					<a href="/topics/{topic.id}" class={d.relatedLinkTopic} data-sveltekit-preload-data="hover">
						<RelatedItemRow title={topic.title} label={topic.regionScope} variant="topic" />
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

	<RelationshipsSection surface="global" id={item.id} />
</article>
