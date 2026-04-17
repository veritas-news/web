<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import TimelineCard from '$lib/components/timeline/TimelineCard.svelte';
	import TimelineConnector from '$lib/components/timeline/TimelineConnector.svelte';
	import LoadMoreButton from '$lib/components/ui/LoadMoreButton.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import type { TimelineCardModel } from '$lib/types/timeline';

	interface Props {
		cards: TimelineCardModel[];
		selectedId: string | null;
		listError?: string | null;
		loadingMore?: boolean;
		hasMore?: boolean;
		onselect: (id: string) => void;
		onloadmore: () => void;
	}

	let {
		cards,
		selectedId,
		listError = null,
		loadingMore = false,
		hasMore = false,
		onselect,
		onloadmore
	} = $props();
</script>

<div class="grid gap-sp-4" role="feed" aria-label="Global intelligence timeline">
	{#if listError}
		<ErrorMessage title="Timeline error" message={listError} />
	{:else if cards.length === 0}
		<section class="grid gap-sp-2 border-l-2 border-outline-variant px-sp-4 py-sp-6" aria-live="polite">
			<p class="m-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-event">Timeline</p>
			<h3 class="m-0 font-serif text-[2.125rem] leading-[1.12] text-ink md:text-[2.375rem]">Awaiting signal</h3>
			<p class="m-0 font-sans text-body leading-relaxed text-ink-soft">
				Events emerge as geopolitical incidents clear quality threshold.
			</p>
		</section>
	{:else}
		<ol class="m-0 grid list-none gap-0 p-0" aria-label="{cards.length} intelligence items">
			{#each cards as card, i (card.id)}
				<li
					class="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-sp-3"
					animate:flip={{ duration: 250, easing: cubicOut }}
					in:fly={{ y: 8, duration: 200, delay: Math.min(i * 20, 200), easing: cubicOut }}
				>
					<TimelineConnector type={card.type} terminal={i === cards.length - 1} />
					<TimelineCard
						{card}
						selected={selectedId === card.id}
						onselect={() => onselect(card.id)}
					/>
				</li>
			{/each}
		</ol>

		{#if hasMore}
			<div in:fly={{ y: 4, duration: 200 }}>
				<LoadMoreButton loading={loadingMore} onclick={onloadmore} />
			</div>
		{/if}
	{/if}
</div>
