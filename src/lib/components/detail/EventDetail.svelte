<script lang="ts">
	import RelationshipsSection from '$lib/components/detail/RelationshipsSection.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import MetadataRow from '$lib/components/ui/MetadataRow.svelte';
	import ArticleRow from '$lib/components/ui/ArticleRow.svelte';
	import { detail as d } from '$lib/ui/detailClasses';
	import type { EventDetail } from '$lib/types/event';
	import {
		labelConvictionBand,
		bandFromConvictionScore,
		labelImpactBand,
		bandFromImpactScore,
		sentimentDisplay,
		titleConvictionScore,
		titleImpactScore
	} from '$lib/metrics/displayBands';
	import { formatCompactNumber, formatDateTime } from '$lib/utils/format';
	import { supportingArticlesSortedByImage } from '$lib/utils/articleDisplay';
	import { clipToSentences, confidenceNarrative, evolutionNarrative } from '$lib/utils/detailInsights';

	interface Props {
		item: EventDetail;
	}

	let { item }: Props = $props();

	const supportingArticles = $derived(supportingArticlesSortedByImage(item.supportingArticles));

	const lifecycleLine = $derived.by((): string | null => {
		const l = item.lifecycleV1;
		if (!l?.phase) return null;
		const span = l.spanHours;
		const spanLabel =
			span < 72 ? `${Math.round(span)}h span` : `${Math.round(span / 24)}d span`;
		const phase =
			l.phase === 'acute'
				? 'Acute'
				: l.phase === 'developing'
					? 'Developing'
					: l.phase === 'sustained'
						? 'Sustained'
						: l.phase === 'stale'
							? 'Stale'
							: l.phase;
		return `${phase} · ${spanLabel}`;
	});

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

	{#if item.insightV1}
		<section class="border-l-2 border-event bg-surface-high p-sp-4" aria-label="Insight">
			<p class={d.sectionLabel}>Why this matters</p>
			<p class="font-sans text-body text-ink-soft leading-relaxed">
				{clipToSentences(item.insightV1.whyThisMatters, 2)}
			</p>
			<p class={`${d.sectionLabel} mt-sp-4`}>How confident we are</p>
			<div
				class="h-2 w-full overflow-hidden rounded-sm bg-outline-variant"
				role="meter"
				aria-valuenow={item.insightV1.confidenceScore}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="How much reporting agrees, about {item.insightV1.confidenceScore} out of 100"
			>
				<div
					class="h-full bg-event transition-[width] duration-veritas"
					style="width: {Math.min(100, Math.max(0, item.insightV1.confidenceScore))}%"
				></div>
			</div>
			<p class="mt-sp-3 font-sans text-body text-ink-soft leading-relaxed">
				{confidenceNarrative(item.insightV1)}
			</p>
		</section>
	{/if}

	{#if item.eventEvolution}
		{@const evo = evolutionNarrative(item.eventEvolution)}
		<section class="border-l-2 border-topic bg-surface-low p-sp-4" aria-label="How this connects">
			<p class={d.sectionLabel}>How this connects</p>
			<p class="font-sans text-body text-ink-soft leading-relaxed">{evo.summary}</p>
			{#if evo.contextLine}
				<p class="mt-sp-3 font-sans text-body text-ink-soft leading-relaxed">{evo.contextLine}</p>
			{/if}
		</section>
	{/if}

	<section class={d.signalMeters} aria-label="Signal strength">
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Impact</span>
			<div
				class={d.meterBar}
				role="meter"
				aria-valuenow={impact}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Impact {labelImpactBand(bandFromImpactScore(impact))}"
			>
				<div class="h-full bg-event transition-[width] duration-veritas" style="width: {impact}%"></div>
			</div>
			<span class={d.meterVal} title={titleImpactScore(impact)}>{labelImpactBand(
					bandFromImpactScore(impact)
				)}</span>
		</div>
		<div class={d.meterGroup}>
			<span class={d.meterLabel}>Conviction</span>
			<div
				class={d.meterBar}
				role="meter"
				aria-valuenow={conviction}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Conviction {labelConvictionBand(bandFromConvictionScore(conviction))}"
			>
				<div class="h-full bg-event transition-[width] duration-veritas" style="width: {conviction}%"></div>
			</div>
			<span class={d.meterVal} title={titleConvictionScore(conviction)}>{labelConvictionBand(
					bandFromConvictionScore(conviction)
				)}</span>
		</div>
	</section>

	<section class={d.metaGrid} aria-label="Event metadata">
		{#if lifecycleLine}
			<MetadataRow label="Story phase" value={lifecycleLine} />
		{/if}
		{#if item.sourceReliabilityV1}
			<MetadataRow
				label="Source diversity"
				value="{Math.round(item.sourceReliabilityV1.diversity * 100)}% · {item.sourceReliabilityV1.uniqueDomains} domains / {item.sourceReliabilityV1.articleCount} articles"
			/>
		{/if}
		{#if sentiment != null}
			<MetadataRow label="Sentiment" value={sentimentDisplay(sentiment)} />
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

	{#if item.sourceReliabilityV1?.topDomains?.length}
		<section class={d.chipSection} aria-label="Sources by domain">
			<p class={d.sectionLabel}>Sources by domain</p>
			<ul class="m-0 list-none space-y-sp-2 p-0 font-sans text-body text-ink-soft">
				{#each item.sourceReliabilityV1.topDomains as row (row.domain)}
					<li class="flex justify-between gap-sp-4 border-b border-outline-variant/40 pb-sp-2 last:border-0">
						<span class="min-w-0 truncate text-ink">{row.domain}</span>
						<span class="shrink-0 tabular-nums text-ink-muted"
							>{row.count} · {Math.round(row.share * 100)}%</span
						>
					</li>
				{/each}
			</ul>
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

	<RelationshipsSection surface="event" id={item.id} />
</article>
