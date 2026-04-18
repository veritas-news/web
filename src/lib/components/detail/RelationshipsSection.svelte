<script lang="ts">
	import {
		fetchEventRelationships,
		fetchGlobalRelationships,
		fetchTopicRelationships
	} from '$lib/api/relationships';
	import RelationshipRow from '$lib/components/detail/RelationshipRow.svelte';
	import { detail as d } from '$lib/ui/detailClasses';
	import type {
		EventRelationshipsContext,
		GlobalRelationshipsContext,
		RelationshipsResult,
		RelationshipsSurface,
		TopicRelationshipsContext
	} from '$lib/types/relationships';

	interface Props {
		surface: RelationshipsSurface;
		id: string;
	}

	type ContextUnion =
		| EventRelationshipsContext
		| TopicRelationshipsContext
		| GlobalRelationshipsContext;

	let { surface, id }: Props = $props();
	let result = $state<RelationshipsResult<ContextUnion> | null>(null);

	function fetchFor(
		s: RelationshipsSurface,
		targetId: string
	): Promise<RelationshipsResult<ContextUnion>> {
		if (s === 'event') return fetchEventRelationships(fetch, targetId);
		if (s === 'topic') return fetchTopicRelationships(fetch, targetId);
		return fetchGlobalRelationships(fetch, targetId);
	}

	$effect(() => {
		const targetId = id;
		const s = surface;
		if (!targetId) return;
		let cancelled = false;
		result = null;
		fetchFor(s, targetId).then((r) => {
			if (!cancelled) result = r;
		});
		return () => {
			cancelled = true;
		};
	});
</script>

<section class={d.relatedSection} aria-label="Relationships">
	<p class={d.sectionLabel}>Relationships</p>

	{#if result == null}
		<p class="m-0 font-sans text-body text-ink-muted">Loading…</p>
	{:else if result.kind === 'unavailable'}
		<p class="m-0 font-sans text-body text-ink-muted">{result.message}</p>
	{:else if result.kind === 'not_found'}
		<p class="m-0 font-sans text-body text-ink-muted">{result.message}</p>
	{:else if result.kind === 'error'}
		<p class="m-0 font-sans text-body text-ink-muted">{result.message}</p>
	{:else if result.data.relationships.length === 0}
		<p class="m-0 font-sans text-body text-ink-muted">No structural edges.</p>
	{:else}
		<ul class="m-0 grid list-none gap-px bg-outline-variant p-0">
			{#each result.data.relationships as rel (rel.kind + rel.targetId)}
				<RelationshipRow {rel} />
			{/each}
		</ul>
	{/if}
</section>
