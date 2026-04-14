# Web App — SvelteKit Frontend

SvelteKit app. Consumes REST API from `docs/REST_API.md`. Displays events as vertical timelines.

Read `backend_docs/` folder to understand how Backend is built.

Read `GIT_WORKFLOW_RULES.md` and `CODE_WRITING_RULES.md` to understand how to write codes;

---

## Event Hierarchy

Three event types. Severity increases with scope and time.

### Event (Level 1 — Daily)

Smallest unit. Covers short-lived incidents. Influence fades within hours or days.

Fields (from REST API Event DTO):
- `id`
- `title`
- `description`
- `category`
- `keywords`
- `entities`
- `happendAt`
- `lastUpdatedAt`
- `generatedAt`
- `clusterSize`
- `sourceCount`

### TopicEvent (Level 2 — Regional)

Medium scope. Spans days to weeks. Affects specific geographic regions.

Fields (from REST API Topic DTO):
- `id`
- `title`
- `description`
- `regionScope`
- `generatedAt`
- `size`
- `articleCount`
- `timeStart`
- `timeEnd`
- `lastUpdatedAt`

### GlobalEvent (Level 3 — History-Altering)

Largest scope. Spans weeks to months. Studied by historians and experts. Impacts the entire world.

Fields (from REST API Global DTO):
- `id`
- `title`
- `description`
- `globalImpactScore`
- `generatedAt`
- `topicCount`
- `eventCount`
- `articleCount`
- `timeStart`
- `timeEnd`
- `lastUpdatedAt`

---

## App Architecture

```
src/
├── routes/
│   ├── +layout.svelte          # Shell: nav, auth placeholder, theme
│   ├── +page.svelte            # Timeline root (default: events view)
│   ├── events/
│   │   └── +page.svelte        # Level 1 timeline
│   ├── topics/
│   │   └── +page.svelte        # Level 2 timeline
│   └── global/
│       └── +page.svelte        # Level 3 timeline
├── lib/
│   ├── api/
│   │   ├── client.ts           # Base fetch wrapper (base path /v1, envelope unwrap)
│   │   ├── events.ts           # GET /v1/events, /v1/events/:id, /v1/events/:id/articles
│   │   ├── topics.ts           # GET /v1/topics, /v1/topics/:id, /v1/topics/:id/events
│   │   ├── global.ts           # GET /v1/global, /v1/global/:id, /v1/global/:id/topics
│   │   └── articles.ts         # GET /v1/articles, /v1/articles/:id
│   ├── components/
│   │   ├── timeline/
│   │   │   ├── Timeline.svelte         # Vertical timeline container
│   │   │   ├── TimelineCard.svelte     # Single card (title + description)
│   │   │   └── TimelineConnector.svelte# Visual line between cards
│   │   ├── detail/
│   │   │   ├── EventDetail.svelte      # Left panel: event fields
│   │   │   ├── TopicDetail.svelte      # Left panel: topic fields + child events
│   │   │   ├── GlobalDetail.svelte     # Left panel: global fields + child topics
│   │   │   └── ArticleList.svelte      # Supporting articles list
│   │   ├── auth/
│   │   │   └── AuthPlaceholder.svelte  # TODO: replace with real auth
│   │   └── ui/
│   │       ├── Badge.svelte            # Category/keyword chip
│   │       ├── Spinner.svelte
│   │       └── ErrorMessage.svelte
│   ├── stores/
│   │   ├── selectedEvent.ts    # Currently selected timeline item
│   │   └── cursor.ts           # Pagination cursor per list
│   └── types/
│       ├── event.ts            # Event, TopicEvent, GlobalEvent TypeScript interfaces
│       └── article.ts          # Article interface
└── app.html
```

---

## Authentication Placeholder

Auth not implemented. Placeholder only.

```svelte
<!-- src/lib/components/auth/AuthPlaceholder.svelte -->
<!-- TODO: Replace with real auth (JWT, session cookie, OAuth) -->
<!-- Current behavior: no-op, all routes open -->
```

