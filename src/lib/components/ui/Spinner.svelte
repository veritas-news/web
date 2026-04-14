<script lang="ts">
  interface Props {
    size?: 'sm' | 'md';
  }

  let { size = 'md' }: Props = $props();
</script>

<span class={['spinner', size]} aria-hidden="true"></span>

<style>
  .spinner {
    display: inline-block;
    border: 1.5px solid rgba(160, 167, 181, 0.2);
    border-top-color: var(--clr-event);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .sm {
    width: 0.85rem;
    height: 0.85rem;
  }

  .md {
    width: 1.1rem;
    height: 1.1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
