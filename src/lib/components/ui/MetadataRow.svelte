<script lang="ts">
  interface Props {
    label: string;
    value: string | number;
    mono?: boolean;
  }

  let { label, value, mono = false }: Props = $props();
</script>

<div class="meta-row">
  <span class="meta-label">{label}</span>
  <span class={['meta-value', { mono }]}>{value}</span>
</div>

<style>
  .meta-row {
    display: grid;
    gap: var(--sp-1);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface-high);
  }

  .meta-label {
    color: var(--ink-muted);
    font-family: var(--font-sans);
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .meta-value {
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    font-weight: 500;
    line-height: 1.4;
  }

  .meta-value.mono {
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
</style>
