import { APIError, describeAPIError } from '$lib/api/client';
import { getArticle } from '$lib/api/articles';
import { resolveArticleIdFromParam } from '$lib/utils/articleRouteId';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const id = resolveArticleIdFromParam(params.id);
		const item = await getArticle(fetch, id);
		return { item };
	} catch (err) {
		if (err instanceof APIError && err.status === 404) {
			error(404, 'Article not found.');
		}
		error(500, describeAPIError(err, { fallback: 'Unable to load article.' }));
	}
};
