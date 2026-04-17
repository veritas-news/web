/** RSS / feed source from GET /v1/sources */
export interface FeedSource {
	id: string;
	url: string;
	title: string;
	lang: string;
	priority: string;
	pollIntervalMin: number;
	active: boolean;
	lastFetchedAt: string | null;
	lastStatusCode: number;
	lastParseError: string;
}