When implementing auth, wire into `+layout.server.ts` load function. Guard routes via `hooks.server.ts`.

---

## Layout: Two-Panel Split

Main view splits into two panels once an item is selected.

```
┌─────────────────────────────────────────────────────┐
│  [Nav: Events | Topics | Global]    [Auth Placeholder]│
├─────────────────────────────────────┬───────────────┤
│  LEFT PANEL                         │  RIGHT PANEL  │
│  Vertical Timeline                  │  Detail view  │
│                                     │  (fields)     │
│  ┌──────────────────────────────┐   │               │
│  │  Card: Title + Description   │──►│  title        │
│  └──────────────────────────────┘   │  description  │
│         │ (connector)               │  category     │
│  ┌──────────────────────────────┐   │  happendAt    │
│  │  Card                        │   │  ...          │
│  └──────────────────────────────┘   │               │
│         │                           │  Articles     │
│  ┌──────────────────────────────┐   │  ───────────  │
│  │  Card                        │   │  [article]    │
│  └──────────────────────────────┘   │  [article]    │
│                                     │               │
│                                     │  Sub-events   │
│                                     │  (topics/     │
│                                     │   globals     │
│                                     │   only)       │
└─────────────────────────────────────┴───────────────┘
```

Left Panel should be 40% of the window width and Right panel should be 60% of the window width.

On load: fetch first page. Auto-select latest item (first in list, sorted by `happendAt DESC`). Populate left panel.

---

## Timeline Behavior

### Right Panel — Card List

Each card renders:
- `title` — primary text
- `description` — secondary text (truncated to 2 lines)
- Timestamp badge (`happendAt` for events, `timeEnd` for topics/globals)

Cards sorted by:
- Events: `happendAt DESC`
- Topics: `lastUpdatedAt DESC`
- Global: `timeEnd DESC`

Selected card: highlighted (border accent, elevated shadow). Click any card → update left panel.

Auto-select on load: first card in list (latest).

Pagination: "Load more" button at bottom. Appends next page using cursor from `meta.next_cursor`.

### Left Panel — Detail View

Renders on item select. Empty state before selection.

**Event fields displayed:**
- `title`
- `description`
- `category` — badge
- `keywords` — chips list
- `entities` — chips list
- `happendAt` — formatted date
- `lastUpdatedAt`
- `generatedAt`
- `clusterSize` — number
- `sourceCount` — number

**TopicEvent extra fields:**
- `regionScope`
- `size`
- `articleCount`
- `timeStart` / `timeEnd` — date range

**GlobalEvent extra fields:**
- `globalImpactScore` — visual indicator (0–100)
- `topicCount`
- `eventCount`
- `articleCount`
- `timeStart` / `timeEnd`

Below fields:

**Articles section** (all types): fetches `GET /v1/events/:id/articles` or equivalent. Renders compact list. Fields: `title`, `source`, `publishedAt`, `link`.

**Sub-events section** (TopicEvent, GlobalEvent only):
- TopicEvent → fetches `GET /v1/topics/:id/events` → renders child Event cards
- GlobalEvent → fetches `GET /v1/global/:id/topics` → renders child TopicEvent cards

---

## API Client

Wraps fetch. Unwraps `data` envelope. Handles errors.

```typescript
// src/lib/api/client.ts

const BASE = '/v1';

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(BASE + path, window.location.origin);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  const json = await res.json();

  if (!res.ok) {
    throw new APIError(json.error?.code, json.error?.message, res.status);
  }

  return json.data as T;
}

class APIError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
  }
}
```

Cursor pagination: pass `cursor` param when loading next page. Merge returned `items` into existing list.

Fields mode: pass `fields=compact` for list requests, `fields=full` for detail.

---

## TypeScript Types

