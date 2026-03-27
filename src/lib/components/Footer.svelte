<script lang="ts">
	import { page } from '$app/state';
	import { localizeHref, locales } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	const year = new Date().getFullYear();
</script>

<footer
	class="border-t border-line/90 bg-paper dark:border-line-dark/90 dark:bg-paper-dark"
	aria-labelledby="footer-heading"
>
	<h2 id="footer-heading" class="sr-only">{m.footer_tagline()}</h2>
	<div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			<div class="space-y-3">
				<p
					class="font-display text-title-sm font-semibold text-veritas-indigo dark:text-veritas-yellowGreen"
				>
					{m.meta_site_name()}
				</p>
				<p class="text-sm text-muted-ink dark:text-muted-ink-dark">{m.footer_tagline()}</p>
				<p class="text-xs text-muted-ink dark:text-muted-ink-dark">{m.footer_legal_note()}</p>
			</div>

			<div>
				<p class="font-rounded text-eyebrow text-veritas-verdigris">{m.footer_support()}</p>
				<ul class="mt-3 space-y-2 text-sm font-medium text-ink dark:text-ink-dark">
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/privacy-policy')}
							>{m.footer_privacy()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/terms-of-service')}
							>{m.footer_terms()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/cookie-policy')}
							>{m.footer_cookie()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/data-deletion')}
							>{m.footer_deletion()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/support')}
							>{m.footer_support()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/contact')}
							>{m.footer_contact()}</a
						>
					</li>
					<li>
						<a class="hover:text-veritas-flame" href={localizeHref('/about')}>{m.footer_about()}</a>
					</li>
				</ul>
			</div>

			<div>
				<p class="font-rounded text-eyebrow text-veritas-verdigris">{m.footer_tagline()}</p>
				<div class="mt-3 flex gap-3">
					<a
						class="rounded-panel-sm border border-line/90 p-2 text-ink hover:border-veritas-verdigris dark:border-line-dark/90 dark:text-ink-dark"
						href="https://github.com/thinisde"
						rel="noopener noreferrer"
						target="_blank"
						aria-label={m.footer_github_aria()}
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
							/>
						</svg>
					</a>
					<a
						class="rounded-panel-sm border border-line/90 p-2 text-ink hover:border-veritas-verdigris dark:border-line-dark/90 dark:text-ink-dark"
						href="https://x.com/veritas"
						rel="noopener noreferrer"
						target="_blank"
						aria-label={m.footer_x_aria()}
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M18.244 3H21l-6.5 7.6L22 21h-5.5l-4.3-5.6L6.5 21H3.8l6.95-8.1L2 3h5.6l3.9 5.1L18.244 3Zm-1.9 16h1.7L7.9 5h-1.8l10.24 14Z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<p class="mt-10 text-center text-xs text-muted-ink sm:text-left dark:text-muted-ink-dark">
			{m.footer_copyright({ year })}
		</p>

		<div class="sr-only" aria-label={m.footer_locale_links()}>
			{#each locales as locale (locale)}
				<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
			{/each}
		</div>
	</div>
</footer>
