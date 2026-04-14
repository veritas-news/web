import { get, getPaged } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { GlobalEvent, GlobalEventDetail, TopicEvent } from '$lib/types/event';

export function listGlobalEvents(fetcher: typeof fetch, params: QueryParams = {}) {
  return getPaged<GlobalEvent>(fetcher, '/global', {
    fields: 'compact',
    limit: 18,
    ...params
  });
}

export function getGlobalEvent(fetcher: typeof fetch, id: string) {
  return get<GlobalEventDetail>(fetcher, `/global/${encodeURIComponent(id)}`);
}

export function getGlobalTopics(fetcher: typeof fetch, id: string, params: QueryParams = {}) {
  return getPaged<TopicEvent>(fetcher, `/global/${encodeURIComponent(id)}/topics`, {
    fields: 'compact',
    limit: 12,
    ...params
  });
}
