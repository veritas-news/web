<script lang="ts">
	import type { TimelineCardModel } from '$lib/types/timeline';

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
</script>

<button
	bind:this={btnEl}
	type="button"
	class={['timeline-card', card.type, { selected }]}
	aria-pressed={selected}
	aria-label="{typeLabel[card.type]}: {card.title}"
	onclick={onselect}
>
	<div class="card-top">
		<span class={['type-chip', card.type]}>{typeLabel[card.type]}</span>
		<span class="timestamp" aria-label="Published {card.timestamp}">{card.timestamp}</span>
	</div>

	<div class="card-body">
		<p class="subtitle">{card.subtitle}</p>
		<h3 class="title">{card.title}</h3>
		<p class="description">{card.description}</p>
	</div>

	{#if card.metrics.length}
		<div class="metrics" aria-label="Metrics">
			{#each card.metrics as metric (metric)}
				<span>{metric}</span>
			{/each}
		</div>
	{/if}

	<div class="score-row" aria-label="Impact {card.impactScore}, conviction {card.analystConviction}%">
		<div class="conviction-bar">
			<div class="conviction-fill" style="width: {Math.min(100, card.analystConviction)}%"></div>
		</div>
		<span class="impact-val">{card.impactScore}</span>
	</div>
</button>

<style>
	/* ── Base card ── */
	.timeline-card {
		display: grid;
		gap: var(--sp-3);
		width: 100%;
		border: none;
		border-left: 2px solid transparent;
		border-radius: var(--radius);
		background: var(--surface-high);
		padding: var(--sp-3) var(--sp-4);
		text-align: left;
		cursor: pointer;
		transition:
			background var(--transition),
			border-left-color var(--transition),
			transform var(--transition);
	}

	.timeline-card:hover {
		background: var(--surface-highest);
		transform: translateX(2px);
	}

	.timeline-card:focus-visible {
		outline: 1px solid var(--clr-event);
		outline-offset: -1px;
	}

	/* ── Type variants ── */
	.timeline-card.event {
		border-left-color: var(--clr-event);
		padding: var(--sp-3) var(--sp-4);
	}

	.timeline-card.topic_event {
		border-left-width: 3px;
		border-left-color: var(--clr-topic);
		padding: var(--sp-4) var(--sp-5);
	}

	.timeline-card.global_event {
		border-left-width: 4px;
		border-left-color: var(--clr-global);
		padding: var(--sp-5) var(--sp-6);
	}

	/* ── Selected ── */
	.timeline-card.event.selected {
		background: rgba(195, 199, 204, 0.07);
		border-left-color: var(--clr-event);
	}
	.timeline-card.topic_event.selected {
		background: rgba(254, 179, 0, 0.07);
		border-left-color: var(--clr-topic);
	}
	.timeline-card.global_event.selected {
		background: rgba(236, 145, 255, 0.09);
		border-left-color: var(--clr-global);
	}

	/* ── Card top ── */
	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--sp-2);
	}

	.type-chip {
		display: inline-flex;
		align-items: center;
		border-radius: var(--radius);
		padding: 0.15rem var(--sp-2);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.type-chip.event {
		background: var(--clr-event-container);
		color: var(--clr-event);
	}
	.type-chip.topic_event {
		background: var(--clr-topic-container);
		color: var(--clr-topic);
	}
	.type-chip.global_event {
		background: var(--clr-global-container);
		color: var(--clr-global);
	}

	.timestamp {
		color: var(--ink-muted);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 500;
		white-space: nowrap;
	}

	/* ── Card body ── */
	.card-body {
		display: grid;
		gap: var(--sp-2);
	}

	.subtitle {
		margin: 0;
		color: var(--ink-muted);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.title {
		margin: 0;
		color: var(--ink);
		font-family: var(--font-sans);
		font-size: var(--text-title);
		font-weight: 500;
		line-height: 1.25;
		transition: color var(--transition);
	}

	.timeline-card.event.selected .title  { color: var(--clr-event); }
	.timeline-card.topic_event.selected .title  { color: var(--clr-topic); }
	.timeline-card.global_event.selected .title { color: var(--clr-global); }

	.timeline-card.topic_event .title {
		font-size: var(--text-title-lg);
		font-weight: 600;
	}

	.timeline-card.global_event .title {
		font-family: var(--font-serif);
		font-size: var(--text-headline);
		font-weight: 700;
		line-height: 1.15;
	}

	.description {
		display: -webkit-box;
		margin: 0;
		color: var(--ink-soft);
		font-family: var(--font-sans);
		font-size: var(--text-body);
		line-height: 1.55;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* ── Metrics ── */
	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
	}

	.metrics span {
		color: var(--ink-muted);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.metrics span + span::before {
		content: '·';
		margin-right: var(--sp-2);
		opacity: 0.4;
	}

	/* ── Score row: conviction bar + impact value ── */
	.score-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: var(--sp-2);
	}

	.conviction-bar {
		height: 2px;
		background: var(--outline-variant);
		overflow: hidden;
	}

	.conviction-fill {
		height: 100%;
		background: var(--clr-event);
		transition: width var(--transition);
	}

	.timeline-card.topic_event .conviction-fill {
		background: var(--clr-topic);
	}
	.timeline-card.global_event .conviction-fill {
		background: var(--clr-global);
	}

	.impact-val {
		color: var(--ink-muted);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.04em;
	}

	.timeline-card.event.selected .impact-val   { color: var(--clr-event); }
	.timeline-card.topic_event.selected .impact-val  { color: var(--clr-topic); }
	.timeline-card.global_event.selected .impact-val { color: var(--clr-global); }
</style>
