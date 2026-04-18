<script lang="ts">
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import { scopeVariant, stateVariant } from '$lib/services/alerts';
	import type { AlertSignalsV1 } from '$lib/types/alerts';

	interface Props {
		signals: AlertSignalsV1;
	}

	let { signals }: Props = $props();
</script>

<p class="m-0 flex flex-wrap gap-sp-2 font-sans text-label text-ink-muted">
	{#if signals.eventStateV1}
		<TagChip label={signals.eventStateV1} variant={stateVariant(signals.eventStateV1)} />
	{/if}
	{#if signals.impactScopeV1}
		<TagChip label={signals.impactScopeV1} variant={scopeVariant(signals.impactScopeV1)} />
	{/if}
	{#if signals.uncertaintyLevelV1}
		<TagChip label={`uncertainty ${signals.uncertaintyLevelV1}`} variant="neutral" />
	{/if}
</p>
