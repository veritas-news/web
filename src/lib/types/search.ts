import type { Article } from '$lib/types/article';

export interface SearchEventHit {
	id: string;
	title: string;
	category: string;
	impactScore: number;
	sentimentIndex: number;
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
}

export interface SearchResult {
	events: SearchEventHit[];
	articles: Article[];
	meta?: SearchMeta;
}
