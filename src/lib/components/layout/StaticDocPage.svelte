<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		metaDescription,
		eyebrow = 'Legal',
		children
	}: {
		title: string;
		metaDescription: string;
		eyebrow?: string;
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>{title} — Veritas</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

<div class="mx-auto grid max-w-[52rem] gap-sp-8 px-sp-6 pb-sp-12 pt-sp-8">
	<header class="relative grid gap-sp-3 border-b border-outline-variant/80 pb-sp-6">
		<div
			class="pointer-events-none absolute top-0 left-0 h-full max-h-[6rem] w-[3px] bg-[image:var(--background-image-header-shine)] opacity-50"
			aria-hidden="true"
		></div>
		<p
			class="m-0 pl-sp-4 font-sans text-label font-bold tracking-[0.1em] text-ink-muted uppercase"
		>
			{eyebrow}
		</p>
		<h1
			class="m-0 pl-sp-4 font-display text-[clamp(2rem,4vw,var(--text-display))] font-bold tracking-[0.02em] leading-tight"
		>
			{title}
		</h1>
	</header>

	<div class="grid gap-sp-4 font-sans text-body leading-[1.75] text-ink-soft">
		{@render children()}
	</div>
</div>
