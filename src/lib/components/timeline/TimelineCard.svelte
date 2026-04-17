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
		{#if card.description !== card.title && !card.description.includes(card.title)}
			<p class="description">{card.description}</p>
		{/if}
	</div>

	{#if card.metrics.length}
		<div class="metrics" aria-label="Metrics">
			{#each card.metrics as metric (metric)}
				<span class="metric-pill">{metric}</span>
			{/each}
		</div>
	{/if}

	{#if card.signals.length}
		<div class="signals" aria-label="Analytic signals">
			{#each card.signals as sig (sig)}
				<span class="signal-pill">{sig}</span>
			{/each}
		</div>
	{/if}

	<div class="score-row" aria-label="Impact {card.impactScore}, conviction {card.analystConviction}%">
		<div class="score-meters">
			<div class="meter">
				<span class="meter-label">Conviction</span>
				<div class="conviction-bar">
					<div class="conviction-fill" style="width: {Math.min(100, card.analystConviction)}%"></div>
				</div>
				<span class="meter-val">{Math.round(card.analystConviction)}%</span>
			</div>
		</div>
		<div class="impact-block">
			<span class="impact-label">Impact</span>
			<span class="impact-val">{card.impactScore}</span>
		</div>
	</div>
</button>

<style>
	/* ── Base card ── */
	.timeline-card {
	--card-shine: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.04) 0%,
			transparent 48%,
			transparent 100%
		);
		display: grid;
		gap: var(--sp-3);
		width: 100%;
		border: none;
		border-left: 2px solid transparent;
		border-radius: var(--radius);
		background: var(--surface-high);
		background-image: var(--card-shine);
		padding: var(--sp-3) var(--sp-4);
		text-align: left;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition:
			background var(--transition-slow),
			border-left-color var(--transition-slow),
			transform var(--transition-slow),
			box-shadow var(--transition-slow);
	}

	.timeline-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 35%);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--transition-slow);
	}

	.timeline-card:hover {
		background-color: var(--surface-highest);
		transform: translateX(3px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
	}

	.timeline-card:hover::after {
		opacity: 1;
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
		background-color: rgba(195, 199, 204, 0.09);
		border-left-color: var(--clr-event);
		box-shadow: var(--glow-event);
	}
	.timeline-card.topic_event.selected {
		background-color: rgba(254, 179, 0, 0.1);
		border-left-color: var(--clr-topic);
		box-shadow: var(--glow-topic);
	}
	.timeline-card.global_event.selected {
		background-color: rgba(236, 145, 255, 0.12);
		border-left-color: var(--clr-global);
		box-shadow: var(--glow-global);
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
		font-family: var(--font-display);
		font-size: var(--text-title);
		font-weight: 600;
		line-height: 1.25;
		transition: color var(--transition-slow);
	}

	.timeline-card.event.selected .title  { color: var(--clr-event); }
	.timeline-card.topic_event.selected .title  { color: var(--clr-topic); }
	.timeline-card.global_event.selected .title { color: var(--clr-global); }

	.timeline-card.topic_event .title {
		font-size: var(--text-title-lg);
		font-weight: 600;
	}

	.timeline-card.global_event .title {
		font-family: var(--font-display);
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

	.metric-pill {
		display: inline-flex;
		align-items: center;
		padding: 0.12rem 0.45rem;
		border: 1px solid color-mix(in oklab, var(--outline-variant) 80%, transparent);
		color: var(--ink-soft);
		font-family: var(--font-sans);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: color-mix(in oklab, var(--surface) 40%, transparent);
	}

	.signals {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
	}

	.signal-pill {
		display: inline-flex;
		padding: 0.1rem 0.5rem;
		border-left: 2px solid var(--clr-event);
		font-family: var(--font-sans);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-muted);
		background: rgba(195, 199, 204, 0.06);
	}

	.timeline-card.topic_event .signal-pill {
		border-left-color: var(--clr-topic);
		background: rgba(254, 179, 0, 0.07);
	}
	.timeline-card.global_event .signal-pill {
		border-left-color: var(--clr-global);
		background: rgba(236, 145, 255, 0.08);
	}

	/* ── Score row: conviction bar + impact value ── */
	.score-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: var(--sp-3);
		padding-top: var(--sp-1);
		border-top: 1px solid color-mix(in oklab, var(--outline-variant) 65%, transparent);
	}

	.score-meters {
		min-width: 0;
	}

	.meter {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: var(--sp-2);
	}

	.meter-label {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-muted);
		white-space: nowrap;
	}

	.meter-val {
		font-size: var(--text-label);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--ink-soft);
		min-width: 2.25rem;
		text-align: right;
	}

	.conviction-bar {
		height: 3px;
		background: var(--outline-variant);
		overflow: hidden;
	}

	.conviction-fill {
		height: 100%;
		background: var(--clr-event);
		transition: width var(--transition-slow);
	}

	.timeline-card.topic_event .conviction-fill {
		background: var(--clr-topic);
	}
	.timeline-card.global_event .conviction-fill {
		background: var(--clr-global);
	}

	.impact-block {
		display: grid;
		justify-items: end;
		gap: 0.1rem;
		padding: var(--sp-1) var(--sp-2);
		border: 1px solid var(--outline-variant);
		background: color-mix(in oklab, var(--surface) 55%, transparent);
		min-width: 4.5rem;
	}

	.impact-label {
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-muted);
	}

	.impact-val {
		color: var(--ink);
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.timeline-card.event.selected .impact-val   { color: var(--clr-event); }
	.timeline-card.topic_event.selected .impact-val  { color: var(--clr-topic); }
	.timeline-card.global_event.selected .impact-val { color: var(--clr-global); }
</style>
