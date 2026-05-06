<script lang="ts">
	const principles = [
		['Clarity', 'A single place to understand what is developing now.'],
		['Depth', 'A path from quick scanning into richer article reading.'],
		['Continuity', 'Saved reading, preferences, and account-backed sync for repeat use.']
	];
</script>

<svelte:head>
	<title>About — Veritas News</title>
	<meta
		name="description"
		content="Learn why Veritas News is built as a calmer mobile app for news awareness, daily briefings, and deeper reading."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:px-10">
	<div class="rounded-[2.5rem] border border-outline-variant bg-surface p-8 shadow-[0_18px_56px_rgba(0,0,0,0.05)] sm:p-10">
		<p class="text-label font-semibold uppercase tracking-[0.24em] text-event">About us</p>
		<h1 class="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">
			Veritas News is for people who want judgment, not more noise.
		</h1>
		<p class="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">
			The app is designed around a simple idea: one calm place to follow developing stories, read deeper context, and return to what matters without rebuilding the picture from scattered headlines.
		</p>
	</div>

	<div class="mt-8 grid gap-4 md:grid-cols-3">
		{#each principles as principle (principle[0])}
			<article class="rounded-[2rem] border border-outline-variant bg-surface-high p-6">
				<h2 class="text-2xl font-semibold tracking-[-0.04em] text-ink">{principle[0]}</h2>
				<p class="mt-4 text-sm leading-6 text-ink-soft">{principle[1]}</p>
			</article>
		{/each}
	</div>

	<div class="mt-8 rounded-[2rem] border border-outline-variant bg-ink p-8 text-surface sm:p-10">
		<h2 class="text-3xl font-semibold tracking-[-0.05em]">Built as a mobile habit</h2>
		<p class="mt-4 max-w-3xl text-base leading-7 text-surface/75">
			Veritas News focuses on the moments when people actually check news: a fast scan, a short briefing, a saved article, or a notification that should only appear when something meaningful changes.
		</p>
	</div>
</section>
