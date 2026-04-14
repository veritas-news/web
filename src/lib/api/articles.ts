import { get, getPaged } from '$lib/api/client';
import type { Article } from '$lib/types/article';
import type { QueryParams } from '$lib/types/api';

export function listArticles(fetcher: typeof fetch, params: QueryParams = {}) {
	return getPaged<Article>(fetcher, '/articles', {
		fields: 'compact',
		limit: 24,
		sort: 'latest',
		...params
	});
}

export function getArticle(fetcher: typeof fetch, id: string) {
	return get<Article>(fetcher, `/articles/${encodeURIComponent(id)}`, {
		fields: 'full'
	});
}
