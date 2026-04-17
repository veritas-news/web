<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { cn } from '$lib/cn';

	const links = [
		{ href: '/', label: 'Unified' },
		{ href: '/events', label: 'Events' },
		{ href: '/topics', label: 'Topics' },
		{ href: '/global', label: 'Global' },
		{ href: '/articles', label: 'Articles' },
		{ href: '/sources', label: 'Sources' },
		{ href: '/search', label: 'Search' },
		{ href: '/saved', label: 'Saved' },
		{ href: '/pulse', label: 'Pulse' },
		{ href: '/about', label: 'About' }
	] as const;

	let menuOpen = $state(false);

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/' || pathname === '';
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	function closeMenu() {
		menuOpen = false;
	}

	afterNavigate(() => {
		closeMenu();
	});

	$effect(() => {
		if (typeof document === 'undefined') return;
		if (!menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMenu();
		};
		document.addEventListener('keydown', onKey);
		document.documentElement.classList.add('overflow-hidden');
		return () => {
			document.removeEventListener('keydown', onKey);
			document.documentElement.classList.remove('overflow-hidden');
		};
	});
</script>

<header
	class="relative z-30 border-b border-outline-variant/85 bg-surface-low/78 backdrop-blur-md backdrop-saturate-[1.2]"
>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-header-shine opacity-90"
		aria-hidden="true"
	></div>
	<div
		class="flex flex-wrap items-center justify-between gap-sp-6 px-sp-6 pb-sp-4 pt-sp-5"
	>
		<div class="grid min-w-0 max-w-2xl flex-1 gap-sp-3">
			<div class="flex items-center justify-between gap-sp-3">
				<a
					href="/"
					class="inline-flex min-w-0 flex-1 items-center gap-sp-3 rounded-sm text-inherit no-underline opacity-100 transition-opacity duration-veritas ease-veritas hover:bg-transparent hover:opacity-92"
					data-sveltekit-preload-data="hover"
				>
					<span
						class="bg-[linear-gradient(145deg,#ec91ff_0%,#feb300_45%,#c3c7cc_100%)] bg-clip-text text-[1.75rem] leading-none text-transparent drop-shadow-[0_0_12px_rgb(236_145_255/0.25)]"
						aria-hidden="true"
					>◇</span>
					<span class="grid min-w-0 gap-sp-1">
						<span class="font-display text-[2rem] font-bold leading-none tracking-wide text-ink">
							Veritas
						</span>
						<span class="font-display text-base font-normal italic tracking-wide text-ink-soft">
							Intelligence timeline
						</span>
					</span>
				</a>
				<button
					type="button"
					class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-outline-variant/90 bg-surface-high text-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)] transition-[border-color,background,color] duration-veritas hover:border-event/35 hover:bg-event/[0.08] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-event md:hidden"
					aria-expanded={menuOpen}
					aria-controls="site-nav-mobile"
					aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
					onclick={() => (menuOpen = !menuOpen)}
				>
					{#if menuOpen}
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					{:else}
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<nav class="hidden min-w-0 md:block" aria-label="Primary">
			<ul class="m-0 flex list-none flex-wrap items-center justify-end gap-sp-1 p-0">
				{#each links as item (item.href)}
					<li>
						<a
							href={item.href}
							class={cn(
								'block rounded-sm border border-transparent px-sp-2 py-sp-2 font-sans text-label font-semibold uppercase tracking-wide text-ink-soft no-underline transition-[border-color,color,background,box-shadow] duration-veritas-slow ease-veritas-out',
								'hover:border-outline-variant/90 hover:bg-event/[0.07] hover:text-ink hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.03)]',
								isActive(item.href, page.url.pathname) &&
									'border-event/45 bg-[linear-gradient(180deg,rgb(195_199_204/0.12)_0%,rgb(195_199_204/0.04)_100%)] text-event shadow-[0_0_20px_rgb(195_199_204/0.06),inset_0_0_0_1px_rgb(255_255_255/0.04)]'
							)}
							data-sveltekit-preload-data="hover"
							aria-current={isActive(item.href, page.url.pathname) ? 'page' : undefined}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	{#if menuOpen}
		<div
			class="fixed inset-x-0 top-0 z-50 h-[100dvh] md:hidden"
			role="presentation"
		>
			<button
				type="button"
				class="absolute inset-0 h-[100dvh] bg-ink/45 backdrop-blur-[2px]"
				aria-label="Close navigation menu"
				onclick={closeMenu}
			></button>
			<div
				id="site-nav-mobile"
				class="absolute top-0 right-0 flex h-[100dvh] w-[min(100%,20rem)] flex-col border-l border-outline-variant/80 bg-surface-low/95 shadow-[0_0_40px_rgb(0_0_0/0.35)] backdrop-blur-md"
				role="dialog"
				aria-modal="true"
				aria-label="Primary navigation"
			>
				<div class="flex shrink-0 justify-end px-sp-2 pt-[max(0.75rem,env(safe-area-inset-top))] pb-sp-2">
					<button
						type="button"
						class="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-transparent text-ink-soft transition-colors hover:border-outline-variant/90 hover:bg-event/[0.07] hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-event"
						aria-label="Close navigation menu"
						onclick={closeMenu}
					>
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
				<nav
					class="min-h-0 flex-1 overflow-y-auto px-sp-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-sp-1"
					aria-label="Primary mobile"
				>
					<ul class="m-0 flex list-none flex-col gap-sp-1 p-0">
						{#each links as item (item.href)}
							<li>
								<a
									href={item.href}
									class={cn(
										'block rounded-sm border border-transparent px-sp-3 py-sp-3 font-sans text-body font-semibold uppercase tracking-wide text-ink-soft no-underline transition-[border-color,color,background,box-shadow] duration-veritas-slow ease-veritas-out',
										'hover:border-outline-variant/90 hover:bg-event/[0.07] hover:text-ink',
										isActive(item.href, page.url.pathname) &&
											'border-event/45 bg-[linear-gradient(180deg,rgb(195_199_204/0.12)_0%,rgb(195_199_204/0.04)_100%)] text-event shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)]'
									)}
									data-sveltekit-preload-data="hover"
									aria-current={isActive(item.href, page.url.pathname) ? 'page' : undefined}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	{/if}
</header>
