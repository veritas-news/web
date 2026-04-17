<script lang="ts">
  import TimelineWorkspace from '$lib/components/timeline/TimelineWorkspace.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Global — Veritas</title>
  <meta name="description" content="Level 3 global intelligence arcs." />
</svelte:head>

<TimelineWorkspace {data} scope="global" />
