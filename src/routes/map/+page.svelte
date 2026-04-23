<script lang="ts">
	import MapWorkspace from '$lib/components/map/MapWorkspace.svelte';
</script>

<svelte:head>
	<title>Map — Veritas</title>
	<meta
		name="description"
		content="Explore Veritas events and narrative clusters on an interactive map with optional density heatmap."
	/>
</svelte:head>

<!-- ~5.5rem ≈ SiteHeader; fills viewport below nav -->
<div class="h-[calc(100dvh-5.5rem)] min-h-0 w-full max-w-none bg-[#0e0e10]">
	<MapWorkspace />
</div>
