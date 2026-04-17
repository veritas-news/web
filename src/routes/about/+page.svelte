<svelte:head>
  <title>About — Veritas</title>
  <meta
    name="description"
    content="Veritas intelligence timeline: events, regional topics, and global arcs from multi-source coverage."
  />
</svelte:head>

<div class="about">
  <header class="hero">
    <p class="eyebrow">Product</p>
    <h1 class="title">About Veritas</h1>
    <p class="lede">
      A read-only analyst console for a <strong>three-level intelligence model</strong>—from discrete incidents to
      arcs that belong in briefings. Built for clarity, not clutter.
    </p>
  </header>

  <section class="tiers" aria-label="Hierarchy">
    <article class="tier tier-event">
      <h2>Level 1 — Events</h2>
      <p>
        Short-lived signals with cluster size and source thresholds. Ideal for “what broke in the last news cycle?” </p>
    </article>
    <article class="tier tier-topic">
      <h2>Level 2 — Topics</h2>
      <p>Regional or thematic threads across days or weeks. Density and relevance-gap hints show narrative pressure.</p>
    </article>
    <article class="tier tier-global">
      <h2>Level 3 — Global</h2>
      <p>
        Cross-border arcs spanning longer windows. Impact and conviction summarize how analysts weight the story.
      </p>
    </article>
  </section>

  <div class="prose">
    <p>
      The <strong>unified timeline</strong> interleaves all three levels in a single server-ranked stream—never merge
      or re-sort client-side; ordering is part of the contract.
    </p>
    <p>
      All data flows from the Veritas REST API under <code>/v1</code>: timelines, detail payloads with embedded
      articles, full-text search, article catalog, and crawler <strong>sources</strong>. Pulse adds optional
      third-party JSON checks (weather, APOD, API clock).
    </p>
    <p>
      <strong>Saved</strong> items live in your browser only—use them as a lightweight reading list while you triage
      a noisy day.
    </p>
  </div>
</div>

<style>
  .about {
    max-width: 52rem;
    margin: 0 auto;
    padding: var(--sp-8) var(--sp-6) var(--sp-12);
    display: grid;
    gap: var(--sp-8);
  }

  .hero {
    display: grid;
    gap: var(--sp-3);
    padding-bottom: var(--sp-6);
    border-bottom: 1px solid color-mix(in oklab, var(--outline-variant) 80%, transparent);
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    max-height: 6rem;
    background: var(--header-shine);
    opacity: 0.5;
    pointer-events: none;
  }

  .eyebrow {
    margin: 0;
    padding-left: var(--sp-4);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  .title {
    margin: 0;
    padding-left: var(--sp-4);
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, var(--text-display));
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.1;
  }

  .lede {
    margin: 0;
    padding-left: var(--sp-4);
    max-width: 48ch;
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-style: italic;
    line-height: 1.5;
    color: var(--ink-soft);
  }

  .lede strong {
    font-style: normal;
    font-weight: 600;
    color: var(--ink);
  }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-3);
  }

  @media (max-width: 900px) {
    .tiers {
      grid-template-columns: 1fr;
    }
  }

  .tier {
    padding: var(--sp-5);
    border: 1px solid var(--outline-variant);
    background: color-mix(in oklab, var(--surface-low) 88%, transparent);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    display: grid;
    gap: var(--sp-3);
    transition:
      border-color var(--transition-slow),
      box-shadow var(--transition-slow);
  }

  .tier:hover {
    border-color: color-mix(in oklab, var(--outline-variant) 50%, var(--clr-event));
  }

  .tier h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 700;
  }

  .tier p {
    margin: 0;
    font-size: var(--text-body);
    line-height: 1.6;
    color: var(--ink-soft);
  }

  .tier-event {
    border-left: 3px solid var(--clr-event);
  }
  .tier-topic {
    border-left: 3px solid var(--clr-topic);
  }
  .tier-global {
    border-left: 3px solid var(--clr-global);
  }

  .prose {
    display: grid;
    gap: var(--sp-4);
    line-height: 1.75;
    color: var(--ink-soft);
    font-size: 1rem;
  }

  .prose p {
    margin: 0;
  }

  .prose strong {
    color: var(--ink);
    font-weight: 600;
  }

  .prose code {
    font-size: 0.88em;
    color: var(--clr-event);
    padding: 0.1em 0.35em;
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
  }
</style>
