import { get } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { BriefingDailyData, BriefingQuery } from '$lib/types/briefing';

function buildParams(opts: BriefingQuery): QueryParams {
	const params: QueryParams = {};
	if (opts.windowHours != null) params.window_hours = opts.windowHours;
	return params;
}

export function getDailyBriefing(
	fetcher: typeof fetch,
	opts: BriefingQuery = {}
): Promise<BriefingDailyData> {
	return get<BriefingDailyData>(fetcher, '/briefing/daily', buildParams(opts));
}
