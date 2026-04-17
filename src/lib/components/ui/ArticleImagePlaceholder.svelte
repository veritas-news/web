<script lang="ts">
	import { cn } from '$lib/cn';

	interface Props {
		source: string;
		/** `banner`: full-width hero (matches wide ArticleRow image). `thumb`: small square. */
		variant?: 'banner' | 'thumb';
		class?: string;
	}

	let { source, variant = 'banner', class: className }: Props = $props();
</script>

{#if variant === 'banner'}
	<div
		class={cn(
			'flex w-full flex-col items-center justify-center gap-sp-4 bg-[linear-gradient(145deg,rgb(195_199_204/0.1)_0%,rgb(195_199_204/0.03)_45%,rgb(236_145_255/0.07)_100%)] px-sp-6 py-sp-8',
			'aspect-[3/2] max-h-[calc(200cqi/3)] min-h-[11rem]',
			className
		)}
		aria-hidden="true"
	>
		<svg
			class="h-[clamp(4.5rem,28cqi,9rem)] w-[85%] max-w-[20rem] text-ink-muted/45"
			viewBox="0 0 80 48"
			fill="none"
			aria-hidden="true"
		>
			<rect x="6" y="6" width="32" height="22" rx="1.5" stroke="currentColor" stroke-width="1.2" opacity="0.5" />
			<rect x="44" y="6" width="30" height="10" rx="1" fill="currentColor" opacity="0.18" />
			<rect x="44" y="20" width="24" height="5" rx="0.75" fill="currentColor" opacity="0.12" />
			<rect x="6" y="34" width="68" height="4" rx="0.75" fill="currentColor" opacity="0.1" />
			<rect x="6" y="41" width="52" height="4" rx="0.75" fill="currentColor" opacity="0.08" />
		</svg>
		<p
			class="m-0 max-w-[90%] text-center font-sans text-label font-bold uppercase tracking-[0.1em] text-ink-muted"
			title={source}
		>
			{source}
		</p>
	</div>
{:else}
	<div
		class={cn(
			'relative flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col justify-between overflow-hidden rounded-sm border border-outline-variant/70 bg-[linear-gradient(145deg,rgb(195_199_204/0.08)_0%,rgb(195_199_204/0.02)_50%,rgb(236_145_255/0.06)_100%)] p-sp-2',
			className
		)}
		aria-hidden="true"
	>
		<svg class="mx-auto h-7 w-full text-ink-muted/40" viewBox="0 0 48 32" fill="none" aria-hidden="true">
			<rect x="4" y="4" width="18" height="14" rx="1" stroke="currentColor" stroke-width="1" opacity="0.45" />
			<rect x="26" y="4" width="18" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
			<rect x="26" y="13" width="14" height="3" rx="0.5" fill="currentColor" opacity="0.14" />
			<rect x="4" y="22" width="40" height="2.5" rx="0.5" fill="currentColor" opacity="0.12" />
			<rect x="4" y="26" width="32" height="2.5" rx="0.5" fill="currentColor" opacity="0.1" />
		</svg>
		<p
			class="m-0 line-clamp-2 text-center font-sans text-[0.58rem] font-bold uppercase leading-[1.15] tracking-[0.06em] text-ink-muted"
			title={source}
		>
			{source}
		</p>
	</div>
{/if}
