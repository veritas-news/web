import { listEvents } from '$lib/api/events';
import { listGlobalEvents } from '$lib/api/global';
import { listTopics } from '$lib/api/topics';
import { listTimeline } from '$lib/api/timeline';
import type { UnifiedTimelineItem } from '$lib/types/event';
import { eventToUnified, globalToUnified, topicToUnified } from '$lib/utils/timelineAdapters';

export type TimelineScope = 'unified' | 'events' | 'topics' | 'global';

export interface FeedPage {
	items: UnifiedTimelineItem[];
	hasMore: boolean;
	nextCursor: string | null;
}

/** Optional `personalUserId` narrows unified timeline to follows (server-side). */
export async function fetchFeedPage(
	fetcher: typeof fetch,
	scope: TimelineScope,
	cursor: string | null,
	opts?: { personalUserId?: string }
): Promise<FeedPage> {
	if (scope === 'unified') {
		const base = cursor ? { cursor, limit: 30 } : { limit: 30 };
		const params =
			opts?.personalUserId != null && opts.personalUserId !== ''
				? { ...base, personalUserId: opts.personalUserId }
				: base;
		const p = await listTimeline(fetcher, params);
		return {
			items: p.items,
			hasMore: p.pageInfo.hasMore,
			nextCursor: p.pageInfo.nextCursor
		};
	}

	if (scope === 'events') {
		const p = await listEvents(fetcher, cursor ? { cursor } : {});
		return {
			items: p.items.map(eventToUnified),
			hasMore: p.nextCursor != null,
			nextCursor: p.nextCursor
		};
	}

	if (scope === 'topics') {
		const p = await listTopics(fetcher, cursor ? { cursor } : {});
		return {
			items: p.items.map(topicToUnified),
			hasMore: p.nextCursor != null,
			nextCursor: p.nextCursor
		};
	}

	const p = await listGlobalEvents(fetcher, cursor ? { cursor } : {});
	return {
		items: p.items.map(globalToUnified),
		hasMore: p.nextCursor != null,
		nextCursor: p.nextCursor
	};
}
