import { describeAPIError } from '$lib/api/client';
import { listSources } from '$lib/api/sources';
import type { FeedSource } from '$lib/types/source';
import type { PageLoad } from './$types';

export interface SourcesPageData {
	sources: FeedSource[];
	error: string | null;
}

export const load: PageLoad = async ({ fetch }): Promise<SourcesPageData> => {
	try {
		const sources = await listSources(fetch);
		return { sources, error: null };
	} catch (err) {
		return {
			sources: [],
			error: describeAPIError(err, { fallback: 'Unable to load sources.' })
		};
	}
};
