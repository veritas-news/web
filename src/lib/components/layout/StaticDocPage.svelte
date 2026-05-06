<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		metaDescription,
		eyebrow = 'Veritas News',
		children
	}: {
		title: string;
		metaDescription: string;
		eyebrow?: string;
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>{title} — Veritas News</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

<section class="section-shell py-sp-12 md:py-sp-16">
	<div class="mx-auto max-w-4xl">
		<div class="mb-sp-8 space-y-sp-4">
			<p class="kicker">{eyebrow}</p>
			<h1 class="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h1>
			<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">{metaDescription}</p>
		</div>

		<div class="card-shell p-sp-6 md:p-sp-8">
			{@render children()}
		</div>
	</div>
</section>
