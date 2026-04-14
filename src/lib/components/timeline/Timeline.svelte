<script lang="ts">
	import TimelineCard from '$lib/components/timeline/TimelineCard.svelte';
	import TimelineConnector from '$lib/components/timeline/TimelineConnector.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import type { TimelineCardModel } from '$lib/types/timeline';

	interface Props {
		heading: string;
		subheading: string;
		cards: TimelineCardModel[];
		selectedId: string | null;
		listError?: string | null;
		loadingMore?: boolean;
		nextCursor?: string | null;
		emptyTitle: string;
		emptyCopy: string;
		onselect: (id: string) => void;
		onloadmore: () => void;
	}

	let {
		heading,
		subheading,
		cards,
		selectedId,
		listError = null,
		loadingMore = false,
		nextCursor = null,
		emptyTitle,
		emptyCopy,
		onselect,
		onloadmore
	}: Props = $props();
</script>

<section class="timeline-panel">
	<header class="panel-head">
		<div>
			<p class="eyebrow">{heading}</p>
			<h2>{subheading}</h2>
		</div>
		<p class="count">{cards.length}</p>
	</header>

	{#if listError}
		<ErrorMessage title="Timeline fetch" message={listError} />
	{:else if cards.length}
		<ol class="timeline-list">
			{#each cards as card, index (card.id)}
				<li>
					<TimelineConnector terminal={index === cards.length - 1} />
					<TimelineCard
						{card}
						selected={selectedId === card.id}
						onselect={() => onselect(card.id)}
					/>
				</li>
			{/each}
		</ol>

		{#if nextCursor}
			<button class="load-more" type="button" onclick={onloadmore} disabled={loadingMore}>
				{#if loadingMore}
					<Spinner size="sm" />
					Loading more
				{:else}
					Load more
				{/if}
			</button>
		{/if}
	{:else}
		<section class="empty-state">
			<p class="eyebrow">{emptyTitle}</p>
			<h3>Waiting for signal</h3>
			<p>{emptyCopy}</p>
		</section>
	{/if}
</section>

<style>
	.timeline-panel {
		display: grid;
		gap: 1.15rem;
		height: 100%;
	}

	.panel-head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.eyebrow,
	.count {
		margin: 0;
		color: var(--ink-soft);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h2,
	h3 {
		margin: 0.35rem 0 0;
		font-family: var(--font-display);
	}

	h2 {
		font-size: 1.8rem;
	}

	h3 {
		font-size: 1.4rem;
	}

	.count {
		display: inline-grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		border: 1px solid rgba(133, 148, 178, 0.15);
		border-radius: 999px;
	}

	.timeline-list {
		display: grid;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.timeline-list li {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.9rem;
	}

	.load-more {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border: 1px solid rgba(0, 189, 214, 0.24);
		background: rgba(0, 189, 214, 0.08);
		border-radius: 999px;
		padding: 0.85rem 1.1rem;
		font-weight: 700;
		color: var(--ink);
	}

	.load-more:disabled {
		opacity: 0.72;
		cursor: progress;
	}

	.empty-state {
		display: grid;
		gap: 0.55rem;
		border: 1px dashed rgba(133, 148, 178, 0.22);
		border-radius: 1.35rem;
		padding: 1.2rem;
	}

	.empty-state p:last-child {
		margin: 0;
		color: var(--ink-soft);
		line-height: 1.6;
	}
</style>
