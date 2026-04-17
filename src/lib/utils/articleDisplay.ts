import type { Article } from '$lib/types/article';

/** Matches ArticleRow: no URL or googleusercontent hosts are treated as no image. */
export function articleHasDisplayableImage(article: Article): boolean {
	const url = article.imageUrl?.trim();
	if (!url) return false;
	if (url.includes('googleusercontent.com')) return false;
	return true;
}

/** Items with a usable image first; no-image / ignored URL last. Stable within each group. */
export function supportingArticlesSortedByImage(articles: Article[]): Article[] {
	return [...articles].sort((a, b) => {
		const sa = articleHasDisplayableImage(a) ? 0 : 1;
		const sb = articleHasDisplayableImage(b) ? 0 : 1;
		return sa - sb;
	});
}
