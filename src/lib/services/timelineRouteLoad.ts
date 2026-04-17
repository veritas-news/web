import { describeAPIError } from '$lib/api/client';
import { getEvent } from '$lib/api/events';
import { getGlobalEvent } from '$lib/api/global';
import { getTopic } from '$lib/api/topics';
import type { AnyDetail, UnifiedTimelineItem } from '$lib/types/event';
import type { UnifiedPageData } from '$lib/types/timeline';
import { fetchFeedPage, type TimelineScope } from '$lib/services/timelineFeed';

export async function loadTimelineRouteData(
	fetcher: typeof fetch,
	scope: TimelineScope
): Promise<UnifiedPageData> {
	let items: UnifiedTimelineItem[] = [];
	let hasMore = false;
	let nextCursor: string | null = null;
	let listError: string | null = null;

	try {
		const page = await fetchFeedPage(fetcher, scope, null);
		items = page.items;
		hasMore = page.hasMore;
		nextCursor = page.nextCursor;
	} catch (err) {
		listError = describeAPIError(err, { fallback: 'Unable to load timeline.' });
		return {
			items: [],
			hasMore: false,
			nextCursor: null,
			selectedId: null,
			detail: null,
			listError,
			detailError: null
		};
	}

	const first = items[0];
	if (!first) {
		return {
			items,
			hasMore,
			nextCursor,
			selectedId: null,
			detail: null,
			listError: null,
			detailError: null
		};
	}

	let detail: AnyDetail | null = null;
	let detailError: string | null = null;

	try {
		if (first.type === 'event') detail = await getEvent(fetcher, first.id);
		else if (first.type === 'topic_event') detail = await getTopic(fetcher, first.id);
		else detail = await getGlobalEvent(fetcher, first.id);
	} catch (err) {
		detailError = describeAPIError(err, {
			notFound: 'Item not found.',
			fallback: 'Unable to load item detail.'
		});
	}

	return {
		items,
		hasMore,
		nextCursor,
		selectedId: first.id,
		detail,
		listError: null,
		detailError
	};
}
