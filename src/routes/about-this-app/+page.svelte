<script lang="ts">
	const sections = [
		{
			title: 'Timeline',
			body: 'The main view gives developing stories a clear order so you can see what is new, what changed, and where to go deeper.'
		},
		{
			title: 'Daily briefing',
			body: 'A compact briefing helps you start or end the day oriented without scrolling through every update.'
		},
		{
			title: 'Articles',
			body: 'Longer reading sits beside the timeline for moments when a story needs more detail and context.'
		},
		{
			title: 'Search and saved',
			body: 'Find specific stories, save articles, and build a personal shelf for later reading.'
		},
		{
			title: 'Personalization',
			body: 'Topic preferences help shape the For me view while keeping the experience transparent and controllable.'
		},
		{
			title: 'Notifications',
			body: 'Notification controls are designed for meaningful changes, not constant interruption.'
		}
	];
</script>

<svelte:head>
	<title>About this app — Veritas News</title>
	<meta
		name="description"
		content="A plain-language guide to the Veritas News mobile app: timeline, briefing, articles, saved reading, personalization, and notifications."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:px-10">
	<div class="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
		<div class="lg:sticky lg:top-28">
			<p class="text-label font-semibold uppercase tracking-[0.24em] text-event">About this app</p>
			<h1 class="mt-5 text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">A calmer way to follow the news.</h1>
			<p class="mt-6 text-lg leading-8 text-ink-soft">
				Veritas News is organized around a few simple surfaces: scan the timeline, read the briefing, go deeper with articles, and keep what you want to revisit.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each sections as section (section.title)}
				<article class="rounded-[2rem] border border-outline-variant bg-surface p-6 shadow-[0_14px_44px_rgba(0,0,0,0.04)]">
					<h2 class="text-2xl font-semibold tracking-[-0.04em] text-ink">{section.title}</h2>
					<p class="mt-4 text-sm leading-6 text-ink-soft">{section.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
