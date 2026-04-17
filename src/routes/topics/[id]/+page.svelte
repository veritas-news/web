<script lang="ts">
	import TopicDetail from '$lib/components/detail/TopicDetail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.item.title} — Topic — Veritas</title>
</svelte:head>

<div class="mx-auto grid max-w-[52rem] gap-sp-4 p-sp-6">
	<a
		href="/topics"
		class="font-sans text-label font-semibold tracking-[0.04em] text-ink-muted uppercase no-underline hover:bg-transparent hover:text-topic"
		>← Topics timeline</a
	>
	<TopicDetail item={data.item} />
</div>
