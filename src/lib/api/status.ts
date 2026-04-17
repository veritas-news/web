import { get } from '$lib/api/client';

export interface ApiStatusPayload {
	service: string;
	utcNow: string;
}

export function getApiStatus(fetcher: typeof fetch) {
	return get<ApiStatusPayload>(fetcher, '/status');
}
