<script lang="ts">
	type ScreenshotItem = {
		src: string;
		alt: string;
	};

	let { items = [] }: { items?: ScreenshotItem[] } = $props();
</script>

{#if items.length > 0}
	<div
		class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
		role="list"
	>
		{#each items as shot, i (shot.src + i)}
			<figure
				class="w-[min(92vw,280px)] shrink-0 snap-center motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none"
				role="listitem"
			>
				<img
					src={shot.src}
					alt={shot.alt}
					class="h-auto w-full rounded-panel border border-line/90 bg-paper-lifted shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark dark:shadow-panel-dark"
					loading="lazy"
					decoding="async"
				/>
			</figure>
		{/each}
	</div>
{/if}
