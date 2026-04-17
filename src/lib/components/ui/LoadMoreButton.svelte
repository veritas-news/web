<script lang="ts">
	interface Props {
		loading?: boolean;
		onclick: () => void;
	}

	let { loading = false, onclick }: Props = $props();
</script>

<button
	type="button"
	class="inline-flex w-full cursor-pointer items-center justify-center gap-sp-2 rounded-none border border-outline-variant bg-transparent px-sp-4 py-sp-3 font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-soft transition-[background,border-color,color] duration-veritas ease-veritas hover:border-event hover:bg-surface-high hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-event disabled:cursor-progress disabled:opacity-50"
	disabled={loading}
	aria-busy={loading}
	{onclick}
>
	{#if loading}
		<span
			class="inline-block size-3.5 animate-spin rounded-full border-[1.5px] border-ink-muted/25 border-t-event"
			aria-hidden="true"
		></span>
		Loading
	{:else}
		Load more
	{/if}
</button>
