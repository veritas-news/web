<script lang="ts">
  interface Props {
    label: string;
    tone?: 'neutral' | 'event' | 'topic' | 'global';
  }

  let { label, tone = 'neutral' }: Props = $props();
</script>

<span class={['badge', tone]}>{label}</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius);
    padding: var(--sp-1) var(--sp-3);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .neutral {
    background: rgba(66, 72, 81, 0.4);
    color: var(--ink-soft);
  }

  .event {
    background: var(--clr-event-container);
    color: var(--clr-event);
  }

  .topic {
    background: var(--clr-topic-container);
    color: var(--clr-topic);
  }

  .global {
    background: var(--clr-global-container);
    color: var(--clr-global);
  }
</style>
