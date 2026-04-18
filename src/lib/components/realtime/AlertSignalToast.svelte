<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { subscribeRealtime } from '$lib/stores/realtime';
	import type { RealtimeMessage } from '$lib/api/realtime';

	const TOAST_DURATION_MS = 6_000;
	const MIN_INTERVAL_MS = 2_000;

	let visible = $state(false);
	let count = $state(0);
	let lastShownAt = 0;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	function showToast() {
		const now = Date.now();
		count += 1;
		if (visible && now - lastShownAt < MIN_INTERVAL_MS) return;
		visible = true;
		lastShownAt = now;
		if (hideTimer != null) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			visible = false;
			count = 0;
			hideTimer = null;
		}, TOAST_DURATION_MS);
	}

	function dismiss() {
		visible = false;
		count = 0;
		if (hideTimer != null) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
	}

	onMount(() => {
		const unsub = subscribeRealtime((msg: RealtimeMessage) => {
			if (msg.type !== 'alert.signal') return;
			if (typeof document !== 'undefined' && document.hidden) return;
			showToast();
		});
		return () => {
			unsub();
			if (hideTimer != null) clearTimeout(hideTimer);
		};
	});
</script>

{#if visible}
	<div
		class="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-sp-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
		role="status"
		aria-live="polite"
		transition:fly={{ y: 24, duration: 200 }}
	>
		<div
			class="pointer-events-auto flex items-center gap-sp-3 border border-event/40 bg-surface-high/95 px-sp-4 py-sp-3 shadow-[0_0_24px_rgb(236_145_255/0.08)] backdrop-blur"
		>
			<span class="font-sans text-label font-bold uppercase tracking-[0.08em] text-event"
				>Signals updated{count > 1 ? ` ×${count}` : ''}</span
			>
			<a class="font-sans text-body font-semibold text-ink no-underline hover:text-event" href="/alerts"
				>View alerts</a
			>
			<button
				type="button"
				class="border border-outline-variant bg-transparent px-sp-2 py-sp-1 font-sans text-label text-ink-soft hover:text-ink"
				onclick={dismiss}
				aria-label="Dismiss signal notification">✕</button
			>
		</div>
	</div>
{/if}
