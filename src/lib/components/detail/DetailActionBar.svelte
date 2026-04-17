<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { intelligenceDetailPath } from '$lib/utils/intelligenceLinks';
	import { savedItems, toggleSaved } from '$lib/stores/savedItems';
	import type { EventType } from '$lib/types/event';

	interface Props {
		id: string;
		type: EventType;
		title: string;
	}

	let { id, type, title }: Props = $props();

	let copyHint = $state<string | null>(null);
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	const detailPath = $derived(intelligenceDetailPath(type, id));
	const saved = $derived($savedItems.some((s) => s.id === id && s.type === type));

	function onToggleSave() {
		toggleSaved({ id, type, title });
	}

	async function onCopyLink() {
		if (!browser) return;
		const url = `${window.location.origin}${detailPath}`;
		try {
			await navigator.clipboard.writeText(url);
			if (copyTimer) clearTimeout(copyTimer);
			copyHint = 'Copied';
			copyTimer = setTimeout(() => {
				copyHint = null;
				copyTimer = null;
			}, 2000);
		} catch {
			copyHint = 'Copy blocked';
			copyTimer = setTimeout(() => {
				copyHint = null;
				copyTimer = null;
			}, 2500);
		}
	}

	onDestroy(() => {
		if (copyTimer !== null) clearTimeout(copyTimer);
	});
</script>

<div class="relative mb-sp-4 pb-sp-4" aria-label="Item actions">
	<div
		class="pointer-events-none absolute -top-1 right-0 left-0 h-px bg-[linear-gradient(90deg,transparent,rgb(195_199_204/0.45)_20%,rgb(254_179_0/0.4)_50%,transparent)] opacity-70"
		aria-hidden="true"
	></div>
	<div
		class="flex flex-wrap items-stretch gap-sp-2 border border-outline-variant/75 bg-surface-low/85 p-sp-3 shadow-[0_16px_48px_rgb(0_0_0/0.25),inset_0_0_0_1px_rgb(255_255_255/0.03)]"
	>
		<a
			href={detailPath}
			class="grid min-h-[2.75rem] cursor-pointer content-center justify-items-start gap-0.5 border border-event/35 bg-[linear-gradient(165deg,rgb(27_32_39/0.9)_0%,var(--color-surface-low)_100%)] px-sp-4 py-sp-2 text-left font-sans text-ink no-underline transition-[border-color,color,background,transform,box-shadow] duration-veritas-slow ease-veritas-out hover:-translate-y-px hover:border-event hover:bg-surface-high hover:shadow-glow-event hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-event"
			data-sveltekit-preload-data="hover"
		>
			<span class="font-sans text-label font-bold tracking-[0.08em] uppercase">Full page</span>
			<span class="text-[0.6rem] font-medium tracking-[0.04em] text-ink-soft uppercase opacity-90"
				>Dedicated layout</span
			>
		</a>
		<button
			type="button"
			class="grid min-h-[2.75rem] cursor-pointer content-center justify-items-start gap-0.5 border border-outline-variant bg-surface/70 px-sp-4 py-sp-2 text-left font-sans text-ink-soft transition-[border-color,color,background,transform,box-shadow] duration-veritas-slow ease-veritas-out hover:-translate-y-px hover:border-[rgb(195_199_204/0.4)] hover:bg-surface-high hover:text-ink hover:shadow-[0_8px_24px_rgb(0_0_0/0.2)]"
			onclick={onCopyLink}
		>
			<span class="font-sans text-label font-bold tracking-[0.08em] uppercase">Copy link</span>
			{#if copyHint}
				<span class="text-[0.65rem] font-bold tracking-[0.04em] text-topic uppercase" aria-live="polite"
					>{copyHint}</span
				>
			{/if}
		</button>
		<button
			type="button"
			class="grid min-h-[2.75rem] cursor-pointer content-center justify-items-start gap-0.5 border border-outline-variant bg-surface/70 px-sp-4 py-sp-2 text-left font-sans text-ink-soft transition-[border-color,color,background,transform,box-shadow] duration-veritas-slow ease-veritas-out hover:-translate-y-px hover:border-[rgb(195_199_204/0.4)] hover:bg-surface-high hover:text-ink hover:shadow-[0_8px_24px_rgb(0_0_0/0.2)] aria-pressed:border-[rgb(254_179_0/0.45)] aria-pressed:bg-[rgb(254_179_0/0.08)] aria-pressed:text-topic"
			aria-pressed={saved}
			onclick={onToggleSave}
		>
			<span class="font-sans text-label font-bold tracking-[0.08em] uppercase">{saved ? 'Saved' : 'Save'}</span>
			<span class="text-[0.6rem] font-medium tracking-[0.04em] text-ink-muted uppercase opacity-90"
				>{saved ? 'In this browser' : 'Local bookmark'}</span
			>
		</button>
	</div>
</div>
