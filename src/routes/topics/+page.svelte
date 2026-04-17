<script lang="ts">
  import TimelineWorkspace from '$lib/components/timeline/TimelineWorkspace.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Topics — Veritas</title>
  <meta name="description" content="Level 2 regional topic intelligence timeline." />
</svelte:head>

<TimelineWorkspace {data} scope="topics" />
