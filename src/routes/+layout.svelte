<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Veritas</title>
</svelte:head>

<div class="shell">
	<main class="page-frame">
		{@render children()}
	</main>
</div>
