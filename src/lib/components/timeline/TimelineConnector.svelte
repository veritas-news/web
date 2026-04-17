<script lang="ts">
	import type { EventType } from '$lib/types/event';
	import { cn } from '$lib/cn';

	interface Props {
		type?: EventType;
		terminal?: boolean;
	}

	let { type = 'event', terminal = false }: Props = $props();

	const dotClass = $derived(
		cn(
			'shrink-0 rounded-full',
			type === 'event' && 'size-2 bg-event',
			type === 'topic_event' && 'size-[0.65rem] bg-topic',
			type === 'global_event' && 'size-[0.8rem] bg-global'
		)
	);

	const lineClass = $derived(
		cn(
			'mt-sp-2 min-h-[1.5rem] w-0.5 flex-1 rounded-[1px]',
			type === 'event' &&
				'bg-[linear-gradient(180deg,rgb(195_199_204/0.55)_0%,#424851_45%,transparent_100%)]',
			type === 'topic_event' &&
				'bg-[linear-gradient(180deg,rgb(254_179_0/0.5)_0%,#424851_50%,transparent_100%)]',
			type === 'global_event' &&
				'bg-[linear-gradient(180deg,rgb(236_145_255/0.5)_0%,#424851_50%,transparent_100%)]'
		)
	);
</script>

<span class="grid w-[1.1rem] justify-items-center self-stretch pt-sp-4" aria-hidden="true">
	<span class={dotClass}></span>
	{#if !terminal}
		<span class={lineClass}></span>
	{/if}
</span>
