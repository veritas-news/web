<script lang="ts">
  import TimelineWorkspace from '$lib/components/timeline/TimelineWorkspace.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Veritas — Global Intelligence Timeline</title>
  <meta
    name="description"
    content="Real-time geopolitical intelligence timeline. Events, regional topics, and global developments unified."
  />
</svelte:head>

<TimelineWorkspace {data} scope="unified" />
