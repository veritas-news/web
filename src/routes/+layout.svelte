<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="relative isolate flex min-h-dvh flex-col bg-gradient-to-br from-canvas-top via-paper to-canvas-bottom text-ink dark:from-canvas-top-dark dark:via-paper-dark dark:to-canvas-bottom-dark dark:text-ink-dark"
>
	<div
		class="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-safe:animate-veritas-gradient"
		aria-hidden="true"
	>
		<div
			class="absolute top-0 -left-32 h-80 w-80 rounded-full bg-veritas-verdigris/12 blur-3xl motion-safe:animate-veritas-float motion-reduce:animate-none dark:bg-veritas-verdigris/18"
		></div>
		<div
			class="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-veritas-flame/10 blur-3xl motion-safe:animate-veritas-float motion-reduce:animate-none dark:bg-veritas-flame/14"
			style="animation-delay: 1.5s"
		></div>
	</div>

	<Nav />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
