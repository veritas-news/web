<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import TimelineContainer from '$lib/components/timeline/TimelineContainer.svelte';
	import EventDetail from '$lib/components/detail/EventDetail.svelte';
	import TopicDetail from '$lib/components/detail/TopicDetail.svelte';
	import GlobalDetail from '$lib/components/detail/GlobalDetail.svelte';
	import DetailActionBar from '$lib/components/detail/DetailActionBar.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import { describeAPIError } from '$lib/api/client';
	import { getEvent } from '$lib/api/events';
	import { getTopic } from '$lib/api/topics';
	import { getGlobalEvent } from '$lib/api/global';
	import { fetchFeedPage, type TimelineScope } from '$lib/services/timelineFeed';
	import { toTimelineCard } from '$lib/utils/timeline';
	import { subscribeRealtime } from '$lib/stores/realtime';
	import type { RealtimeMessage } from '$lib/api/realtime';
	import type {
		AnyDetail,
		UnifiedTimelineItem,
		EventDetail as EventDetailType,
		TopicEventDetail,
		GlobalEventDetail,
		EventType
	} from '$lib/types/event';
	import type { UnifiedPageData } from '$lib/types/timeline';
	import { cn } from '$lib/cn';

	const SPLIT_STORAGE_KEY = 'veritas.timelineSplitPct';
	const SPLIT_DEFAULT = 40;
	const SPLIT_MIN = 22;
	const SPLIT_MAX = 68;
	const REALTIME_DEBOUNCE_MS = 1_500;

	interface Props {
		data: UnifiedPageData;
		scope?: TimelineScope;
	}

	let { data, scope = 'unified' }: Props = $props();

	let items = $state<UnifiedTimelineItem[]>([]);
	let hasMore = $state(false);
	let nextCursor = $state<string | null>(null);
	let selectedId = $state<string | null>(null);
	let selectedType = $state<EventType | null>(null);
	let detail = $state<AnyDetail | null>(null);
	let listError = $state<string | null>(null);
	let detailError = $state<string | null>(null);
	let loadingMore = $state(false);
	let loadingDetail = $state(false);
	let activeRequest = 0;

	let workspaceEl = $state<HTMLDivElement | null>(null);
	let leftWidthPct = $state(SPLIT_DEFAULT);
	let splitDragging = $state(false);
	let liveUpdating = $state(false);
	let liveStale = $state(false);

	const cards = $derived(items.map(toTimelineCard));

	const eyebrowAccent = $derived(
		selectedType === 'topic_event'
			? 'text-topic'
			: selectedType === 'global_event'
				? 'text-global'
				: selectedType === 'event'
					? 'text-event'
					: 'text-ink-muted'
	);

	const detailPanelClass = $derived(
		selectedType === 'topic_event'
			? 'lg:border-l-topic/35 shadow-glow-topic'
			: selectedType === 'global_event'
				? 'lg:border-l-global/38 shadow-glow-global'
				: 'lg:border-l-event/28 shadow-glow-event'
	);

	const feedEyebrow = $derived(
		scope === 'events'
			? 'Level 1 — Events'
			: scope === 'topics'
				? 'Level 2 — Topics'
				: scope === 'global'
					? 'Level 3 — Global'
					: 'Global Intelligence'
	);

	const scopeDescription = $derived(
		scope === 'events'
			? 'Single incidents that passed cluster density and multi-source gates. Newest signals first.'
			: scope === 'topics'
				? 'Regional narratives synthesized across days or weeks. Follow article depth and sentiment drift.'
				: scope === 'global'
					? 'Widest arcs: themes that span borders and months. Impact and conviction are analyst-weighted.'
					: 'Unified stream: globals, topics, and events in one ranked feed—ordering is server-defined; do not merge client-side.'
	);

	untrack(() => seed(data));

	onMount(() => {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(SPLIT_STORAGE_KEY);
			if (raw != null) {
				const n = Number(raw);
				if (Number.isFinite(n)) {
					leftWidthPct = Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, n));
				}
			}
		} catch {
			/* ignore */
		}

		let debounceTimer: ReturnType<typeof setTimeout> | null = null;
		const unsubscribe = subscribeRealtime((msg) => {
			if (!isTimelineSignal(msg)) return;
			if (document.hidden) {
				liveStale = true;
				return;
			}
			if (debounceTimer != null) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				debounceTimer = null;
				void refreshFeed();
			}, REALTIME_DEBOUNCE_MS);
		});

		const onVisibility = () => {
			if (!document.hidden && liveStale) {
				liveStale = false;
				void refreshFeed();
			}
		};
		document.addEventListener('visibilitychange', onVisibility);

		return () => {
			if (debounceTimer != null) clearTimeout(debounceTimer);
			unsubscribe();
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});

	function isTimelineSignal(msg: RealtimeMessage): boolean {
		return (
			msg.type === 'event.created' ||
			msg.type === 'event.updated' ||
			msg.type === 'event.merged' ||
			msg.type === 'hierarchy.updated' ||
			msg.type === 'alert.signal'
		);
	}

	async function refreshFeed() {
		if (liveUpdating) return;
		liveUpdating = true;
		try {
			const page = await fetchFeedPage(fetch, scope, null);
			const previousSelected = selectedId;
			const seen = new Set<string>();
			const merged: UnifiedTimelineItem[] = [];
			for (const item of page.items) {
				seen.add(item.id);
				merged.push(item);
			}
			for (const existing of items) {
				if (!seen.has(existing.id)) merged.push(existing);
			}
			items = merged;
			hasMore = page.hasMore;
			nextCursor = page.nextCursor;
			if (previousSelected) {
				const stillThere = merged.find((i) => i.id === previousSelected);
				if (stillThere) selectedType = stillThere.type;
			}
			listError = null;
		} catch (err) {
			console.warn('[timeline] realtime refresh failed', err);
		} finally {
			liveUpdating = false;
		}
	}

	function clampSplit(n: number): number {
		return Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, n));
	}

	function persistSplit() {
		if (!browser) return;
		try {
			localStorage.setItem(SPLIT_STORAGE_KEY, String(Math.round(leftWidthPct)));
		} catch {
			/* ignore */
		}
	}

	function onGripPointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		e.preventDefault();
		splitDragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onGripPointerMove(e: PointerEvent) {
		if (!splitDragging || !workspaceEl) return;
		const r = workspaceEl.getBoundingClientRect();
		if (r.width <= 0) return;
		leftWidthPct = clampSplit(((e.clientX - r.left) / r.width) * 100);
	}

	function onGripPointerUp(e: PointerEvent) {
		if (!splitDragging) return;
		splitDragging = false;
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		} catch {
			/* ignore */
		}
		persistSplit();
	}

	function onGripLostPointerCapture() {
		if (!splitDragging) return;
		splitDragging = false;
		persistSplit();
	}

	function onGripKeydown(e: KeyboardEvent) {
		let next = leftWidthPct;
		if (e.key === 'ArrowLeft') next = leftWidthPct - 2;
		else if (e.key === 'ArrowRight') next = leftWidthPct + 2;
		else if (e.key === 'Home') next = SPLIT_MIN;
		else if (e.key === 'End') next = SPLIT_MAX;
		else return;
		e.preventDefault();
		leftWidthPct = clampSplit(next);
		persistSplit();
	}

	function seed(source: UnifiedPageData) {
		items = [...source.items];
		hasMore = source.hasMore;
		nextCursor = source.nextCursor;
		selectedId = source.selectedId;
		selectedType = source.items.find((i) => i.id === source.selectedId)?.type ?? null;
		detail = source.detail;
		listError = source.listError;
		detailError = source.detailError;
	}

	async function selectItem(id: string) {
		const item = items.find((i) => i.id === id);
		if (!item) return;
		if (id === selectedId && detail) return;

		selectedId = id;
		selectedType = item.type;
		detail = null;
		detailError = null;
		loadingDetail = true;

		const reqId = ++activeRequest;
		try {
			let result: AnyDetail;
			if (item.type === 'event') result = await getEvent(fetch, id);
			else if (item.type === 'topic_event') result = await getTopic(fetch, id);
			else result = await getGlobalEvent(fetch, id);

			if (reqId !== activeRequest) return;
			detail = result;
		} catch (err) {
			if (reqId !== activeRequest) return;
			detailError = describeAPIError(err, {
				notFound: 'Item not found.',
				fallback: 'Unable to load detail.'
			});
		} finally {
			if (reqId === activeRequest) loadingDetail = false;
		}
	}

	async function loadMoreItems() {
		if (!hasMore || !nextCursor || loadingMore) return;
		loadingMore = true;
		listError = null;

		try {
			const page = await fetchFeedPage(fetch, scope, nextCursor);
			const seen = new Set(items.map((i) => i.id));
			items = [...items, ...page.items.filter((i) => !seen.has(i.id))];
			hasMore = page.hasMore;
			nextCursor = page.nextCursor;
		} catch (err) {
			listError = describeAPIError(err, { fallback: 'Unable to load more.' });
		} finally {
			loadingMore = false;
		}
	}
