import { readEnvelope } from '$lib/api/client';
import type { Article } from '$lib/types/article';
import type { SearchEventHit, SearchMeta, SearchResult } from '$lib/types/search';

export async function search(
	fetcher: typeof fetch,
	q: string,
	opts: { type?: 'all' | 'event' | 'article'; limit?: number } = {}
): Promise<SearchResult> {
	const type = opts.type ?? 'all';
	const limit = opts.limit ?? 20;
	const env = await readEnvelope<{ events: SearchEventHit[]; articles: Article[] }, SearchMeta>(
		fetcher,
		'/search',
		{ q, type, limit }
	);
	return {
		events: env.data.events ?? [],
		articles: env.data.articles ?? [],
		meta: env.meta
	};
}
