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

function parseOptionalImpact(raw: string | null): number | null {
	return parseMinConviction(raw);
}

function parseLimit(raw: string | null): number | undefined {
	if (!raw) return undefined;
	const n = Number(raw);
	if (!Number.isFinite(n) || n <= 0) return undefined;
	return Math.floor(n);
}

export function parseSearchFiltersFromURL(params: URLSearchParams): SearchFilters {
	const country = params.get('country')?.trim().toUpperCase() ?? null;
	return {
		type: parseEnum(params.get('type'), SEARCH_TYPES) ?? 'all',
		limit: parseLimit(params.get('limit')),
		minConviction: parseMinConviction(params.get('min_conviction')),
		maxConviction: parseMinConviction(params.get('max_conviction')),
		minImpact: parseOptionalImpact(params.get('min_impact')),
		maxImpact: parseOptionalImpact(params.get('max_impact')),
		impactScope: parseEnum(params.get('impact_scope'), IMPACT_SCOPES),
		eventState: parseEnum(params.get('event_state'), EVENT_STATES),
		happenedAfter: params.get('happened_after')?.trim() || null,
		happenedBefore: params.get('happened_before')?.trim() || null,
		country: country && country.length === 2 ? country : null,
		entityId: params.get('entity_id')?.trim() || null
	};
}

export function filtersToQueryObject(q: string, filters: SearchFilters): Record<string, string> {
	const out: Record<string, string> = { q };
	if (filters.type && filters.type !== 'all') out.type = filters.type;
	if (filters.limit) out.limit = String(filters.limit);
	if (filters.minConviction != null) out.min_conviction = String(filters.minConviction);
	if (filters.maxConviction != null) out.max_conviction = String(filters.maxConviction);
	if (filters.minImpact != null) out.min_impact = String(filters.minImpact);
	if (filters.maxImpact != null) out.max_impact = String(filters.maxImpact);
	if (filters.impactScope) out.impact_scope = filters.impactScope;
	if (filters.eventState) out.event_state = filters.eventState;
	if (filters.happenedAfter) out.happened_after = filters.happenedAfter;
	if (filters.happenedBefore) out.happened_before = filters.happenedBefore;
	if (filters.country) out.country = filters.country;
	if (filters.entityId) out.entity_id = filters.entityId;
	return out;
}

export const SEARCH_FILTER_CHOICES = {
	types: SEARCH_TYPES,
	impactScopes: IMPACT_SCOPES,
	eventStates: EVENT_STATES
} as const;
