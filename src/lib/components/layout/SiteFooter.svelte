<script lang="ts">
	const legalLinks = [
		{ href: '/contact', label: 'Contact' },
		{ href: '/support', label: 'Support' },
		{ href: '/privacy-policy', label: 'Privacy' },
		{ href: '/terms-of-service', label: 'Terms' },
		{ href: '/cookie-policy', label: 'Cookies' },
		{ href: '/data-deletion', label: 'Data deletion' },
		{ href: '/eu-product-safety', label: 'EU product safety' }
	] as const;
</script>

<footer
	class="relative z-10 border-t border-outline-variant/80 bg-surface-low/60 px-sp-6 py-sp-6 backdrop-blur-sm"
	aria-label="Legal and support"
>
	<nav>
		<ul
			class="m-0 flex list-none flex-wrap items-center justify-center gap-x-sp-5 gap-y-sp-2 p-0 text-center"
		>
			{#each legalLinks as item (item.href)}
				<li>
					<a
						href={item.href}
						class="font-sans text-label font-semibold tracking-wide text-ink-soft no-underline transition-colors duration-veritas hover:text-ink"
						data-sveltekit-preload-data="hover"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
