<script lang="ts">
	import GlobalDetail from '$lib/components/detail/GlobalDetail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.item.title} — Global — Veritas</title>
</svelte:head>

<div class="mx-auto grid max-w-[52rem] gap-sp-4 p-sp-6">
	<a
		href="/global"
		class="font-sans text-label font-semibold tracking-[0.04em] text-ink-muted uppercase no-underline hover:bg-transparent hover:text-global"
		>← Global timeline</a
	>
	<GlobalDetail item={data.item} />
</div>