```typescript
// src/lib/types/event.ts

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  entities: string[];
  happendAt: string;        // ISO 8601
  lastUpdatedAt: string;
  generatedAt: string;
  clusterSize: number;
  sourceCount: number;
}

export interface TopicEvent {
  id: string;
  title: string;
  description: string;
  regionScope: string;
  generatedAt: string;
  size: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  lastUpdatedAt: string;
}

export interface GlobalEvent {
  id: string;
  title: string;
  description: string;
  globalImpactScore: number;
  generatedAt: string;
  topicCount: number;
  eventCount: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  lastUpdatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  author: string;
  categories: string[];
  publishedAt: string;
  updatedAt: string;
  link: string;
  imageUrl: string;
}
```

---

## Paged Response Envelope

```typescript
export interface PagedResponse<T> {
  data: {
    items: T[];
    next_cursor: string;
  };
  meta: {
    count: number;
    limit: number;
    cursor: string;
  };
}
```

---

## Routes Summary

| Route | API Calls | Notes |
|---|---|---|
| `/` or `/events` | `GET /v1/events` + `GET /v1/events/:id` | Default view |
| `/topics` | `GET /v1/topics` + `GET /v1/topics/:id` | |
| `/global` | `GET /v1/global` + `GET /v1/global/:id` | |
| Detail (event) | `GET /v1/events/:id/articles` | On select |
| Detail (topic) | `GET /v1/topics/:id/events` + articles per event | On select |
| Detail (global) | `GET /v1/global/:id/topics` | On select |

---

## Error States

- API 404 → "Event not found" inline message
- API 429 → "Rate limited. Retry in a moment."
- API 503 / 504 → "Server unavailable. Retrying..."
- Network failure → "Connection error."

All errors shown in left panel if triggered by detail fetch. Shown above timeline if triggered by list fetch.

---

## Scaffold Checklist

Skeleton only. No styling, no real auth, no infinite scroll yet.

- [ ] `src/app.html` — base HTML shell
- [ ] `src/routes/+layout.svelte` — nav + auth placeholder slot
- [ ] `src/routes/+page.svelte` — redirects to `/events`
- [ ] `src/routes/events/+page.svelte` — two-panel layout, wired to events API
- [ ] `src/routes/topics/+page.svelte` — two-panel layout, wired to topics API
- [ ] `src/routes/global/+page.svelte` — two-panel layout, wired to global API
- [ ] `src/lib/api/client.ts` — base fetch + error handling
- [ ] `src/lib/api/events.ts` — events endpoints
- [ ] `src/lib/api/topics.ts` — topics endpoints
- [ ] `src/lib/api/global.ts` — global endpoints
- [ ] `src/lib/api/articles.ts` — articles endpoints
- [ ] `src/lib/types/event.ts` — TypeScript interfaces
- [ ] `src/lib/types/article.ts` — Article interface
- [ ] `src/lib/stores/selectedEvent.ts` — writable store for selected item
- [ ] `src/lib/components/timeline/Timeline.svelte` — list container
- [ ] `src/lib/components/timeline/TimelineCard.svelte` — card (title + desc)
- [ ] `src/lib/components/detail/EventDetail.svelte` — field renderer
- [ ] `src/lib/components/detail/TopicDetail.svelte` — field renderer
- [ ] `src/lib/components/detail/GlobalDetail.svelte` — field renderer
- [ ] `src/lib/components/detail/ArticleList.svelte` — articles sub-list
- [ ] `src/lib/components/auth/AuthPlaceholder.svelte` — TODO stub

---

## Backend Reference

Backend: Go service. Graph DB: Neo4j. Pipeline: RSS → Article → Similarity → EventCluster → Event → TopicCluster → TopicEvent → GlobalCluster → GlobalEvent.

API contract: `docs/REST_API.md`. All responses JSON. Envelope: `{ data, meta }`. Errors: `{ error: { code, message } }`. Cursors opaque — never parse.

Quality filter default: `clusterSize >= 3`, `sourceCount >= 2`. Pass `minClusterSize` and `minSourceCount` on events list request to override.

Fields mode: list routes default `compact`, detail routes default `full`. Override with `?fields=compact|full|id,title,...`.
