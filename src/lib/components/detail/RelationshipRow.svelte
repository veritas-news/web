<script lang="ts">
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import {
		formatRelationshipDate,
		formatRelationshipKind,
		hasPreviewContent,
		hrefForRelationship
	} from '$lib/services/relationships';
	import { formatImpactLine, titleImpactScore } from '$lib/metrics/displayBands';
	import type { RelationshipRef } from '$lib/types/relationships';

	interface Props {
		rel: RelationshipRef;
	}

	let { rel }: Props = $props();

	const href = $derived(hrefForRelationship(rel));
	const hasPreview = $derived(hasPreviewContent(rel));
	const date = $derived(
		formatRelationshipDate(rel.preview?.happenedAt ?? rel.preview?.lastUpdatedAt)
	);

	function variantForKind(kind: string): 'event' | 'topic' | 'global' | 'neutral' {
		if (kind === 'topic_membership' || kind === 'member_topic') return 'topic';
		if (kind === 'global_membership') return 'global';
		if (kind === 'peer_event' || kind === 'member_event') return 'event';
		return 'neutral';
	}
</script>

<li class="grid gap-sp-2 bg-surface-low px-sp-3 py-sp-3">
	{#if hasPreview}
		<div class="flex items-baseline justify-between gap-sp-3">
			<a class="font-semibold text-ink no-underline hover:text-event" {href}>
				{rel.preview?.title ?? rel.targetId}
			</a>
			<span class="font-sans text-label text-ink-muted">
				<TagChip label={formatRelationshipKind(rel.kind)} variant={variantForKind(rel.kind)} />
			</span>
		</div>
		{#if rel.preview?.description}
			<p class="m-0 font-sans text-body text-ink-soft line-clamp-2">
				{rel.preview.description}
			</p>
		{/if}
		<p class="m-0 flex flex-wrap gap-sp-2 font-sans text-label text-ink-muted">
			{#if date}
				<span>{date}</span>
			{/if}
			{#if typeof rel.preview?.impactScore === 'number'}
				<span title={titleImpactScore(rel.preview.impactScore)}
					>· {formatImpactLine(rel.preview.impactScore)}</span
				>
			{/if}
			<span>· {rel.relationshipSourceV1}</span>
			{#if !rel.preview?.title}
				<span class="font-mono">· {rel.targetId}</span>
			{/if}
		</p>
	{:else}
		<div class="flex items-baseline justify-between gap-sp-3">
			<a class="font-semibold text-ink no-underline hover:text-event" {href}>
				{rel.targetId}
			</a>
			<span class="font-sans text-label text-ink-muted">
				{formatRelationshipKind(rel.kind)} · {rel.relationshipSourceV1}
			</span>
		</div>
	{/if}
</li>
