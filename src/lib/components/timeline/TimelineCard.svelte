<script lang="ts">
	import type { TimelineCardModel } from '$lib/types/timeline';
	import { cn } from '$lib/cn';

	interface Props {
		card: TimelineCardModel;
		selected?: boolean;
		onselect: () => void;
	}

	let { card, selected = false, onselect }: Props = $props();

	let btnEl = $state<HTMLButtonElement | null>(null);

	$effect(() => {
		if (!selected || !btnEl) return;
		const container = btnEl.closest<HTMLElement>('[data-timeline-scroll]');
		if (!container) return;
		const target = btnEl.offsetTop + btnEl.offsetHeight / 2 - container.clientHeight / 2;
		container.scrollTo({ top: target, behavior: 'smooth' });
	});

	const typeLabel = {
		event: 'Event',
		topic_event: 'Topic',
		global_event: 'Global'
	} as const;

	const btnClass = $derived(
		cn(
			'group/timeline relative grid w-full cursor-pointer overflow-hidden rounded-none border-0 text-left',
			'border-l-2 border-l-transparent bg-surface-high',
			'bg-[linear-gradient(135deg,rgb(255_255_255/0.04)_0%,transparent_48%)]',
			'transition-[background-color,border-color,transform,box-shadow] duration-veritas-slow ease-veritas-out',
			'after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgb(255_255_255/0.02)_0%,transparent_35%)] after:opacity-0 after:transition-opacity after:duration-veritas-slow after:ease-veritas-out',
			'hover:bg-surface-highest hover:translate-x-[3px] hover:shadow-card-hover hover:after:opacity-100',
			'focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-event',
			card.type === 'event' && 'gap-sp-3 border-l-event px-sp-3 py-sp-3',
			card.type === 'topic_event' && 'gap-sp-3 border-l-[3px] border-l-topic px-sp-4 py-sp-4',
			card.type === 'global_event' && 'gap-sp-3 border-l-4 border-l-global px-sp-5 py-sp-5',
			selected && card.type === 'event' && 'border-l-event bg-event/[0.09] shadow-glow-event',
			selected && card.type === 'topic_event' && 'border-l-topic bg-topic/[0.1] shadow-glow-topic',
			selected && card.type === 'global_event' && 'border-l-global bg-global/[0.12] shadow-glow-global'
		)
	);

	const titleClass = $derived(
		cn(
			'm-0 font-display font-semibold leading-snug text-ink transition-colors duration-veritas-slow ease-veritas-out',
			card.type === 'event' && 'text-title',
			card.type === 'topic_event' && 'text-title-lg',
			card.type === 'global_event' && 'text-headline font-bold leading-[1.15]',
			selected && card.type === 'event' && 'text-event',
			selected && card.type === 'topic_event' && 'text-topic',
			selected && card.type === 'global_event' && 'text-global'
		)
	);

	const typeChipClass = $derived(
		cn(
			'inline-flex items-center rounded-none py-0.5 px-sp-2 font-sans text-label font-bold uppercase tracking-[0.08em]',
			card.type === 'event' && 'bg-event-container text-event',
			card.type === 'topic_event' && 'bg-topic-container text-topic',
			card.type === 'global_event' && 'bg-global-container text-global'
		)
	);

	const signalPillClass = $derived(
		cn(
			'inline-flex border-l-2 py-0.5 px-2 font-sans text-[0.625rem] font-semibold uppercase tracking-wide text-ink-muted',
			card.type === 'event' && 'border-l-event bg-event/[0.06]',
			card.type === 'topic_event' && 'border-l-topic bg-topic/[0.07]',
			card.type === 'global_event' && 'border-l-global bg-global/[0.08]'
		)
	);

	const convictionFillClass = $derived(
		cn(
			'h-full transition-[width] duration-veritas-slow ease-veritas-out',
			card.type === 'event' && 'bg-event',
			card.type === 'topic_event' && 'bg-topic',
			card.type === 'global_event' && 'bg-global'
		)
	);

	const impactValClass = $derived(
		cn(
			'font-display text-[1.35rem] font-bold tabular-nums leading-none text-ink',
			selected && card.type === 'event' && 'text-event',
			selected && card.type === 'topic_event' && 'text-topic',
			selected && card.type === 'global_event' && 'text-global'
		)
	);
</script>

<button
	bind:this={btnEl}
	type="button"
	class={btnClass}
	aria-pressed={selected}
	aria-label="{typeLabel[card.type]}: {card.title}"
	onclick={onselect}
>
	<div class="flex items-center justify-between gap-sp-2">
		<span class={typeChipClass}>{typeLabel[card.type]}</span>
		<span class="whitespace-nowrap font-sans text-label font-medium text-ink-muted" aria-label="Published {card.timestamp}"
			>{card.timestamp}</span
		>
	</div>

	<div class="grid gap-sp-2">
		<p class="m-0 font-sans text-label font-semibold uppercase tracking-wide text-ink-muted">{card.subtitle}</p>
		<h3 class={titleClass}>{card.title}</h3>
		{#if card.description !== card.title && !card.description.includes(card.title)}
			<p
				class="m-0 line-clamp-2 font-sans text-body leading-[1.55] text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical]"
			>
				{card.description}
			</p>
		{/if}
	</div>

	{#if card.metrics.length}
		<div class="flex flex-wrap gap-sp-2" aria-label="Metrics">
			{#each card.metrics as metric (metric)}
				<span
					class="inline-flex items-center border border-outline-variant/80 bg-surface/40 px-[0.45rem] py-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-wide text-ink-soft"
					>{metric}</span
				>
			{/each}
		</div>
	{/if}

	{#if card.signals.length}
		<div class="flex flex-wrap gap-sp-2" aria-label="Analytic signals">
			{#each card.signals as sig (sig)}
				<span class={signalPillClass}>{sig}</span>
			{/each}
		</div>
	{/if}

	<div
		class="grid items-end gap-sp-3 border-t border-outline-variant/65 pt-sp-1 {card.analystConviction != null
			? 'grid-cols-[1fr_auto]'
			: 'grid-cols-1 justify-items-end'}"
		aria-label={card.analystConviction != null
			? `Impact ${card.impactScore}, conviction ${card.analystConviction}%`
			: `Impact ${card.impactScore}`}
	>
		{#if card.analystConviction != null}
			<div class="min-w-0">
				<div class="grid grid-cols-[auto_1fr_auto] items-center gap-sp-2">
					<span class="whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink-muted"
						>Conviction</span
					>
					<div class="h-0.5 overflow-hidden bg-outline-variant">
						<div
							class={convictionFillClass}
							style="width: {Math.min(100, card.analystConviction)}%"
						></div>
					</div>
					<span class="min-w-[2.25rem] text-right font-sans text-label font-bold tabular-nums text-ink-soft"
						>{Math.round(card.analystConviction)}%</span
					>
				</div>
			</div>
		{/if}
		<div
			class="grid min-w-[4.5rem] justify-items-end gap-0.5 border border-outline-variant bg-surface/55 px-sp-2 py-sp-1"
		>
			<span class="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-ink-muted">Impact</span>
			<span class={impactValClass}>{card.impactScore}</span>
		</div>
	</div>
</button>
