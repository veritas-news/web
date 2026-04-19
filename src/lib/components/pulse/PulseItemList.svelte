<script lang="ts">
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import {
		formatPulseLine,
		formatRelevanceGapLine,
		formatVelocityLine,
		titlePulseScore,
		titleRelevanceGap,
		titleVelocityScore
	} from '$lib/metrics/displayBands';
	import type { PulseItem } from '$lib/types/pulse';

	interface Props {
		items: PulseItem[];
		empty?: string;
	}

	let { items, empty = 'No entries in window.' }: Props = $props();

	function hrefFor(item: PulseItem): string {
		return item.type === 'global_event' ? `/global/${item.id}` : `/topics/${item.id}`;
	}

	function scopeVariant(scope?: string): 'event' | 'topic' | 'global' | 'neutral' {
		if (scope === 'global') return 'global';
		if (scope === 'regional') return 'topic';
		if (scope === 'local') return 'event';
		return 'neutral';
	}
</script>

{#if items.length === 0}
	<p class="m-0 font-sans text-body text-ink-muted">{empty}</p>
{:else}
	<ul class="m-0 grid list-none gap-sp-3 p-0">
		{#each items as item (item.id)}
			<li class="border border-outline-variant bg-surface-low p-sp-3">
				<a
					href={hrefFor(item)}
					class="mb-sp-1 inline-block font-semibold text-ink no-underline hover:bg-transparent hover:text-event"
					>{item.title}</a
				>
				<p class="m-0 flex flex-wrap gap-sp-2 font-sans text-label text-ink-muted">
					<TagChip
						label={formatPulseLine(item.pulse_score_v1)}
						variant={item.type === 'global_event' ? 'global' : 'topic'}
						title={titlePulseScore(item.pulse_score_v1)}
					/>
					<TagChip
						label={formatRelevanceGapLine(item.relevance_gap_v1)}
						variant="neutral"
						title={titleRelevanceGap(item.relevance_gap_v1)}
					/>
					{#if item.velocity_score_v1 != null}
						<TagChip
							label={formatVelocityLine(item.velocity_score_v1)}
							variant="neutral"
							title={titleVelocityScore(item.velocity_score_v1)}
						/>
					{/if}
					{#if item.impactScopeV1}
						<TagChip label={item.impactScopeV1} variant={scopeVariant(item.impactScopeV1)} />
					{/if}
					<TagChip label={`${item.article_count_in_window} articles`} variant="neutral" />
				</p>
			</li>
		{/each}
	</ul>
{/if}
