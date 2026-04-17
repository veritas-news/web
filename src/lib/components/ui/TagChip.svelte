<script lang="ts">
	import { cn } from '$lib/cn';

	interface Props {
		label: string;
		variant?: 'event' | 'topic' | 'global' | 'neutral';
	}

	let { label, variant = 'neutral' }: Props = $props();
</script>

<span
	class={cn(
		'inline-flex items-center rounded-none py-px px-sp-3 font-sans text-label font-bold uppercase tracking-[0.08em] whitespace-nowrap',
		variant === 'neutral' && 'bg-[rgb(66_72_81/0.4)] text-ink-soft',
		variant === 'event' && 'bg-event-container text-event',
		variant === 'topic' && 'bg-topic-container text-topic',
		variant === 'global' && 'bg-global-container text-global'
	)}>{label}</span>
