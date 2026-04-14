# Veritas — Design System

**North Star: "The Sovereign Analyst"**
High-end geopolitical terminal. Hard-Edge Brutalism + Editorial Sophistication.
Every pixel placed with intent. Feels like a document of record, not a website.

---

## Color System

### The No-Line Rule
No 1px borders for sectioning. Separate via **background shifts** only.

### Surface Stack (tonal layering — no shadows)

| Token | Value | Usage |
|---|---|---|
| `--surface` | `#0c0e11` | Page base |
| `--surface-low` | `#111418` | Sidebars, nav bar |
| `--surface-base` | `#161a1f` | Primary panels |
| `--surface-high` | `#1b2027` | Cards (resting) |
| `--surface-highest` | `#20262e` | Cards (hover) |
| `--surface-bright` | `#252d36` | Active/selected state |

### Event Hierarchy — High-Signal Color Logic

Color = reserved for event importance level only.

| Token | Value | Tier | Use |
|---|---|---|---|
| `--clr-event` | `#c3c7cc` | Event (low) | Muted neutral accent |
| `--clr-event-container` | `#43474b` | Event (low) | Chip background |
| `--clr-topic` | `#feb300` | TopicEvent (med) | Amber — sparse, high-relevance |
| `--clr-topic-container` | `#513600` | TopicEvent (med) | Chip background |
| `--clr-global` | `#ec91ff` | GlobalEvent (high) | Violet — authority, premium |
| `--clr-global-container` | `#580070` | GlobalEvent (high) | Chip background |

### Text

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#e0e6f1` | Primary text |
| `--ink-soft` | `#a5abb6` | Metadata, secondary |
| `--ink-muted` | `#707680` | Disabled, outline |

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--error` | `#ee7d77` | Error state |
| `--error-container` | `#7f2927` | Error background |
| `--outline` | `#707680` | Ghost borders (accessibility only) |
| `--outline-variant` | `#424851` | Ghost borders at 15% opacity |

---

## Typography

### Dual Typeface System

| Role | Font | Rationale |
|---|---|---|
| **Newsreader** (serif) | Display, Headline | "NYT" editorial authority |
| **Work Sans** (sans) | Title, Body, Label, UI | Swiss precision for data |

### Scale

| Token | Size | Font | Usage |
|---|---|---|---|
| `--text-display` | `3.5rem` | Newsreader | Major global headlines |
| `--text-headline` | `1.75rem` | Newsreader | Article titles, GlobalEvent cards |
| `--text-title-lg` | `1.25rem` | Work Sans 600 | TopicEvent card titles |
| `--text-title` | `1.05rem` | Work Sans 500 | Event card titles |
| `--text-body` | `0.875rem` | Work Sans 400 | Intelligence body copy |
| `--text-label` | `0.6875rem` | Work Sans 700 | Metadata, timestamps |

**Label rule:** Always UPPERCASE + `letter-spacing: 0.08em`

---

## Spacing Scale

| Token | Value |
|---|---|
| `--sp-1` | `0.25rem` |
| `--sp-2` | `0.5rem` |
| `--sp-3` | `0.75rem` |
| `--sp-4` | `1rem` |
| `--sp-5` | `1.25rem` |
| `--sp-6` | `1.5rem` |
| `--sp-8` | `2rem` |
| `--sp-10` | `2.5rem` |
| `--sp-12` | `3rem` |
| `--sp-16` | `4rem` |

---

## Elevation & Depth

**Rule:** No box-shadows. Depth via background tonal stacking only.

```
Level 0 → --surface       (page base)
Level 1 → --surface-low   (nav, sidebar)
Level 2 → --surface-base  (panels)
Level 3 → --surface-high  (cards resting)
Level 4 → --surface-highest (cards hover)
Level 5 → --surface-bright  (selected/active)
```

**Ghost border:** `1px solid var(--outline-variant)` at 15% opacity — accessibility anchor only.
**Float shadow:** Only for context menus. `32px blur, 0 spread, 6% opacity, --surface tint`.

---

## Event Hierarchy System

### Event (lowest weight)

```
accent:         --clr-event
border-left:    2px solid var(--clr-event)
padding:        var(--sp-3) var(--sp-4)
title font:     Work Sans 500, var(--text-title)
title color:    var(--ink)
background:     var(--surface-high)
```

### TopicEvent (medium emphasis)

```
accent:         --clr-topic
border-left:    3px solid var(--clr-topic)
padding:        var(--sp-4) var(--sp-5)
title font:     Work Sans 600, var(--text-title-lg)
title color:    var(--ink)
background:     var(--surface-high)
```

### GlobalEvent (highest emphasis)

```
accent:         --clr-global
border-left:    4px solid var(--clr-global)
padding:        var(--sp-5) var(--sp-6)
title font:     Newsreader 700, var(--text-headline)
title color:    var(--ink)
background:     var(--surface-high)
```

---

## Components

### TimelineCard

```
border-radius:      0px — always
border-left:        type-specific accent (see above)
background:         var(--surface-high)
hover background:   var(--surface-highest)
selected bg:        var(--surface-bright)
transition:         200ms ease-out
cursor:             pointer
```

No box shadows. No rounded corners. Ever.

### TagChip

```
border-radius:  0px
font:           var(--text-label), UPPERCASE, letter-spacing: 0.08em
padding:        var(--sp-1) var(--sp-3)
```

Variants:
- `event`: `bg: var(--clr-event-container)`, `color: var(--clr-event)`
- `topic`: `bg: var(--clr-topic-container)`, `color: var(--clr-topic)`
- `global`: `bg: var(--clr-global-container)`, `color: var(--clr-global)`
- `neutral`: `bg: rgba(--outline-variant, 0.2)`, `color: var(--ink-soft)`

### Buttons

```
Primary:   bg: var(--clr-event), color: #3d4145, radius: 0px
Ghost:     border: 1px solid var(--outline), hover bg: var(--surface-bright), radius: 0px
Text:      label-md bold, underline offset 4px color var(--clr-event)
```

### Input (Terminal Style)

```
No box. Bottom border only: 1px solid var(--outline-variant)
Focus:  border-color → var(--clr-event), background glow via surface-bright
```

### MetadataRow

Label (uppercase label) + value pairs. Grid layout. No borders.

### ArticleRow

Source → Title → Timestamp. Hover: `var(--surface-bright)` background.

---

## Layout

```
Page:       Single unified route at /
Split:      40% left (timeline) | 60% right (detail)
Nav:        Veritas wordmark | "Global Intelligence Timeline" | Auth
Topbar bg:  var(--surface-low)
```

---

## Motion Rules

- Duration: `200ms`
- Easing: `ease-out`
- **No bounce, no spring, no fluid** — linear and surgical only
- No animations on page load — data arrives, renders, done

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use 0px radius everywhere | Round any corner |
| Separate via background shifts | Use borders as dividers |
| Use amber sparingly (TopicEvent) | Overuse color |
| Use violet for GlobalEvent authority | Use violet anywhere else |
| Transition 200ms ease-out | Use bouncy/spring animations |
| Use sharp thin iconography | Use rounded icon terminals |
| Primary links in `--clr-event` | Use standard blue for links |
