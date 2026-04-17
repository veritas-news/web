import { get, getPaged } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { Article } from '$lib/types/article';

export function listArticles(fetcher: typeof fetch, params: QueryParams = {}) {
	return getPaged<Article>(fetcher, '/articles', {
		sort: 'latest',
		fields: 'compact',
		limit: 24,
		...params
	});
}

/** Use query `id` so link-shaped guids (RSS fallback uses article URL) survive proxies and path routing. */
export function getArticle(fetcher: typeof fetch, id: string) {
	return get<Article>(fetcher, '/articles/by-id', { id });
}
