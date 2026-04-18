<script lang="ts">
	interface Props {
		label: string;
		value: number;
		tone?: 'event' | 'topic' | 'global';
		suffix?: string;
	}

	let { label, value, tone = 'event', suffix = '' }: Props = $props();

	const barBg = $derived(
		tone === 'global' ? 'bg-global' : tone === 'topic' ? 'bg-topic' : 'bg-event'
	);
</script>

<div class="grid grid-cols-[4rem_1fr_2.5rem] items-center gap-sp-2">
	<span class="font-sans text-label uppercase tracking-[0.08em] text-ink-muted">{label}</span>
	<div
		class="h-1.5 w-full bg-surface-high"
		role="meter"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label="{label} {value}"
	>
		<div class="h-full {barBg} transition-[width] duration-veritas" style="width: {value}%"></div>
	</div>
	<span class="text-right font-mono text-label text-ink-soft">{value}{suffix}</span>
</div>
