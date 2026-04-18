import type {
	SearchEventState,
	SearchFilters,
	SearchImpactScope,
	SearchType
} from '$lib/types/search';

const SEARCH_TYPES: SearchType[] = ['all', 'event', 'article'];
const IMPACT_SCOPES: SearchImpactScope[] = ['local', 'regional', 'global'];
const EVENT_STATES: SearchEventState[] = ['breaking', 'developing', 'stable'];

function parseEnum<T extends string>(raw: string | null, allowed: T[]): T | null {
	if (!raw) return null;
	const v = raw.trim().toLowerCase();
	return (allowed as string[]).includes(v) ? (v as T) : null;
}

function parseMinConviction(raw: string | null): number | null {
	if (!raw) return null;
	const n = Number(raw);
	if (!Number.isFinite(n)) return null;
	if (n < 0 || n > 100) return null;
	return Math.round(n);
}

function parseLimit(raw: string | null): number | undefined {
	if (!raw) return undefined;
	const n = Number(raw);
	if (!Number.isFinite(n) || n <= 0) return undefined;
	return Math.floor(n);
}

export function parseSearchFiltersFromURL(params: URLSearchParams): SearchFilters {
	return {
		type: parseEnum(params.get('type'), SEARCH_TYPES) ?? 'all',
		limit: parseLimit(params.get('limit')),
		minConviction: parseMinConviction(params.get('min_conviction')),
		impactScope: parseEnum(params.get('impact_scope'), IMPACT_SCOPES),
		eventState: parseEnum(params.get('event_state'), EVENT_STATES)
	};
}

export function filtersToQueryObject(q: string, filters: SearchFilters): Record<string, string> {
	const out: Record<string, string> = { q };
	if (filters.type && filters.type !== 'all') out.type = filters.type;
	if (filters.limit) out.limit = String(filters.limit);
	if (filters.minConviction != null) out.min_conviction = String(filters.minConviction);
	if (filters.impactScope) out.impact_scope = filters.impactScope;
	if (filters.eventState) out.event_state = filters.eventState;
	return out;
}

export const SEARCH_FILTER_CHOICES = {
	types: SEARCH_TYPES,
	impactScopes: IMPACT_SCOPES,
	eventStates: EVENT_STATES
} as const;
