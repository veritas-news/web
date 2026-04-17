import { get, getPaged } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { TopicEvent, TopicEventDetail } from '$lib/types/event';

export function listTopics(fetcher: typeof fetch, params: QueryParams = {}) {
  return getPaged<TopicEvent>(fetcher, '/topics', {
    fields: 'compact',
    limit: 18,
    ...params
  });
}

export function getTopic(fetcher: typeof fetch, id: string) {
  return get<TopicEventDetail>(fetcher, `/topics/${encodeURIComponent(id)}`);
}
