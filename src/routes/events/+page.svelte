<script lang="ts">
  import TimelineWorkspace from '$lib/components/timeline/TimelineWorkspace.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Events — Veritas</title>
  <meta name="description" content="Level 1 intelligence events timeline." />
</svelte:head>

<TimelineWorkspace {data} scope="events" />
