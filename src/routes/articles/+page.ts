import { describeAPIError } from '$lib/api/client';
import { listArticles } from '$lib/api/articles';
import type { Article } from '$lib/types/article';
import type { PageLoad } from './$types';

export interface ArticlesIndexData {
	items: Article[];
	nextCursor: string | null;
	listError: string | null;
}

export const load: PageLoad = async ({ fetch }): Promise<ArticlesIndexData> => {
	try {
		const page = await listArticles(fetch, {});
		return { items: page.items, nextCursor: page.nextCursor, listError: null };
	} catch (err) {
		return {
			items: [],
			nextCursor: null,
			listError: describeAPIError(err, { fallback: 'Unable to load articles.' })
		};
	}
};
