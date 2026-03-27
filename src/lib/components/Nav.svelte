<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header
	class="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md dark:border-line-dark/80 dark:bg-paper-dark/85"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
		<a
			class="font-display text-title-sm font-semibold tracking-tight text-veritas-indigo dark:text-veritas-yellowGreen"
			href={localizeHref('/')}
			aria-label={m.nav_brand_aria()}>{m.meta_site_name()}</a
		>

		<button
			type="button"
			class="inline-flex items-center justify-center rounded-panel-sm border border-line/90 bg-paper-lifted p-2 font-rounded text-ink md:hidden dark:border-line-dark/90 dark:bg-paper-lifted-dark dark:text-ink-dark"
			aria-expanded={menuOpen}
			aria-controls="primary-nav"
			aria-label={menuOpen ? m.nav_menu_close() : m.nav_menu_open()}
			onclick={toggleMenu}
		>
			{#if menuOpen}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			{:else}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M4 7h16M4 12h16M4 17h16"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			{/if}
		</button>

		<nav
			id="primary-nav"
			class="hidden items-center gap-6 font-rounded text-sm font-semibold text-muted-ink md:flex dark:text-muted-ink-dark"
			aria-label={m.nav_primary_aria()}
		>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/')}>{m.nav_home()}</a
			>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/privacy-policy')}>{m.nav_privacy()}</a
			>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/terms-of-service')}>{m.nav_terms()}</a
			>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/support')}>{m.nav_support()}</a
			>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/contact')}>{m.nav_contact()}</a
			>
			<a
				class="hover:text-veritas-verdigris dark:hover:text-veritas-yellowGreen"
				href={localizeHref('/about')}>{m.nav_about()}</a
			>
			<LanguageSwitcher />
		</nav>
	</div>

	{#if menuOpen}
		<div
			class="border-t border-line/80 bg-paper px-4 py-4 md:hidden dark:border-line-dark/80 dark:bg-paper-dark"
		>
			<div class="flex flex-col gap-3 text-sm font-semibold text-ink dark:text-ink-dark">
				<a class="py-1" href={localizeHref('/')} onclick={closeMenu}>{m.nav_home()}</a>
				<a class="py-1" href={localizeHref('/privacy-policy')} onclick={closeMenu}
					>{m.nav_privacy()}</a
				>
				<a class="py-1" href={localizeHref('/terms-of-service')} onclick={closeMenu}
					>{m.nav_terms()}</a
				>
				<a class="py-1" href={localizeHref('/support')} onclick={closeMenu}>{m.nav_support()}</a>
				<a class="py-1" href={localizeHref('/contact')} onclick={closeMenu}>{m.nav_contact()}</a>
				<a class="py-1" href={localizeHref('/about')} onclick={closeMenu}>{m.nav_about()}</a>
				<LanguageSwitcher />
			</div>
		</div>
	{/if}
</header>
