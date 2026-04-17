<script lang="ts">
  import EventDetail from '$lib/components/detail/EventDetail.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.item.title} — Event — Veritas</title>
</svelte:head>

<div class="detail-page">
  <a href="/events" class="back">← Events timeline</a>
  <EventDetail item={data.item} />
</div>

<style>
  .detail-page {
    max-width: 52rem;
    margin: 0 auto;
    padding: var(--sp-6);
    display: grid;
    gap: var(--sp-4);
  }

  .back {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  .back:hover {
    color: var(--clr-event);
    background: transparent;
  }
</style>
