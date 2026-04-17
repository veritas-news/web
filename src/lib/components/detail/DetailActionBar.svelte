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
  <a href={detailPath} class="action primary" data-sveltekit-preload-data="hover">Full page</a>
  <button type="button" class="action" onclick={onCopyLink}>
    Copy link{#if copyHint}<span class="hint" aria-live="polite"> — {copyHint}</span>{/if}
  </button>
  <button type="button" class="action" aria-pressed={saved} onclick={onToggleSave}>
    {saved ? 'Saved' : 'Save'}
  </button>
</div>

<style>
  .action-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    align-items: center;
    padding-bottom: var(--sp-4);
    margin-bottom: var(--sp-4);
    border-bottom: 1px solid var(--outline-variant);
  }

  .action {
    display: inline-flex;
    align-items: center;
    padding: var(--sp-2) var(--sp-3);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
    color: var(--ink-soft);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition:
      border-color var(--transition),
      color var(--transition),
      background var(--transition);
  }

  .action:hover {
    border-color: var(--clr-event);
    color: var(--ink);
    background: var(--surface-high);
  }

  .action.primary {
    border-color: rgba(195, 199, 204, 0.35);
    color: var(--ink);
  }

  .hint {
    font-weight: 600;
    color: var(--clr-topic);
    text-transform: none;
    letter-spacing: 0;
  }
</style>
