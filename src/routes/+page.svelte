<script lang="ts">
	const pillars = [
		{
			title: 'Timeline',
			description:
				'A calm feed for developing stories, ordered so you can see what changed and what deserves attention.'
		},
		{
			title: 'Daily briefing',
			description:
				'A short morning and evening reset that summarizes the strongest signals from the last window.'
		},
		{
			title: 'Articles',
			description: 'Longer reading when a story needs more context than a headline can carry.'
		},
		{
			title: 'Saved reading',
			description: 'Keep articles for later and return to them across your signed-in devices.'
		}
	];

	const signals = [
		'Clear timeline of current developments',
		'Briefing for quick orientation',
		'Search and saved reading for continuity',
		'Notification controls for meaningful updates'
	];

	const tierBars = [
		'h-2 bg-[#8C8C8C]',
		'h-3 bg-[#4A90D9]',
		'h-5 bg-[#1B998B]',
		'h-7 bg-[#E8C84A]',
		'h-9 bg-[#F46036]',
		'h-11 bg-[#D7263D]'
	];
</script>

<svelte:head>
	<title>Veritas News — mobile news intelligence</title>
	<meta
		name="description"
		content="Veritas News is a mobile app for calmer news awareness: one timeline, daily briefings, saved reading, and notification controls."
	/>
</svelte:head>

<section class="mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
	<div class="space-y-8">
		<div class="inline-flex rounded-full border border-outline-variant bg-surface px-3 py-1 text-label font-semibold uppercase tracking-[0.24em] text-ink-muted">
			Mobile app
		</div>

		<div class="space-y-6">
			<h1 class="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl">
				News awareness without the noise.
			</h1>
			<p class="max-w-2xl text-xl leading-8 text-ink-soft">
				Veritas News is built for people who want a calmer way to understand what is developing, what changed, and what is worth reading next.
			</p>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row">
			<a class="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface transition hover:bg-event focus:outline-none focus:ring-2 focus:ring-event focus:ring-offset-2" href="/about-this-app">
				About this app
			</a>
			<a class="inline-flex items-center justify-center rounded-full border border-outline-variant bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink focus:outline-none focus:ring-2 focus:ring-event focus:ring-offset-2" href="/support">
				Support
			</a>
		</div>
	</div>

	<div class="mx-auto w-full max-w-sm rounded-[2.5rem] border border-ink/10 bg-ink p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
		<div class="rounded-[2rem] bg-surface p-5">
			<div class="mb-5 flex items-center justify-between">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Veritas</p>
					<p class="text-2xl font-semibold tracking-[-0.04em] text-ink">For me</p>
				</div>
				<div class="size-10 rounded-full bg-event/15"></div>
			</div>

			<div class="space-y-3">
				<div class="rounded-[1.5rem] border border-outline-variant bg-surface-high p-4">
					<p class="text-label font-semibold uppercase tracking-[0.18em] text-event">Daily briefing</p>
					<p class="mt-2 text-lg font-semibold tracking-[-0.03em] text-ink">A focused reset for the last 12 hours.</p>
					<p class="mt-2 text-sm leading-6 text-ink-soft">Read the strongest developments before opening the full timeline.</p>
				</div>

				<div class="rounded-[1.5rem] border border-outline-variant bg-surface p-4">
					<div class="flex items-end gap-1.5" aria-hidden="true">
						{#each tierBars as barClass, index (`tier-${index}`)}
							<div class={`w-full rounded-full ${barClass}`}></div>
						{/each}
					</div>
					<p class="mt-4 text-base font-semibold text-ink">Signal strength at a glance</p>
					<p class="mt-1 text-sm text-ink-soft">Visual cues help separate routine updates from important movement.</p>
				</div>

				<div class="rounded-[1.5rem] bg-ink p-4 text-surface">
					<p class="text-label font-semibold uppercase tracking-[0.18em] text-[#C5D86D]">Saved</p>
					<p class="mt-2 text-base font-semibold">Keep deeper reads for later.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each pillars as pillar (pillar.title)}
			<article class="rounded-[2rem] border border-outline-variant bg-surface p-6 shadow-[0_14px_44px_rgba(0,0,0,0.04)]">
				<h2 class="text-xl font-semibold tracking-[-0.03em] text-ink">{pillar.title}</h2>
				<p class="mt-4 text-sm leading-6 text-ink-soft">{pillar.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.8fr_1fr] lg:px-10">
	<div>
		<p class="text-label font-semibold uppercase tracking-[0.24em] text-event">Why it exists</p>
		<h2 class="mt-4 text-4xl font-semibold tracking-[-0.05em] text-ink">Less hunting. More understanding.</h2>
	</div>
	<div class="rounded-[2rem] border border-outline-variant bg-surface-high p-6 sm:p-8">
		<p class="text-lg leading-8 text-ink-soft">
			News often arrives as fragments. Veritas News gives those fragments a calmer structure: follow the timeline, open detail when needed, save articles, and tune what should notify you.
		</p>
		<div class="mt-8 grid gap-3 sm:grid-cols-2">
			{#each signals as signal (signal)}
				<div class="rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-sm font-medium text-ink">
					{signal}
				</div>
			{/each}
		</div>
	</div>
</section>
