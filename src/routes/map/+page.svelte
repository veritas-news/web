<script lang="ts">
	import MapWorkspace from '$lib/components/map/MapWorkspace.svelte';
</script>

<svelte:head>
	<title>Map — Veritas</title>
	<meta
		name="description"
		content="Bbox-driven map of Veritas events, topics, and heatmap density (/v1/map/events, /v1/map/heatmap)."
	/>
</svelte:head>

<!-- ~5.5rem ≈ SiteHeader; fills viewport below nav -->
<div class="h-[calc(100dvh-5.5rem)] min-h-0 w-full max-w-none bg-[#0e0e10]">
	<MapWorkspace />
</div>
