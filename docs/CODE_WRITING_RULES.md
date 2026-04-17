# Code Writing Rules (Svelte Edition)

**Veritas UI:** no client-side replication of server `*_v1` analytics; map pins from API only — **`../../plans/Veritas stats and features-e8fbe531.plan.md`**, **`../../docs/PLATFORM.md`**.

## Core Development Principles

* Design for **clarity**, **scalability**, **reactivity**, **testability**, and **maintainability**.
* Prefer **low coupling** and **predictable state flow**.
* Favor **small components**, **small modules**, and **explicit data flow**.
* Maintain **strong separation between UI, state, and business logic**.
  
---

## Mandatory Rules

### Rule 1 — File Size Limit

Every file must be **≤ 500 lines**.

* Svelte components (`.svelte`) should ideally stay under **300–400 lines**
* Split into:

  * `Component.svelte`
  * `Component.logic.ts`
  * `Component.types.ts`

---

### Rule 2 — Single Responsibility Components & Functions

* Each **component** must represent one UI concern.
* Each **function** must do one thing only.

**Bad:**

* Component handles UI + fetching + transformation + business logic

**Good:**

* UI component
* Store/service handles logic

---

### Rule 3 — Prefer Small Functions

* Functions: **≤ 40–60 lines**
* Extract:

  * data transformation
  * validation
  * formatting
  * side effects

---

### Rule 4 — No Business Logic in Components

Svelte components may only:

* Render UI
* Bind state
* Dispatch events
* Call services/stores

**Never inside components:**

* scoring logic
* complex filtering
* API orchestration
* retry logic

---

### Rule 5 — No API Calls Inside Components

All API calls must live in:

* `lib/api/`
* or service layer (`lib/services/`)

Components must never call `fetch` directly.

---

### Rule 6 — One Module, One Responsibility

Structure example:

```
lib/
  api/            → HTTP clients
  services/       → business logic
  stores/         → state management
  components/     → UI
  utils/          → helpers
```

---

### Rule 7 — Strong Layer Separation

Strict separation:

* **UI Layer** → `components/`
* **State Layer** → `stores/`
* **Service Layer** → `services/`
* **API Layer** → `api/`
* **Domain Types** → `types/`

---

### Rule 8 — English Keys Everywhere

Same as backend:

* props
* store keys
* API payloads
* events

---

### Rule 9 — Use Typed Objects for Complex Data

If a function/component takes many inputs → use typed objects.

```ts
type EventCardInput = {
  title: string
  description: string
  date: string
}
```

---

### Rule 10 — Explicit Error Handling

* Never ignore failed fetches
* Always return structured errors
* UI must handle:

  * loading
  * error
  * empty states

---

### Rule 11 — Wrap External APIs

All external calls must go through a **client layer**:

```
lib/api/newsClient.ts
lib/api/userClient.ts
```

No direct fetch usage outside this layer.

---

### Rule 12 — Centralized State (Stores)

Use Svelte stores for shared state:

* `writable`
* `derived`
* `readable`

Avoid:

* prop drilling across many layers
* duplicated state

---

### Rule 13 — Explicit Timeouts

All API calls must include timeouts (via wrapper):

```ts
fetchWithTimeout(url, { timeout: config.apiTimeout })
```

No raw fetch without timeout.

---

### Rule 14 — Idempotent UI Actions

UI actions must be safe to repeat:

* prevent duplicate submissions
* disable buttons during requests
* use request keys if needed

---

### Rule 15 — No Circular Imports

* Stores cannot import components
* Services cannot import components
* API cannot import anything internal

---

### Rule 16 — DTO vs UI Models

Separate:

* **API DTOs** (raw backend response)
* **UI models** (mapped, cleaned)

```ts
mapEventDtoToViewModel(dto)
```

---

### Rule 17 — Structured Logging

Frontend logging must include:

* event_id
* request_id
* user_id (if available)

Use consistent logging utility:

```
lib/utils/logger.ts
```

---

### Rule 18 — Testability

* Services must be testable without UI
* Stores must be testable independently
* Mock API layer in tests

---

### Rule 19 — No Magic Constants

All constants must live in:

```
lib/config/
```

or:

```ts
const MAX_EVENTS = 50 // explain why
```

---

### Rule 20 — Versioned Logic

For computed UI logic (sorting, ranking, grouping):

* include version identifiers
* do not silently change behavior

---

### Rule 21 — Readable Code Only

* No clever shortcuts
* Clear naming:

  * `eventList`
  * `selectedEvent`
  * not `ev`, `x`, `tmp`

---

### Rule 22 — Composition Over Monolith Components

Prefer:

* small reusable components
* slots
* composition

Avoid:

* giant "Page.svelte" doing everything

---

### Rule 23 — Use Orchestration Services

Complex flows must live in:

```
lib/services/
```

Example:

* loading timeline
* merging articles
* selecting default event

---

### Rule 24 — Split Early

Split components into:

```
EventTimeline.svelte
EventCard.svelte
EventDetails.svelte
```

---

### Rule 25 — Forward-Safe UI Changes

* Do not break existing API contracts silently
* Add new fields instead of mutating existing ones

---

## Optional (Highly Recommended for Svelte)

### Rule 26 — Avoid Over-Reactivity

* Do not overuse `$:` blocks
* Keep reactive statements simple and predictable

---

### Rule 27 — Derived State Only

Never duplicate state:

```ts
// BAD
let filtered = []
// manually update

// GOOD
const filtered = derived(store, ...)
```

---

### Rule 28 — Smart vs Dumb Components

* **Dumb components** → UI only
* **Smart components** → connect to stores/services
