<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { formatDateTime } from '$lib/utils/format';
	import { cn } from '$lib/cn';
	interface Props {
		article: Article;
	}

	let { article }: Props = $props();

	let imgErrored = $state(false);
	const imgFailed = $derived(
		imgErrored || (!!article.imageUrl && article.imageUrl.includes('googleusercontent.com'))
	);
	let imgRatio = $state<string | null>(null);

	function onImgLoad(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		imgRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
	}
</script>

<a
	class={cn(
		'group/article grid grid-cols-1 grid-rows-[auto_auto] items-start gap-sp-3 overflow-hidden rounded-md border border-outline-variant/50 bg-surface-high p-0 text-inherit no-underline transition-colors duration-veritas',
		'hover:bg-surface-highest',
		'focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-event'
	)}
	href={article.link}
	target="_blank"
	rel="external noreferrer"
	aria-label="{article.title} — {article.source}"
>
	{#if article.imageUrl && !imgFailed}
		<div class="@container order-1 h-auto w-full overflow-hidden">
			<div class="w-full overflow-hidden">
				<img
					class="h-auto w-full max-h-[calc(200cqi/3)] object-cover"
					src={article.imageUrl}
					alt=""
					loading="lazy"
					style={imgRatio ? `aspect-ratio: ${imgRatio}` : undefined}
					onload={onImgLoad}
					onerror={() => (imgErrored = true)}
				/>
			</div>
		</div>
	{/if}

	<div class="order-2 grid min-w-0 gap-sp-1 px-sp-4 py-sp-3">
		<span class="font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted">{article.source}</span>
		<strong
			class="line-clamp-2 font-sans text-body font-medium leading-[1.45] text-ink transition-colors duration-veritas group-hover/article:text-event"
			>{article.title}</strong
		>
		{#if article.description && article.description !== article.title && !article.description.includes(article.title)}
			<p class="line-clamp-2 font-sans text-body leading-[1.55] text-ink-soft">{article.description}</p>
		{/if}
		<span class="font-sans text-label text-ink-muted">{formatDateTime(article.publishedAt)}</span>
	</div>
</a>
