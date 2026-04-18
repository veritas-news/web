import { APIError, describeAPIError, get } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { AlertsListPayload, AlertsResult } from '$lib/types/alerts';

const FEATURE_UNAVAILABLE_MSG = 'Alerts unavailable in this deployment.';

interface ListAlertsOpts {
	limit?: number;
}

function isFeatureUnavailable(error: APIError): boolean {
	return error.status === 503 || error.code === 'feature_unavailable';
}

export async function listAlerts(
	fetcher: typeof fetch,
	opts: ListAlertsOpts = {}
): Promise<AlertsResult> {
	const params: QueryParams = {};
	if (opts.limit != null) params.limit = opts.limit;
	try {
		const data = await get<AlertsListPayload>(fetcher, '/alerts', params);
		return { kind: 'ok', data };
	} catch (err) {
		if (err instanceof APIError && isFeatureUnavailable(err)) {
			return { kind: 'unavailable', message: FEATURE_UNAVAILABLE_MSG };
		}
		return {
			kind: 'error',
			message: describeAPIError(err, { fallback: 'Alerts fetch failed.' })
		};
	}
}