</script>

<div
	bind:this={workspaceEl}
	class={cn(
		'timeline-workspace grid min-h-screen grid-cols-1 bg-[color-mix(in_oklab,var(--color-surface)_75%,transparent)]',
		splitDragging && 'cursor-col-resize select-none'
	)}
	style="--timeline-split-pct: {leftWidthPct}%;"
>
	<!-- ── Left: timeline panel ── -->
	<section
		class="sticky top-0 grid max-h-[42dvh] min-h-0 gap-sp-4 overflow-y-auto border-outline-variant/70 bg-[color-mix(in_oklab,var(--color-surface-low)_94%,transparent)] p-sp-6 shadow-[inset_-1px_0_0_rgb(255_255_255/0.02)] [scrollbar-color:var(--color-outline-variant)_transparent] [scrollbar-width:thin] lg:max-h-screen lg:min-w-0 lg:self-start"
		data-timeline-scroll
		aria-label="Intelligence timeline"
	>
		<header class="flex items-end justify-between gap-sp-4 border-b border-outline-variant pb-sp-4">
			<div class="grid max-w-[42ch] gap-sp-2">
				<p
					class={cn(
						'm-0 font-sans text-label font-bold tracking-[0.08em] uppercase transition-colors duration-veritas',
						eyebrowAccent
					)}
				>
					{feedEyebrow}
				</p>
				<h2
					class="m-0 font-display text-[2.125rem] leading-[1.12] font-semibold tracking-[0.02em] text-ink md:text-[2.375rem]"
				>
					Timeline
				</h2>
				<p class="m-0 font-display text-[1.05rem] leading-[1.45] font-normal text-ink-soft italic">
					{scopeDescription}
				</p>
			</div>
			<div class="flex items-center gap-sp-2">
				<span
					class="inline-grid min-h-[2.4rem] min-w-[2.4rem] place-items-center border border-[color-mix(in_oklab,var(--color-outline-variant)_85%,var(--color-event))] bg-[color-mix(in_oklab,var(--color-surface-high)_80%,transparent)] px-sp-2 font-sans text-label font-bold text-ink tabular-nums shadow-[inset_0_0_0_1px_rgb(255_255_255/0.03)]"
					aria-label="{cards.length} items loaded">{cards.length}</span
				>
			</div>
		</header>

		<TimelineContainer
			{cards}
			{selectedId}
			{listError}
			{loadingMore}
			{hasMore}
			onselect={selectItem}
			onloadmore={loadMoreItems}
		/>
	</section>

	<div
		class="hidden w-1.5 shrink-0 cursor-col-resize touch-none bg-outline-variant/45 outline-none hover:bg-event/35 focus-visible:bg-event/40 focus-visible:ring-1 focus-visible:ring-event lg:block"
		role="separator"
		aria-orientation="vertical"
		aria-label="Resize timeline and detail panels"
		aria-valuemin={SPLIT_MIN}
		aria-valuemax={SPLIT_MAX}
		aria-valuenow={Math.round(leftWidthPct)}
		tabindex="0"
		onpointerdown={onGripPointerDown}
		onpointermove={onGripPointerMove}
		onpointerup={onGripPointerUp}
		onpointercancel={onGripPointerUp}
		onlostpointercapture={onGripLostPointerCapture}
		onkeydown={onGripKeydown}
	></div>

	<!-- ── Right: detail panel ── -->
	<section
		class={cn(
			'relative min-w-0 border-t border-outline-variant bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-sp-6 pt-[calc(var(--spacing-sp-6)+4px)] pb-sp-6 transition-[border-color,box-shadow] duration-veritas-slow ease-veritas-out lg:border-t-0 lg:px-sp-8',
			'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[image:var(--background-image-header-shine)] before:opacity-65',
			detailPanelClass
		)}
		aria-label="Item detail"
		aria-live="polite"
	>
		{#if loadingDetail}
			<div class="grid grid-cols-[auto_1fr] items-center gap-sp-4 pt-sp-8" aria-busy="true">
				<div class="grid size-10 place-items-center border border-outline-variant">
					<Spinner />
				</div>
				<div>
					<p
						class={cn(
							'm-0 font-sans text-label font-bold tracking-[0.08em] uppercase transition-colors duration-veritas',
							eyebrowAccent
						)}
					>
						Fetching
					</p>
					<h2
						class="m-0 font-display text-headline leading-[1.15] font-semibold tracking-[0.02em] text-ink"
					>
						Loading intelligence
					</h2>
					<p class="mt-sp-2 max-w-[48ch] font-sans text-body leading-[1.65] text-ink-soft">
						Retrieving source data and analytics…
					</p>
				</div>
			</div>
		{:else if detailError}
			<div class="relative" in:fly={{ x: 16, duration: 200, easing: cubicOut }}>
				<ErrorMessage title="Detail error" message={detailError} />
			</div>
		{:else}
			{#key selectedId}
				<div class="relative" in:fly={{ x: 20, duration: 220, easing: cubicOut }}>
					{#if detail}
						<DetailActionBar id={detail.id} type={detail.type} title={detail.title} />
					{/if}
					{#if detail?.type === 'event'}
						<EventDetail item={detail as EventDetailType} />
					{:else if detail?.type === 'topic_event'}
						<TopicDetail item={detail as TopicEventDetail} />
					{:else if detail?.type === 'global_event'}
						<GlobalDetail item={detail as GlobalEventDetail} />
					{:else if items.length === 0 && !listError}
						<div class="grid content-start gap-sp-3 pt-sp-8">
							<p
								class="m-0 font-sans text-label font-bold tracking-[0.08em] text-ink-muted uppercase"
							>
								Timeline
							</p>
							<h2
								class="m-0 font-display text-headline leading-[1.15] font-semibold tracking-[0.02em] text-ink"
							>
								Awaiting signal
							</h2>
							<p class="mt-sp-2 max-w-[48ch] font-sans text-body leading-[1.65] text-ink-soft">
								No intelligence items yet. Feed activates as events clear quality threshold.
							</p>
						</div>
					{:else}
						<div class="grid content-start gap-sp-3 pt-sp-8">
							<p
								class="m-0 font-sans text-label font-bold tracking-[0.08em] text-ink-muted uppercase"
							>
								Detail
							</p>
							<h2
								class="m-0 font-display text-headline leading-[1.15] font-semibold tracking-[0.02em] text-ink"
							>
								Select an item
							</h2>
							<p class="mt-sp-2 max-w-[48ch] font-sans text-body leading-[1.65] text-ink-soft">
								Choose a card from the timeline to inspect sources, metrics, and related
								intelligence.
							</p>
						</div>
					{/if}
				</div>
			{/key}
		{/if}
	</section>
</div>

<style>
	@media (min-width: 1024px) {
		:global(.timeline-workspace) {
			grid-template-columns: minmax(14rem, var(--timeline-split-pct, 40%)) 6px minmax(0, 1fr);
		}
	}
</style>
