<script lang="ts">
  import { browser } from '$app/environment';
  import { intelligenceDetailPath } from '$lib/utils/intelligenceLinks';
  import { savedItems, toggleSaved } from '$lib/stores/savedItems';
  import type { EventType } from '$lib/types/event';

  interface Props {
    id: string;
    type: EventType;
    title: string;
  }

  let { id, type, title }: Props = $props();

  let copyHint = $state<string | null>(null);
  let copyTimer: ReturnType<typeof setTimeout> | null = null;

  const detailPath = $derived(intelligenceDetailPath(type, id));
  const saved = $derived($savedItems.some((s) => s.id === id && s.type === type));

  function onToggleSave() {
    toggleSaved({ id, type, title });
  }

  async function onCopyLink() {
    if (!browser) return;
    const url = `${window.location.origin}${detailPath}`;
    try {
      await navigator.clipboard.writeText(url);
      if (copyTimer) clearTimeout(copyTimer);
      copyHint = 'Copied';
      copyTimer = setTimeout(() => {
        copyHint = null;
        copyTimer = null;
      }, 2000);
    } catch {
      copyHint = 'Copy blocked';
      copyTimer = setTimeout(() => (copyHint = null), 2500);
    }
  }
</script>

<div class="action-bar" aria-label="Item actions">
  <div class="action-bar-inner">
    <a href={detailPath} class="action primary" data-sveltekit-preload-data="hover">
      <span class="action-label">Full page</span>
      <span class="action-hint">Dedicated layout</span>
    </a>
    <button type="button" class="action" onclick={onCopyLink}>
      <span class="action-label">Copy link</span>
      {#if copyHint}<span class="hint" aria-live="polite">{copyHint}</span>{/if}
    </button>
    <button type="button" class="action save" aria-pressed={saved} onclick={onToggleSave}>
      <span class="action-label">{saved ? 'Saved' : 'Save'}</span>
      <span class="action-hint">{saved ? 'In this browser' : 'Local bookmark'}</span>
    </button>
  </div>
</div>

<style>
  .action-bar {
    position: relative;
    padding-bottom: var(--sp-4);
    margin-bottom: var(--sp-4);
  }

  .action-bar::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in oklab, var(--clr-event) 45%, transparent) 20%,
      color-mix(in oklab, var(--clr-topic) 40%, transparent) 50%,
      transparent
    );
    opacity: 0.7;
    pointer-events: none;
  }

  .action-bar-inner {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    align-items: stretch;
    padding: var(--sp-3);
    border: 1px solid color-mix(in oklab, var(--outline-variant) 75%, transparent);
    background: color-mix(in oklab, var(--surface-low) 85%, transparent);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.03) inset,
      0 16px 48px rgba(0, 0, 0, 0.25);
  }

  .action {
    display: grid;
    gap: 0.15rem;
    align-content: center;
    justify-items: start;
    padding: var(--sp-2) var(--sp-4);
    min-height: 2.75rem;
    border: 1px solid var(--outline-variant);
    background: color-mix(in oklab, var(--surface) 70%, transparent);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition:
      border-color var(--transition-slow),
      color var(--transition-slow),
      background var(--transition-slow),
      transform var(--transition-slow),
      box-shadow var(--transition-slow);
  }

  .action:hover {
    border-color: rgba(195, 199, 204, 0.4);
    color: var(--ink);
    background: var(--surface-high);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .action.primary {
    border-color: rgba(195, 199, 204, 0.35);
    background: linear-gradient(
      165deg,
      color-mix(in oklab, var(--surface-high) 90%, var(--clr-event)) 0%,
      var(--surface-low) 100%
    );
    color: var(--ink);
  }

  .action.primary:hover {
    border-color: var(--clr-event);
    box-shadow: var(--glow-event);
  }

  .action.save[aria-pressed='true'] {
    border-color: rgba(254, 179, 0, 0.45);
    background: rgba(254, 179, 0, 0.08);
    color: var(--clr-topic);
  }

  .action-label {
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .action-hint {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-muted);
    opacity: 0.9;
  }

  .action.primary .action-hint {
    color: var(--ink-soft);
  }

  .hint {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--clr-topic);
  }
</style>
