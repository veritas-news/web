<script lang="ts">
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import { intelligenceDetailPath } from '$lib/utils/intelligenceLinks';
	import { savedItems, removeSaved, clearSaved } from '$lib/stores/savedItems';
	import { formatDateTime } from '$lib/utils/format';
	import type { EventType } from '$lib/types/event';

	function typeLabel(t: EventType): string {
		if (t === 'event') return 'Event';
		if (t === 'topic_event') return 'Topic';
		return 'Global';
	}

	function variant(t: EventType): 'event' | 'topic' | 'global' {
		if (t === 'topic_event') return 'topic';
		if (t === 'global_event') return 'global';
		return 'event';
	}
</script>

<svelte:head>
	<title>Saved — Veritas</title>
	<meta name="description" content="Bookmarked intelligence items stored in this browser." />
</svelte:head>

<div class="mx-auto grid max-w-[44rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="grid gap-sp-3 border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-topic uppercase">Bookmarks</p>
		<h1 class="m-0 font-serif text-headline font-semibold">Saved</h1>
		<p class="m-0 max-w-[52ch] leading-[1.65] text-ink-soft">
			Items you star from the timeline detail panel. Stored only in this browser (<code class="text-[0.9em] text-event"
				>localStorage</code
			>).
		</p>
		{#if $savedItems.length}
			<button
				type="button"
				class="justify-self-start border border-error-container bg-transparent px-sp-4 py-sp-2 font-sans text-label font-bold tracking-[0.06em] text-error uppercase hover:bg-[rgb(238_125_119/0.08)]"
				onclick={() => clearSaved()}
			>
				Clear all
			</button>
		{/if}
	</header>

	{#if $savedItems.length === 0}
		<p class="m-0 leading-[1.65] text-ink-muted">
			Nothing saved yet. Open a timeline item and choose <strong class="font-semibold text-ink">Save</strong>.
		</p>
	{:else}
		<ul class="m-0 grid list-none gap-sp-3 p-0">
			{#each $savedItems as item (item.id + item.type)}
				<li
					class="flex flex-wrap items-start justify-between gap-sp-3 border border-outline-variant bg-surface-low p-sp-4"
				>
					<div class="grid min-w-0 flex-1 gap-sp-2">
						<TagChip label={typeLabel(item.type)} variant={variant(item.type)} />
						<a
							href={intelligenceDetailPath(item.type, item.id)}
							class="font-semibold text-ink no-underline hover:bg-transparent hover:text-event"
							>{item.title}</a
						>
						<p class="m-0 font-mono text-label tabular-nums text-ink-muted">
							Saved {formatDateTime(item.savedAt)}
						</p>
					</div>
					<button
						type="button"
						class="cursor-pointer border border-outline-variant bg-surface px-sp-3 py-sp-2 font-sans text-label font-semibold tracking-[0.04em] text-ink-muted uppercase hover:border-error hover:text-error"
						onclick={() => removeSaved(item.id, item.type)}
						aria-label="Remove {item.title}"
					>
						Remove
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
