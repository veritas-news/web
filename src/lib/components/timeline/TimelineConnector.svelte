<script lang="ts">
  import type { EventType } from '$lib/types/event';

  interface Props {
    type?: EventType;
    terminal?: boolean;
  }

  let { type = 'event', terminal = false }: Props = $props();
</script>

<span class="connector" aria-hidden="true">
  <span class={['dot', type]}></span>
  {#if !terminal}
    <span class="line"></span>
  {/if}
</span>

<style>
  .connector {
    display: grid;
    justify-items: center;
    align-self: stretch;
    width: 1.1rem;
    padding-top: var(--sp-4);
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    flex-shrink: 0;
  }

  .dot.event {
    background: var(--clr-event);
  }

  .dot.topic_event {
    width: 0.65rem;
    height: 0.65rem;
    background: var(--clr-topic);
  }

  .dot.global_event {
    width: 0.8rem;
    height: 0.8rem;
    background: var(--clr-global);
  }

  .line {
    width: 2px;
    flex: 1;
    min-height: 1.5rem;
    margin-top: var(--sp-2);
    border-radius: 1px;
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--clr-event) 55%, var(--outline-variant)) 0%,
      var(--outline-variant) 45%,
      color-mix(in oklab, var(--outline-variant) 40%, transparent) 100%
    );
  }

  .dot.topic_event ~ .line {
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--clr-topic) 50%, var(--outline-variant)) 0%,
      var(--outline-variant) 50%,
      transparent 100%
    );
  }

  .dot.global_event ~ .line {
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--clr-global) 50%, var(--outline-variant)) 0%,
      var(--outline-variant) 50%,
      transparent 100%
    );
  }
</style>
