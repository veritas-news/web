<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Unified' },
		{ href: '/events', label: 'Events' },
		{ href: '/topics', label: 'Topics' },
		{ href: '/global', label: 'Global' },
		{ href: '/articles', label: 'Articles' },
		{ href: '/search', label: 'Search' },
		{ href: '/pulse', label: 'Pulse' },
		{ href: '/about', label: 'About' }
	] as const;

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/' || pathname === '';
		return pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<header class="site-header">
	<div class="brand">
		<a href="/" class="brand-link" data-sveltekit-preload-data="hover">
			<span class="brand-mark" aria-hidden="true">◇</span>
			<span class="brand-name">Veritas</span>
		</a>
		<p class="brand-tag">Intelligence timeline</p>
	</div>

	<nav class="nav" aria-label="Primary">
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
</header>

<style>
	.site-header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--sp-4);
		padding: var(--sp-4) var(--sp-6);
		border-bottom: 1px solid var(--outline-variant);
		background: color-mix(in oklab, var(--surface-low) 88%, transparent);
		backdrop-filter: blur(8px);
	}

	.brand {
		display: grid;
		gap: var(--sp-1);
		min-width: 0;
	}

	.brand-link {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-2);
		color: var(--ink);
		font-family: var(--font-serif);
		font-weight: 600;
		font-size: var(--text-headline);
		text-decoration: none;
		border-radius: 2px;
	}

	.brand-link:hover {
		background: transparent;
		color: var(--clr-event);
	}

	.brand-mark {
		font-size: 1.1em;
		color: var(--clr-global);
	}

	.brand-name {
		letter-spacing: 0.02em;
	}

	.brand-tag {
		margin: 0;
		padding-left: 1.85rem;
		font-size: var(--text-label);
		color: var(--ink-muted);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.nav {
		min-width: 0;
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
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		transition:
			border-color var(--transition),
			color var(--transition),
			background var(--transition);
	}

	.nav-link:hover {
		color: var(--ink);
		border-color: var(--outline-variant);
		background: rgba(195, 199, 204, 0.06);
	}

	.nav-link.active {
		color: var(--clr-event);
		border-color: rgba(195, 199, 204, 0.35);
		background: rgba(195, 199, 204, 0.08);
	}
</style>
