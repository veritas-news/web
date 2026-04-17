import { get, getPaged } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { GlobalEvent, GlobalEventDetail } from '$lib/types/event';

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
