<script lang="ts">
	interface Props {
		title?: string;
		message: string;
	}

	let { title = 'Fetch error', message }: Props = $props();
</script>

<section class="border-l-[3px] border-l-error bg-error-container px-sp-4 py-sp-4" role="alert" aria-live="polite">
	<p class="mb-sp-1 font-sans text-label font-bold uppercase tracking-[0.08em] text-error">{title}</p>
	<p class="m-0 font-sans text-body leading-[1.55] text-ink">{message}</p>
</section>
