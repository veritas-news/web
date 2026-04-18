# Backend API gaps required by the web UI

This document enumerates the **minimal**, additive backend changes needed to render
richer previews in the SvelteKit frontend. All changes below are **backward-compatible**
(new optional fields). The UI already renders gracefully when these are absent.

Status legend: 🟡 = UI scaffolded, waiting on backend · 🟢 = backend done.

---

## 1. `map.pin.preview` — Map pin popups (hover / click)

**Endpoint(s)**

- `GET /v1/map/events`

**Consumer**

- `web/src/lib/components/map/MapWorkspace.svelte`
- `web/src/lib/components/map/mapPopup.ts` (`renderPinPopupHTML`)

**Current DTO** (`backend/internal/http/api_map.go` → `mapPinItemDTO`)

```
type, id, title, lat, lng, locationName, locationConfidence,
locationSource, impactScore, articleDensity, relevanceGap,
analystConviction, metricVersions
```

**Proposed additive fields**

| Field         | Type   | Source on `event.View`                | Notes                                            |
| ------------- | ------ | ------------------------------------- | ------------------------------------------------ |
| `description` | string | `v.Summary` / first sentence of body  | ≤ 280 chars; server-side truncate+ellipsis       |
| `happenedAt`  | string | `v.HappenedAt` (ISO 8601, UTC)        | Already on the `Event` node — just plumb through |
| `imageUrl`    | string | `v.HeroImageURL` / first article img  | Optional; may be empty string                    |

**Rendering contract**

- Popup shows `type · title · (locationName, happenedAt, impact) · description · image (optional)`.
- Fields are independently optional. UI hides rows whose values are empty.

**Implementation hints**

- Extend `buildSpatialMapItems` → `mapPinItemDTO` in `backend/internal/http/api_map.go`.
- Add the three columns to the Cypher projection in the same file (or reader).
- Consider capping `description` server-side (e.g. 280 chars) to keep payloads small.

**UI fallback today**

- Without these fields, the popup shows `type · title · locationName · impact` only.
  No description, date, or image is rendered. No hard-coded placeholders.

---

## 2. `relationships.preview` — Human-readable relationship rows

**Endpoint(s)**

- `GET /v1/events/:eventId/relationships`
- `GET /v1/topics/:topicId/relationships`
- `GET /v1/global/:globalId/relationships`

**Consumer**

- `web/src/lib/components/detail/RelationshipsSection.svelte`
- `web/src/lib/components/detail/RelationshipRow.svelte`
- `web/src/lib/services/relationships.ts`

**Current DTO** (`backend/internal/relationships/reader.go` → `RelationshipRef`)

```
kind, targetId, relationshipSourceV1, confidenceV1
```

**Proposed additive field**

Add a nested, optional `preview` object populated during the Cypher read:

```ts
preview?: {
  targetType?: "event" | "topic_event" | "global_event" | "topic" | "global";
  title?: string;          // Node.title
  description?: string;    // Node.summary (short)
  happenedAt?: string;     // Event.happenedAt (ISO 8601)
  lastUpdatedAt?: string;  // Node.lastUpdatedAt (ISO 8601)
  impactScore?: number;    // Node.impactScore (events only)
  imageUrl?: string;       // Optional
}
```

**Cypher change (sketch)**

In `reader.go` when fetching relationships, return preview fields for each target:

```cypher
MATCH (src)-[r]->(tgt)
WHERE ...
RETURN
  type(r)              AS kind,
  tgt.clusterId        AS targetId,
  labels(tgt)[0]       AS targetType,
  tgt.title            AS title,
  tgt.summary          AS description,
  tgt.happenedAt       AS happenedAt,
  tgt.lastUpdatedAt    AS lastUpdatedAt,
  tgt.impactScore      AS impactScore,
  coalesce(r.relationshipSourceV1, 'graph') AS relationshipSourceV1,
  coalesce(r.confidenceV1, 1.0)             AS confidenceV1
```

**Rendering contract**

- If `preview.title` or `preview.description` is present, the row renders as a
  titled card with description, date, impact chip, kind chip, and the raw id as
  subdued metadata.
- If `preview` is absent or empty, the row falls back to the existing
  `targetId · kind · source` line (no extra network calls).
- UI **never** makes N+1 lookups to hydrate previews.

**UI fallback today**

- Without preview, rows show `targetId · kind · relationshipSourceV1`.
- This keeps performance predictable and avoids fanning out detail requests.

---

## 3. `alerts.preview` — Human-readable alert cards

**Endpoint(s)**

- `GET /v1/alerts`

**Consumer**

- `web/src/routes/alerts/+page.svelte`
- `web/src/lib/components/alerts/AlertCard.svelte`
- `web/src/lib/services/alerts.ts`

**Current DTO** (`backend/internal/http/api_alerts.go` → `alertsItemDTO`)

```
eventId, previousFingerprint, currentFingerprint, signals, metricVersions
```

**Proposed additive field**

Add a nested, optional `preview` object read from the referenced event node at
query time (same Cypher round-trip that resolves the alert):

```ts
preview?: {
  title?: string;           // Event.title
  subtitle?: string;         // Event.subtitle
  description?: string;      // Event.summary (≤ 280 chars, server-truncated)
  happenedAt?: string;       // Event.happenedAt (ISO 8601)
  lastUpdatedAt?: string;    // Event.lastUpdatedAt (ISO 8601)
  primaryCategory?: string;  // Event.primaryCategory
  locationName?: string;     // Event.locationName
  imageUrl?: string;         // Optional hero / first-article image
}
```

**Cypher change (sketch)**

In `alerts.Recent` (or the HTTP layer before returning), fetch the peer event
in bulk by `eventId`:

```cypher
UNWIND $eventIds AS id
MATCH (e:Event { clusterId: id })
RETURN
  e.clusterId        AS eventId,
  e.title            AS title,
  e.subtitle         AS subtitle,
  e.summary          AS description,
  e.happenedAt       AS happenedAt,
  e.lastUpdatedAt    AS lastUpdatedAt,
  e.primaryCategory  AS primaryCategory,
  e.locationName     AS locationName
```

Merge the preview rows into the outgoing `items` slice — single round-trip, no
N+1.

**Rendering contract**

- When `preview.title` is present, the card leads with the event title, then
  description, date, and location; the event id drops to a subdued footer.
- When `preview` is absent, the card still renders: the event id acts as the
  title, the fingerprint delta is visible, and signal meters/chips render.
- UI **never** fans out `/v1/events/:id` calls to hydrate alerts.

**UI fallback today**

- Signal meters (impact, conviction), state / scope / uncertainty chips, and
  the fingerprint delta (`prev → curr`) are always rendered from existing
  fields. Only title/description/date/location/image require the additive
  `preview` block.

---

## Non-goals

- **No** client-side peer fetch / N+1 to hydrate previews — enrichment must
  happen server-side in the same Cypher read.
- **No** breaking renames. All additions are optional fields.
- **No** new endpoints required for these gaps; extend existing DTOs only.
