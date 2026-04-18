<script lang="ts">
	import AlertSignalMeter from '$lib/components/alerts/AlertSignalMeter.svelte';
	import AlertSignalsRow from '$lib/components/alerts/AlertSignalsRow.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import {
		convictionPct,
		fingerprintBody,
		formatAlertDate,
		impactPct,
		shortFingerprint
	} from '$lib/services/alerts';
	import type { AlertItem } from '$lib/types/alerts';

	interface Props {
		item: AlertItem;
	}

	let { item }: Props = $props();

	const href = $derived(`/events/${encodeURIComponent(item.eventId)}`);
	const title = $derived(item.preview?.title ?? item.eventId);
	const dateDisplay = $derived(
		formatAlertDate(item.preview?.happenedAt ?? item.preview?.lastUpdatedAt)
	);
	const impact = $derived(impactPct(item.signals));
	const conviction = $derived(convictionPct(item.signals));

	const prevShort = $derived(shortFingerprint(fingerprintBody(item.previousFingerprint)));
	const currShort = $derived(shortFingerprint(fingerprintBody(item.currentFingerprint)));
	const isNew = $derived(!item.previousFingerprint);
</script>

<article
	class="grid gap-sp-3 border border-outline-variant bg-surface-low p-sp-4 transition-colors duration-veritas hover:border-event/45"
>
	<header class="grid gap-sp-2">
		<div class="flex flex-wrap items-baseline justify-between gap-sp-2">
			<div class="flex flex-wrap items-center gap-sp-2">
				<TagChip
					label={isNew ? 'new signal' : 'updated signal'}
					variant={isNew ? 'event' : 'neutral'}
				/>
				{#if item.preview?.primaryCategory}
					<TagChip label={item.preview.primaryCategory} variant="neutral" />
				{/if}
			</div>
			{#if dateDisplay}
				<span class="font-mono text-label text-ink-muted">{dateDisplay}</span>
			{/if}
		</div>

		{#if item.preview?.subtitle}
			<p class="m-0 font-sans text-label uppercase tracking-[0.08em] text-ink-muted">
				{item.preview.subtitle}
			</p>
		{/if}

		<a
			{href}
			class="font-serif text-headline font-semibold leading-[1.2] text-ink no-underline hover:bg-transparent hover:text-event"
		>
			{title}
		</a>

		{#if item.preview?.description}
			<p class="m-0 max-w-[70ch] font-sans text-body leading-[1.55] text-ink-soft line-clamp-3">
				{item.preview.description}
			</p>
		{/if}

		{#if item.preview?.locationName}
			<p class="m-0 font-sans text-label text-ink-muted">
				<span aria-hidden="true">↗</span>
				{item.preview.locationName}
			</p>
		{/if}
	</header>

	<section aria-label="Signal strength" class="grid gap-sp-2">
		<AlertSignalMeter label="Impact" value={impact} tone="event" />
		<AlertSignalMeter label="Conv." value={conviction} tone="topic" suffix="%" />
	</section>

	<AlertSignalsRow signals={item.signals} />

	<footer
		class="flex flex-wrap items-center justify-between gap-sp-2 border-t border-outline-variant/60 pt-sp-2"
	>
		<p class="m-0 flex flex-wrap items-center gap-sp-2 font-mono text-label text-ink-muted">
			<span class="uppercase tracking-[0.08em]">fingerprint</span>
			<span aria-hidden="true">{prevShort}</span>
			<span class="text-event" aria-hidden="true">→</span>
			<span class="text-ink">{currShort}</span>
		</p>
		<a
			{href}
			class="font-sans text-label font-semibold uppercase tracking-wide text-ink-soft no-underline hover:text-event"
			data-sveltekit-preload-data="hover"
		>
			Open event →
		</a>
	</footer>
</article>
