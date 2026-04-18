import { describeAPIError } from '$lib/api/client';
import { fetchOpenMeteoCurrent } from '$lib/api/openMeteo';
import { getDashboardPulse } from '$lib/api/pulse';
import { getApiStatus } from '$lib/api/status';
import type { OpenMeteoCurrent } from '$lib/api/openMeteo';
import type { ApiStatusPayload } from '$lib/api/status';
import type { DashboardPulseData } from '$lib/types/pulse';
import type { PageServerLoad } from './$types';

const PULSE_WINDOW_HOURS = 24;
const PULSE_LIMIT = 10;

export interface PulsePageData {
	api: ApiStatusPayload | null;
	apiErr: string | null;
	weather: OpenMeteoCurrent | null;
	weatherErr: string | null;
	pulse: DashboardPulseData | null;
	pulseErr: string | null;
}

function errMessage(reason: unknown): string {
	if (reason instanceof Error) return reason.message;
	return 'Request failed.';
}

/** Server-only: Veritas `/v1` has no browser CORS; avoid client `load` re-running fetches from the browser. */
export const load: PageServerLoad = async ({ fetch }): Promise<PulsePageData> => {
	const [api, weather, pulse] = await Promise.allSettled([
		getApiStatus(fetch),
		fetchOpenMeteoCurrent(fetch, { lat: 52.52, lon: 13.41 }),
		getDashboardPulse(fetch, {
			windowHours: PULSE_WINDOW_HOURS,
			limit: PULSE_LIMIT,
			mode: 'pulse'
		})
	]);

	return {
		api: api.status === 'fulfilled' ? api.value : null,
		apiErr: api.status === 'rejected' ? errMessage(api.reason) : null,
		weather: weather.status === 'fulfilled' ? weather.value : null,
		weatherErr: weather.status === 'rejected' ? errMessage(weather.reason) : null,
		pulse: pulse.status === 'fulfilled' ? pulse.value : null,
		pulseErr:
			pulse.status === 'rejected'
				? describeAPIError(pulse.reason, { fallback: 'Pulse unavailable.' })
				: null
	};
};
