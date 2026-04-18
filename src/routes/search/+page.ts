import { describeAPIError } from '$lib/api/client';
import { search } from '$lib/api/search';
import { parseSearchFiltersFromURL } from '$lib/services/searchFilters';
import type { Article } from '$lib/types/article';
import type { SearchEventHit, SearchFilters, SearchMeta } from '$lib/types/search';
import type { PageLoad } from './$types';

export interface SearchPageData {
	q: string;
	filters: SearchFilters;
	skipped: boolean;
	events: SearchEventHit[];
	articles: Article[];
	meta: SearchMeta | null;
	searchError: string | null;
}

const EMPTY_RESULT = {
	events: [],
	articles: [],
	meta: null
};

export const load: PageLoad = async ({ fetch, url }): Promise<SearchPageData> => {
	const q = (url.searchParams.get('q') ?? '').trim();
	const filters = parseSearchFiltersFromURL(url.searchParams);
	if (q.length < 2) {
		return { q, filters, skipped: true, ...EMPTY_RESULT, searchError: null };
	}
	try {
		const r = await search(fetch, q, filters);
		return {
			q,
			filters,
			skipped: false,
			events: r.events,
			articles: r.articles,
			meta: r.meta ?? null,
			searchError: null
		};
	} catch (err) {
		return {
			q,
			filters,
			skipped: false,
			...EMPTY_RESULT,
			searchError: describeAPIError(err, { fallback: 'Search failed.' })
		};
	}
};
