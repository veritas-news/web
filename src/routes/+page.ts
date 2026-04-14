import { listTimeline } from '$lib/api/timeline';
import { getEvent } from '$lib/api/events';
import { getTopic } from '$lib/api/topics';
import { getGlobalEvent } from '$lib/api/global';
import { describeAPIError } from '$lib/api/client';
import type { AnyDetail } from '$lib/types/event';
import type { UnifiedPageData } from '$lib/types/timeline';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }): Promise<UnifiedPageData> => {
  // Fetch unified timeline
  let items: import('$lib/types/event').UnifiedTimelineItem[] = [];
  let hasMore = false;
  let nextCursor: string | null = null;
  let listError: string | null = null;

  try {
    const page = await listTimeline(fetch);
    items = page.items;
    hasMore = page.pageInfo.hasMore;
    nextCursor = page.pageInfo.nextCursor;
  } catch (err) {
    listError = describeAPIError(err, { fallback: 'Unable to load intelligence timeline.' });
    return { items, hasMore, nextCursor, selectedId: null, detail: null, listError, detailError: null };
  }

  const first = items[0];
  if (!first) {
    return { items, hasMore, nextCursor, selectedId: null, detail: null, listError: null, detailError: null };
  }

  // Fetch detail for first item
  let detail: AnyDetail | null = null;
  let detailError: string | null = null;

  try {
    if (first.type === 'event') detail = await getEvent(fetch, first.id);
    else if (first.type === 'topic_event') detail = await getTopic(fetch, first.id);
    else if (first.type === 'global_event') detail = await getGlobalEvent(fetch, first.id);
  } catch (err) {
    detailError = describeAPIError(err, {
      notFound: 'Item not found.',
      fallback: 'Unable to load item detail.'
    });
  }

  return { items, hasMore, nextCursor, selectedId: first.id, detail, listError: null, detailError };
};
