import { APIError, describeAPIError } from '$lib/api/client';
import { getEvent } from '$lib/api/events';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const item = await getEvent(fetch, params.id);
		return { item };
	} catch (err) {
		if (err instanceof APIError && err.status === 404) {
			error(404, 'Event not found.');
		}
		error(500, describeAPIError(err, { fallback: 'Unable to load event.' }));
	}
};
