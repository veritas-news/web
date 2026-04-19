import { readEnvelope } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { Article } from '$lib/types/article';
import type {
	SearchEventHit,
	SearchFilters,
	SearchMeta,
	SearchResult
} from '$lib/types/search';

function buildSearchParams(q: string, opts: SearchFilters): QueryParams {
	const params: QueryParams = {
		q,
		type: opts.type ?? 'all',
		limit: opts.limit ?? 20
	};
	if (opts.minConviction != null) params.min_conviction = opts.minConviction;
	if (opts.maxConviction != null) params.max_conviction = opts.maxConviction;
	if (opts.minImpact != null) params.min_impact = opts.minImpact;
	if (opts.maxImpact != null) params.max_impact = opts.maxImpact;
	if (opts.impactScope) params.impact_scope = opts.impactScope;
	if (opts.eventState) params.event_state = opts.eventState;
	if (opts.happenedAfter) params.happened_after = opts.happenedAfter;
	if (opts.happenedBefore) params.happened_before = opts.happenedBefore;
	if (opts.country) params.country = opts.country;
	if (opts.entityId) params.entity_id = opts.entityId;
	return params;
}

export async function search(
	fetcher: typeof fetch,
	q: string,
	opts: SearchFilters = {}
): Promise<SearchResult> {
	const env = await readEnvelope<{ events: SearchEventHit[]; articles: Article[] }, SearchMeta>(
		fetcher,
		'/search',
		buildSearchParams(q, opts)
	);
	return {
		events: env.data.events ?? [],
		articles: env.data.articles ?? [],
		meta: env.meta
	};
}
