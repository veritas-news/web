<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Veritas News — mobile news intelligence</title>
	<meta
		name="description"
		content="Veritas News is a mobile app for calmer news awareness: a clear timeline, daily briefing, saved reading, and notification controls."
	/>
	<meta property="og:title" content="Veritas News — mobile news intelligence" />
	<meta
		property="og:description"
		content="A calmer mobile news app for following what changes, why it matters, and what to read next."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto] bg-veritas-body text-ink">
	<SiteHeader />
	<main class="min-h-0 min-w-0">
		{@render children()}
	</main>
	<SiteFooter />
</div>
