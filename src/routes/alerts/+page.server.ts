import { listAlerts } from '$lib/api/alerts';
import type { AlertsResult } from '$lib/types/alerts';
import type { PageServerLoad } from './$types';

export interface AlertsPageData {
	result: AlertsResult;
}

export const load: PageServerLoad = async ({ fetch }): Promise<AlertsPageData> => {
	const result = await listAlerts(fetch, { limit: 50 });
	return { result };
};
