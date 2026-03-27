<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const githubUrl = 'https://github.com/thinisde';
	const websiteUrl = 'https://thinis.de';
</script>

<svelte:head>
	<title>{m.meta_about_title()}</title>
	<meta name="description" content={m.meta_about_description()} />
	<meta property="og:title" content={m.meta_about_title()} />
	<meta property="og:description" content={m.meta_about_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_about_title()} />
	<meta name="twitter:description" content={m.meta_about_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.meta_site_name()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_about_h1()}
		</h1>

		<p class="mt-6 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			{m.about_intro()}
		</p>

		<dl class="mt-8 space-y-1 text-sm">
			<dt class="font-semibold text-ink dark:text-ink-dark">{m.about_author_label()}</dt>
			<dd class="text-muted-ink dark:text-muted-ink-dark">{m.about_author_name()}</dd>
		</dl>

		<h2 class="mt-10 font-display text-lg font-semibold text-veritas-indigo dark:text-paper-lifted">
			{m.about_links_heading()}
		</h2>
		<ul class="mt-4 space-y-3 text-sm font-medium">
			<li>
				<a
					class="text-veritas-verdigris underline decoration-veritas-verdigris/40 underline-offset-2 hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
					href={githubUrl}
					rel="noopener noreferrer"
					target="_blank"
					aria-label={m.about_github_aria()}>{m.about_github_label()} — {githubUrl}</a
				>
			</li>
			<li>
				<a
					class="text-veritas-verdigris underline decoration-veritas-verdigris/40 underline-offset-2 hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
					href={websiteUrl}
					rel="noopener noreferrer"
					target="_blank"
					aria-label={m.about_website_aria()}>{m.about_website_label()} — {websiteUrl}</a
				>
			</li>
		</ul>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
