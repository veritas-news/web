<script lang="ts">
	import { cn } from '$lib/cn';

	interface Props {
		size?: 'sm' | 'md';
	}

	let { size = 'md' }: Props = $props();
</script>

<span
	class={cn(
		'inline-block animate-spin rounded-full border-[1.5px] border-ink-muted/20 border-t-event',
		size === 'sm' && 'size-3.5',
		size === 'md' && 'size-[1.1rem]'
	)}
	aria-hidden="true"
></span>
