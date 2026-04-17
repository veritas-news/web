<script lang="ts">
	import EventDetail from '$lib/components/detail/EventDetail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.item.title} — Event — Veritas</title>
</svelte:head>

<div class="mx-auto grid max-w-[52rem] gap-sp-4 p-sp-6">
	<a
		href="/events"
		class="font-sans text-label font-semibold tracking-[0.04em] text-ink-muted uppercase no-underline hover:bg-transparent hover:text-event"
		>← Events timeline</a
	>
	<EventDetail item={data.item} />
</div>
