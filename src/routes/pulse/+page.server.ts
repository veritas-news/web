import { describeAPIError } from '$lib/api/client';
import { getDailyBriefing } from '$lib/api/briefing';
import { fetchOpenMeteoCurrent } from '$lib/api/openMeteo';
import { getDashboardPulse } from '$lib/api/pulse';
import { getApiStatus } from '$lib/api/status';
import type { OpenMeteoCurrent } from '$lib/api/openMeteo';
import type { ApiStatusPayload } from '$lib/api/status';
import type { BriefingDailyData } from '$lib/types/briefing';
import type { DashboardPulseData } from '$lib/types/pulse';
import type { PageServerLoad } from './$types';

const PULSE_WINDOW_HOURS = 24;
const DEFAULT_PULSE_LIMIT = 10;

export interface PulsePageData {
	api: ApiStatusPayload | null;
	apiErr: string | null;
	weather: OpenMeteoCurrent | null;
	weatherErr: string | null;
	briefing: BriefingDailyData | null;
	briefingErr: string | null;
	pulse: DashboardPulseData | null;
	pulseErr: string | null;
}

function errMessage(reason: unknown): string {
	if (reason instanceof Error) return reason.message;
	return 'Request failed.';
}

/** Server-only: Veritas `/v1` has no browser CORS; avoid client `load` re-running fetches from the browser. */
export const load: PageServerLoad = async ({ fetch, url }): Promise<PulsePageData> => {
	const modeParam = url.searchParams.get('mode');
	const mode =
		modeParam === 'relevance_gap' || modeParam === 'impact' || modeParam === 'pulse'
			? modeParam
			: 'pulse';
	const limitRaw = Number(url.searchParams.get('limit'));
	const limit =
		Number.isFinite(limitRaw) && limitRaw >= 1 && limitRaw <= 500
			? Math.floor(limitRaw)
			: DEFAULT_PULSE_LIMIT;
	const whRaw = Number(url.searchParams.get('window_hours'));
	const windowHours =
		Number.isFinite(whRaw) && whRaw >= 1 && whRaw <= 168 ? whRaw : PULSE_WINDOW_HOURS;

	const [api, weather, briefing, pulse] = await Promise.allSettled([
		getApiStatus(fetch),
		fetchOpenMeteoCurrent(fetch, { lat: 52.52, lon: 13.41 }),
		getDailyBriefing(fetch, { windowHours }),
		getDashboardPulse(fetch, {
			windowHours,
			limit,
			mode
		})
	]);

	return {
		api: api.status === 'fulfilled' ? api.value : null,
		apiErr: api.status === 'rejected' ? errMessage(api.reason) : null,
		weather: weather.status === 'fulfilled' ? weather.value : null,
		weatherErr: weather.status === 'rejected' ? errMessage(weather.reason) : null,
		briefing: briefing.status === 'fulfilled' ? briefing.value : null,
		briefingErr:
			briefing.status === 'rejected'
				? describeAPIError(briefing.reason, { fallback: 'Daily briefing unavailable.' })
				: null,
		pulse: pulse.status === 'fulfilled' ? pulse.value : null,
		pulseErr:
			pulse.status === 'rejected'
				? describeAPIError(pulse.reason, { fallback: 'Pulse unavailable.' })
				: null
	};
};
