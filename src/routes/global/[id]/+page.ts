import { APIError, describeAPIError } from '$lib/api/client';
import { getGlobalEvent } from '$lib/api/global';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const item = await getGlobalEvent(fetch, params.id);
		return { item };
	} catch (err) {
		if (err instanceof APIError && err.status === 404) {
			error(404, 'Global event not found.');
		}
		error(500, describeAPIError(err, { fallback: 'Unable to load global event.' }));
	}
};
