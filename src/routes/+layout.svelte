<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import AlertSignalToast from '$lib/components/realtime/AlertSignalToast.svelte';
	import '$lib/identity/auth-state.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Veritas</title>
</svelte:head>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<SiteHeader />
	<main class="relative isolate min-h-0 min-w-0">
		<div
			class="pointer-events-none fixed inset-0 z-0 bg-noise-veritas opacity-[0.04]"
			aria-hidden="true"
		></div>
		<div class="relative z-10">
			{@render children()}
		</div>
	</main>
	<SiteFooter />
	<AlertSignalToast />
</div>
