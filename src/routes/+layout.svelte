<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Veritas</title>
</svelte:head>

<div class="shell">
	<SiteHeader />
	<main class="page-frame">
		{@render children()}
	</main>
</div>
