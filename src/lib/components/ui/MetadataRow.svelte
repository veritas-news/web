<script lang="ts">
	import { cn } from '$lib/cn';

	interface Props {
		label: string;
		value: string | number;
		mono?: boolean;
	}

	let { label, value, mono = false }: Props = $props();
</script>

<div class="grid gap-sp-1 bg-surface-high px-sp-4 py-sp-3">
	<span class="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">{label}</span>
	<span
		class={cn(
			'font-sans text-body font-medium leading-snug text-ink',
			mono && 'tabular-nums tracking-wide'
		)}>{value}</span>
</div>
