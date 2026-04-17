<svelte:head>
	<title>About — Veritas</title>
	<meta
		name="description"
		content="Veritas intelligence timeline: events, regional topics, and global arcs from multi-source coverage."
	/>
</svelte:head>

<div class="mx-auto grid max-w-[52rem] gap-sp-8 px-sp-6 pb-sp-12 pt-sp-8">
	<header class="relative grid gap-sp-3 border-b border-outline-variant/80 pb-sp-6">
		<div
			class="pointer-events-none absolute top-0 left-0 h-full max-h-[6rem] w-[3px] bg-[image:var(--background-image-header-shine)] opacity-50"
			aria-hidden="true"
		></div>
		<p class="m-0 pl-sp-4 font-sans text-label font-bold tracking-[0.1em] text-ink-muted uppercase">Product</p>
		<h1 class="m-0 pl-sp-4 font-display text-[clamp(2rem,4vw,var(--text-display))] font-bold tracking-[0.02em] leading-tight">
			About Veritas
		</h1>
		<p class="m-0 max-w-[48ch] pl-sp-4 font-display text-[1.2rem] font-normal italic leading-normal text-ink-soft">
			A read-only analyst console for a <strong class="font-semibold not-italic text-ink">three-level intelligence model</strong>—from
			discrete incidents to arcs that belong in briefings. Built for clarity, not clutter.
		</p>
	</header>

	<section class="grid gap-sp-3 md:grid-cols-3" aria-label="Hierarchy">
		<article
			class="grid gap-sp-3 border border-outline-variant border-l-[3px] border-l-event bg-[color-mix(in_oklab,var(--color-surface-low)_88%,transparent)] p-sp-5 shadow-[0_20px_50px_rgb(0_0_0/0.2)] transition-[border-color,box-shadow] duration-veritas-slow hover:border-[color-mix(in_oklab,var(--color-outline-variant)_50%,var(--color-event))]"
		>
			<h2 class="m-0 font-display text-[1.15rem] font-bold">Level 1 — Events</h2>
			<p class="m-0 font-sans text-body leading-relaxed text-ink-soft">
				Short-lived signals with cluster size and source thresholds. Ideal for “what broke in the last news cycle?”
			</p>
		</article>
		<article
			class="grid gap-sp-3 border border-outline-variant border-l-[3px] border-l-topic bg-[color-mix(in_oklab,var(--color-surface-low)_88%,transparent)] p-sp-5 shadow-[0_20px_50px_rgb(0_0_0/0.2)] transition-[border-color,box-shadow] duration-veritas-slow hover:border-[color-mix(in_oklab,var(--color-outline-variant)_50%,var(--color-event))]"
		>
			<h2 class="m-0 font-display text-[1.15rem] font-bold">Level 2 — Topics</h2>
			<p class="m-0 font-sans text-body leading-relaxed text-ink-soft">
				Regional or thematic threads across days or weeks. Density and relevance-gap hints show narrative pressure.
			</p>
		</article>
		<article
			class="grid gap-sp-3 border border-outline-variant border-l-[3px] border-l-global bg-[color-mix(in_oklab,var(--color-surface-low)_88%,transparent)] p-sp-5 shadow-[0_20px_50px_rgb(0_0_0/0.2)] transition-[border-color,box-shadow] duration-veritas-slow hover:border-[color-mix(in_oklab,var(--color-outline-variant)_50%,var(--color-event))]"
		>
			<h2 class="m-0 font-display text-[1.15rem] font-bold">Level 3 — Global</h2>
			<p class="m-0 font-sans text-body leading-relaxed text-ink-soft">
				Cross-border arcs spanning longer windows. Impact and conviction summarize how analysts weight the story.
			</p>
		</article>
	</section>

	<div class="grid gap-sp-4 text-base leading-[1.75] text-ink-soft">
		<p class="m-0">
			The <strong class="font-semibold text-ink">unified timeline</strong> interleaves all three levels in a single
			server-ranked stream—never merge or re-sort client-side; ordering is part of the contract.
		</p>
		<p class="m-0">
			All data flows from the Veritas REST API under <code
				class="rounded-sm border border-outline-variant bg-surface-low px-1 py-0.5 font-mono text-[0.88em] text-event"
				>/v1</code
			>: timelines, detail payloads with embedded articles, full-text search, article catalog, and crawler
			<strong class="font-semibold text-ink">sources</strong>. Pulse adds optional third-party JSON checks (weather,
			APOD, API clock).
		</p>
		<p class="m-0">
			<strong class="font-semibold text-ink">Saved</strong> items live in your browser only—use them as a lightweight reading list while you triage a noisy day.
		</p>
	</div>
</div>
