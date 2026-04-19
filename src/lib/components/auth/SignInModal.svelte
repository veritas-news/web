<script lang="ts">
	import type { Action } from 'svelte/action';
	import { authState } from '$lib/identity/auth-state.svelte';
	import { cn } from '$lib/cn';

	/** Move overlay to `document.body` so `position:fixed` is viewport-relative (header `backdrop-filter` otherwise creates a containing block). */
	const portalToBody: Action<HTMLElement> = (node) => {
		if (typeof document === 'undefined') {
			return { destroy() {} };
		}
		document.body.appendChild(node);
		return {
			destroy() {
				node.parentNode?.removeChild(node);
			}
		};
	};

	let { open = $bindable(false) }: { open: boolean } = $props();

	let mode: 'signin' | 'signup' = $state('signin');
	let email = $state('');
	let password = $state('');
	let busy = $state(false);
	let localError = $state('');

	async function handleEmailSubmit() {
		busy = true;
		localError = '';
		try {
			if (mode === 'signin') {
				await authState.signInWithEmail(email, password);
			} else {
				await authState.signUpWithEmail(email, password);
			}
			open = false;
		} catch (e) {
			localError = e instanceof Error ? e.message : 'Authentication failed';
		} finally {
			busy = false;
		}
	}

	async function handleGoogle() {
		busy = true;
		localError = '';
		try {
			await authState.signInWithGoogle();
			open = false;
		} catch (e) {
			localError = e instanceof Error ? e.message : 'Google sign in failed';
		} finally {
			busy = false;
		}
	}

	async function handleApple() {
		busy = true;
		localError = '';
		try {
			await authState.signInWithApple();
			open = false;
		} catch (e) {
			localError = e instanceof Error ? e.message : 'Apple sign in failed';
		} finally {
			busy = false;
		}
	}

	function close() {
		open = false;
	}
</script>

{#if open}
	<div
		use:portalToBody
		class="fixed inset-0 z-[200] flex items-center justify-center"
		role="presentation"
	>
		<button
			type="button"
			class="absolute inset-0 bg-ink/50 backdrop-blur-sm"
			aria-label="Close"
			onclick={close}
		></button>

		<div
			class="relative z-10 mx-4 w-full max-w-sm rounded-lg border border-outline-variant/80 bg-surface-low p-6 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-label={mode === 'signin' ? 'Sign in' : 'Create account'}
		>
			<button
				type="button"
				class="absolute top-3 right-3 text-ink-soft hover:text-ink"
				aria-label="Close"
				onclick={close}
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<h2 class="mb-4 font-display text-xl font-bold text-ink">
				{mode === 'signin' ? 'Sign In' : 'Create Account'}
			</h2>

			{#if localError || authState.error}
				<div class="mb-3 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
					{localError || authState.error}
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); handleEmailSubmit(); }} class="grid gap-3">
				<input
					type="email"
					bind:value={email}
					placeholder="Email"
					required
					class="w-full rounded border border-outline-variant/80 bg-surface-high px-3 py-2 text-ink placeholder:text-ink-soft/60 focus:border-event focus:outline-none"
				/>
				<input
					type="password"
					bind:value={password}
					placeholder="Password"
					required
					minlength="6"
					class="w-full rounded border border-outline-variant/80 bg-surface-high px-3 py-2 text-ink placeholder:text-ink-soft/60 focus:border-event focus:outline-none"
				/>
				<button
					type="submit"
					disabled={busy}
					class={cn(
						'w-full rounded bg-event px-4 py-2 font-semibold text-ink transition-opacity',
						busy ? 'cursor-not-allowed opacity-60' : 'hover:opacity-90'
					)}
				>
					{busy ? '...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
				</button>
			</form>

			<div class="my-4 flex items-center gap-3">
				<span class="h-px flex-1 bg-outline-variant/60"></span>
				<span class="text-xs uppercase tracking-wide text-ink-soft">or</span>
				<span class="h-px flex-1 bg-outline-variant/60"></span>
			</div>

			<div class="grid gap-2">
				<button
					type="button"
					disabled={busy}
					onclick={handleGoogle}
					class="flex w-full items-center justify-center gap-2 rounded border border-outline-variant/80 bg-surface-high px-4 py-2 font-medium text-ink transition-colors hover:bg-event/10"
				>
					<svg class="h-5 w-5" viewBox="0 0 48 48">
						<path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
						<path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
						<path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
						<path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
					</svg>
					Continue with Google
				</button>
				<button
					type="button"
					disabled={busy}
					onclick={handleApple}
					class="flex w-full items-center justify-center gap-2 rounded border border-outline-variant/80 bg-surface-high px-4 py-2 font-medium text-ink transition-colors hover:bg-event/10"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
					</svg>
					Continue with Apple
				</button>
			</div>

			<p class="mt-4 text-center text-sm text-ink-soft">
				{#if mode === 'signin'}
					No account? <button type="button" class="text-event hover:underline" onclick={() => (mode = 'signup')}>Create one</button>
				{:else}
					Have an account? <button type="button" class="text-event hover:underline" onclick={() => (mode = 'signin')}>Sign in</button>
				{/if}
			</p>
		</div>
	</div>
{/if}
