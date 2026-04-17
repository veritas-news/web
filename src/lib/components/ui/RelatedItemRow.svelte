<script lang="ts">
	import { cn } from '$lib/cn';

	interface Props {
		title: string;
		subtitle?: string;
		meta?: string;
		label?: string;
		variant?: 'event' | 'topic' | 'neutral';
		onclick?: () => void;
	}

	let { title, subtitle, meta, label, variant = 'neutral', onclick }: Props = $props();

	const rowClass = $derived(
		cn(
			'grid gap-sp-1 border-l-2 border-l-transparent bg-surface-high px-sp-4 py-sp-3 transition-colors duration-veritas ease-veritas',
			variant === 'event' && 'border-l-event',
			variant === 'topic' && 'border-l-topic'
		)
	);
</script>

{#if onclick}
	<button type="button" class={cn(rowClass, 'w-full cursor-pointer text-left hover:bg-surface-highest')} {onclick}>
		{#if label}
			<span class="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">{label}</span>
		{/if}
		<span class="font-sans text-body font-medium leading-snug text-ink">{title}</span>
		{#if subtitle}
			<span class="line-clamp-2 font-sans text-body leading-snug text-ink-soft">{subtitle}</span>
		{/if}
		{#if meta}
			<span class="font-sans text-label text-ink-muted">{meta}</span>
		{/if}
	</button>
{:else}
	<div class={rowClass}>
		{#if label}
			<span class="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">{label}</span>
		{/if}
		<span class="font-sans text-body font-medium leading-snug text-ink">{title}</span>
		{#if subtitle}
			<span class="line-clamp-2 font-sans text-body leading-snug text-ink-soft">{subtitle}</span>
		{/if}
		{#if meta}
			<span class="font-sans text-label text-ink-muted">{meta}</span>
		{/if}
	</div>
{/if}
