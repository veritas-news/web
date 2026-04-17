import { get, getPaged } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { Event, EventDetail } from '$lib/types/event';
export function listEvents(fetcher: typeof fetch, params: QueryParams = {}) {
  return getPaged<Event>(fetcher, '/events', {
    fields: 'compact',
    limit: 18,
    minClusterSize: 3,
    minSourceCount: 2,
    ...params
  });
}

export function getEvent(fetcher: typeof fetch, id: string) {
  return get<EventDetail>(fetcher, `/events/${encodeURIComponent(id)}`);
}
