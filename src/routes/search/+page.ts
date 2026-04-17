import { describeAPIError } from '$lib/api/client';
import { search } from '$lib/api/search';
import type { Article } from '$lib/types/article';
import type { SearchEventHit, SearchMeta } from '$lib/types/search';
import type { PageLoad } from './$types';

export interface SearchPageData {
	q: string;
	skipped: boolean;
	events: SearchEventHit[];
	articles: Article[];
	meta: SearchMeta | null;
	searchError: string | null;
}

export const load: PageLoad = async ({ fetch, url }): Promise<SearchPageData> => {
	const q = (url.searchParams.get('q') ?? '').trim();
	if (q.length < 2) {
		return {
			q,
			skipped: true,
			events: [],
			articles: [],
			meta: null,
			searchError: null
		};
	}

	try {
		const r = await search(fetch, q);
		return {
			q,
			skipped: false,
			events: r.events,
			articles: r.articles,
			meta: r.meta ?? null,
			searchError: null
		};
	} catch (err) {
		return {
			q,
			skipped: false,
			events: [],
			articles: [],
			meta: null,
			searchError: describeAPIError(err, { fallback: 'Search failed.' })
		};
	}
};
