<svelte:head>
  <title>About — Veritas</title>
  <meta
    name="description"
    content="Veritas intelligence timeline: events, regional topics, and global arcs from multi-source coverage."
  />
</svelte:head>

<div class="about">
  <header>
    <p class="eyebrow">Product</p>
    <h1>About Veritas</h1>
  </header>

  <div class="prose">
    <p>
      Veritas aggregates open-source coverage into a three-level hierarchy: short-lived <strong>events</strong>,
      regional <strong>topics</strong>, and long-horizon <strong>global</strong> arcs. The unified timeline mixes all
      three with backend-defined ordering—clients should not merge feeds manually.
    </p>
    <p>
      Data comes from the Veritas REST API (<code>/v1</code>). Search hits events and articles. The Pulse dashboard
      pulls optional third-party JSON for a quick connectivity check.
    </p>
  </div>
</div>

<style>
  .about {
    max-width: 42rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-5);
  }

  .eyebrow {
    margin: 0;
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  h1 {
    margin: var(--sp-1) 0 0;
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .prose {
    display: grid;
    gap: var(--sp-4);
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .prose p {
    margin: 0;
  }

  .prose strong {
    color: var(--ink);
    font-weight: 600;
  }

  .prose code {
    font-size: 0.9em;
    color: var(--clr-event);
  }
</style>
