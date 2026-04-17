<script lang="ts">
	import { page } from '$app/state';

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

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/' || pathname === '';
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header class="site-header">
	<div class="header-sheen" aria-hidden="true"></div>
	<div class="header-inner">
		<div class="brand">
			<a href="/" class="brand-link" data-sveltekit-preload-data="hover">
				<span class="brand-mark" aria-hidden="true">◇</span>
				<span class="brand-text">
					<span class="brand-name">Veritas</span>
					<span class="brand-tagline">Intelligence timeline</span>
				</span>
			</a>
			<p class="brand-dek">
				Event → topic → global hierarchy, analyst-ranked. <em>One feed, server-composed.</em>
			</p>
		</div>

		<nav class="nav" aria-label="Primary">
			<p class="nav-label">Navigate</p>
			<ul class="nav-list">
				{#each links as item (item.href)}
					<li>
						<a
							href={item.href}
							class={['nav-link', isActive(item.href, page.url.pathname) ? 'active' : '']}
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
</header>

<style>
	.site-header {
		position: relative;
		border-bottom: 1px solid color-mix(in oklab, var(--outline-variant) 85%, transparent);
		background: color-mix(in oklab, var(--surface-low) 78%, transparent);
		backdrop-filter: blur(12px) saturate(1.2);
	}

	.header-sheen {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--header-shine);
		opacity: 0.9;
		pointer-events: none;
	}

	.header-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--sp-6);
		padding: var(--sp-5) var(--sp-6) var(--sp-4);
	}

	.brand {
		display: grid;
		gap: var(--sp-3);
		min-width: 0;
		max-width: 36rem;
	}

	.brand-link {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--sp-3);
		text-decoration: none;
		color: inherit;
		border-radius: 2px;
		transition: opacity var(--transition);
	}

	.brand-link:hover {
		background: transparent;
		opacity: 0.92;
	}

	.brand-mark {
		font-size: 1.75rem;
		line-height: 1;
		background: linear-gradient(
			145deg,
			var(--clr-global) 0%,
			var(--clr-topic) 45%,
			var(--clr-event) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0 0 12px rgba(236, 145, 255, 0.25));
	}

	.brand-text {
		display: grid;
		gap: var(--sp-1);
	}

	.brand-name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 2rem;
		letter-spacing: 0.03em;
		line-height: 1;
		color: var(--ink);
	}

	.brand-tagline {
		font-family: var(--font-display);
		font-size: 1rem;
		font-style: italic;
		font-weight: 400;
		color: var(--ink-soft);
		letter-spacing: 0.02em;
	}

	.brand-dek {
		margin: 0;
		font-size: var(--text-body);
		line-height: 1.55;
		color: var(--ink-muted);
		max-width: 52ch;
	}

	.brand-dek em {
		font-family: var(--font-display);
		font-style: italic;
		color: var(--clr-topic-dim);
	}

	.nav {
		min-width: 0;
		display: grid;
		gap: var(--sp-2);
		justify-items: end;
	}

	.nav-label {
		margin: 0;
		width: 100%;
		text-align: right;
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-muted);
		opacity: 0.85;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-1);
		list-style: none;
		margin: 0;
		padding: 0;
		justify-content: flex-end;
	}

	.nav-link {
		display: block;
		padding: var(--sp-2) var(--sp-3);
		border: 1px solid transparent;
		border-radius: 2px;
		color: var(--ink-soft);
		font-family: var(--font-sans);
		font-size: var(--text-label);
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		text-decoration: none;
		transition:
			border-color var(--transition-slow),
			color var(--transition-slow),
			background var(--transition-slow),
			box-shadow var(--transition-slow);
	}

	.nav-link:hover {
		color: var(--ink);
		border-color: color-mix(in oklab, var(--outline-variant) 90%, var(--clr-event));
		background: rgba(195, 199, 204, 0.07);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
	}

	.nav-link.active {
		color: var(--clr-event);
		border-color: rgba(195, 199, 204, 0.45);
		background: linear-gradient(
			180deg,
			rgba(195, 199, 204, 0.12) 0%,
			rgba(195, 199, 204, 0.04) 100%
		);
		box-shadow:
			0 0 20px rgba(195, 199, 204, 0.06),
			0 0 0 1px rgba(255, 255, 255, 0.04) inset;
	}
</style>
