import { get } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { DashboardPulseData, PulseData, PulseQuery } from '$lib/types/pulse';

function buildParams(opts: PulseQuery): QueryParams {
	const params: QueryParams = {};
	if (opts.windowHours != null) params.window_hours = opts.windowHours;
	if (opts.limit != null) params.limit = opts.limit;
	if (opts.mode) params.mode = opts.mode;
	return params;
}

export function getPulse(fetcher: typeof fetch, opts: PulseQuery = {}): Promise<PulseData> {
	return get<PulseData>(fetcher, '/pulse', buildParams(opts));
}

export function getDashboardPulse(
	fetcher: typeof fetch,
	opts: PulseQuery = {}
): Promise<DashboardPulseData> {
	return get<DashboardPulseData>(fetcher, '/dashboard/pulse', buildParams(opts));
}
