import { get } from '$lib/api/client';
import type { FeedSource } from '$lib/types/source';

export function listSources(fetcher: typeof fetch) {
	return get<FeedSource[]>(fetcher, '/sources');
}
