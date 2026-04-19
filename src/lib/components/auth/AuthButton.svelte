<script lang="ts">
	import { authState } from '$lib/identity/auth-state.svelte';
	import SignInModal from './SignInModal.svelte';

	let modalOpen = $state(false);
</script>

{#if authState.loading}
	<!-- loading -->
{:else if authState.isAuthenticated}
	<div class="flex items-center gap-2">
		<span class="max-w-[10rem] truncate text-sm text-ink-soft">{authState.displayEmail}</span>
		<button
			type="button"
			class="rounded border border-outline-variant/80 px-2 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-event/40 hover:text-ink"
			onclick={() => authState.signOut()}
		>
			Sign Out
		</button>
	</div>
{:else}
	<button
		type="button"
		class="rounded border border-outline-variant/80 px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:border-event/40 hover:text-ink"
		onclick={() => (modalOpen = true)}
	>
		Sign In
	</button>
{/if}

<SignInModal bind:open={modalOpen} />
