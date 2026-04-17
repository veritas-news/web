import { loadTimelineRouteData } from '$lib/services/timelineRouteLoad';
import type { UnifiedPageData } from '$lib/types/timeline';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }): Promise<UnifiedPageData> =>
	loadTimelineRouteData(fetch, 'global');
