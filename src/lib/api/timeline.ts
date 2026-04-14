import { APIError } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { UnifiedTimelineItem } from '$lib/types/event';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

const DEFAULT_ORIGIN = 'http://localhost:8080';

interface TimelinePageInfo {
  hasMore: boolean;
  nextCursor: string | null;
}

export interface TimelineResult {
  items: UnifiedTimelineItem[];
  pageInfo: TimelinePageInfo;
}

interface TimelineEnvelope {
  data: {
    items: UnifiedTimelineItem[];
    pageInfo: TimelinePageInfo;
  };
  error?: { code?: string; message?: string };
}

export async function listTimeline(
  fetcher: typeof fetch,
  params: QueryParams = {}
): Promise<TimelineResult> {
  const url = buildTimelineUrl({ limit: 30, ...params });
  const res = await fetcher(url, { headers: { accept: 'application/json' } });

  const raw = await res.text();
  const json: TimelineEnvelope = raw ? (JSON.parse(raw) as TimelineEnvelope) : ({} as TimelineEnvelope);

  if (!res.ok) {
    throw new APIError(
      json.error?.code ?? 'timeline_failed',
      json.error?.message ?? 'Failed to load timeline',
      res.status
    );
  }

  return json.data;
}

function buildTimelineUrl(params: QueryParams): string {
  const origin = browser
    ? 'http://local.veritas'
    : ((() => {
        const raw = (env.PUBLIC_API_BASE_URL ?? '').trim();
        if (!raw) return DEFAULT_ORIGIN;
        try { return new URL(raw).origin; } catch { return DEFAULT_ORIGIN; }
      })());

  const url = new URL('/v1/timeline', origin);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, String(v));
  }
  return browser ? `${url.pathname}${url.search}` : url.toString();
}
