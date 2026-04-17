import { APIError, describeAPIError } from '$lib/api/client';
import { getTopic } from '$lib/api/topics';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const item = await getTopic(fetch, params.id);
		return { item };
	} catch (err) {
		if (err instanceof APIError && err.status === 404) {
			error(404, 'Topic not found.');
		}
		error(500, describeAPIError(err, { fallback: 'Unable to load topic.' }));
	}
};
