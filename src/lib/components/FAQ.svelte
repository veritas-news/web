<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	const items = [
		{ q: () => m.faq_sources_q(), a: () => m.faq_sources_a() },
		{ q: () => m.faq_personalize_q(), a: () => m.faq_personalize_a() },
		{ q: () => m.faq_stability_q(), a: () => m.faq_stability_a() },
		{ q: () => m.faq_ai_q(), a: () => m.faq_ai_a() },
		{ q: () => m.faq_account_q(), a: () => m.faq_account_a() },
		{ q: () => m.faq_privacy_q(), a: () => m.faq_privacy_a() }
	] as const;
</script>

<div class="space-y-3">
	{#each items as item, i (i)}
		<details
			class="group rounded-panel border border-line/90 bg-paper-lifted shadow-panel open:border-veritas-verdigris/40 dark:border-line-dark/90 dark:bg-paper-lifted-dark dark:shadow-panel-dark dark:open:border-veritas-yellowGreen/40"
		>
			<summary
				class="cursor-pointer list-none px-5 py-4 font-rounded text-sm font-semibold text-ink marker:content-none dark:text-ink-dark [&::-webkit-details-marker]:hidden"
			>
				<span class="flex items-center justify-between gap-3">
					<span>{item.q()}</span>
					<svg
						class="h-5 w-5 shrink-0 text-veritas-verdigris group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none dark:text-veritas-yellowGreen"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
					>
						<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				</span>
			</summary>
			<div
				class="border-t border-line/70 px-5 pt-0 pb-4 text-sm leading-relaxed text-muted-ink dark:border-line-dark/70 dark:text-muted-ink-dark"
			>
				<p class="pt-3">{item.a()}</p>
			</div>
		</details>
	{/each}
</div>
