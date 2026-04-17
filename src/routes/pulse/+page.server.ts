import { getApiStatus } from '$lib/api/status';
import { fetchOpenMeteoCurrent } from '$lib/api/openMeteo';
import { fetchNasaApod } from '$lib/api/nasaApod';
import type { ApiStatusPayload } from '$lib/api/status';
import type { OpenMeteoCurrent } from '$lib/api/openMeteo';
import type { NasaApod } from '$lib/api/nasaApod';
import type { PageServerLoad } from './$types';

export interface PulsePageData {
	api: ApiStatusPayload | null;
	apiErr: string | null;
	weather: OpenMeteoCurrent | null;
	weatherErr: string | null;
	apod: NasaApod | null;
	apodErr: string | null;
}

function errMessage(reason: unknown): string {
	if (reason instanceof Error) return reason.message;
	return 'Request failed.';
}

/** Server-only: Veritas `/v1` has no browser CORS; avoid client `load` re-running fetches from the browser. */
export const load: PageServerLoad = async ({ fetch }): Promise<PulsePageData> => {
	const [api, weather, apod] = await Promise.allSettled([
		getApiStatus(fetch),
		fetchOpenMeteoCurrent(fetch, { lat: 52.52, lon: 13.41 }),
		fetchNasaApod(fetch)
	]);

	return {
		api: api.status === 'fulfilled' ? api.value : null,
		apiErr: api.status === 'rejected' ? errMessage(api.reason) : null,
		weather: weather.status === 'fulfilled' ? weather.value : null,
		weatherErr: weather.status === 'rejected' ? errMessage(weather.reason) : null,
		apod: apod.status === 'fulfilled' ? apod.value : null,
		apodErr: apod.status === 'rejected' ? errMessage(apod.reason) : null
	};
};
