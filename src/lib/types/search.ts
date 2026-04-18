import type { Article } from '$lib/types/article';

export interface SearchEventHit {
	id: string;
	title: string;
	category: string;
	impactScore: number;
	sentimentIndex?: number;
	happenedAt: string;
	lastUpdatedAt: string;
	clusterSize: number;
	sourceCount: number;
}

export interface SearchMeta {
	query: string;
	type: string;
	limit: number;
	count: number;
	eventCount: number;
	articleCount: number;
	[extra: string]: unknown;
}

export interface SearchResult {
	events: SearchEventHit[];
	articles: Article[];
	meta?: SearchMeta;
}

export type SearchType = 'all' | 'event' | 'article';
export type SearchImpactScope = 'local' | 'regional' | 'global';
export type SearchEventState = 'breaking' | 'developing' | 'stable';

export interface SearchFilters {
	type?: SearchType;
	limit?: number;
	minConviction?: number | null;
	impactScope?: SearchImpactScope | null;
	eventState?: SearchEventState | null;
}
