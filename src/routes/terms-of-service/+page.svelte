<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const effective = '2026-03-20';
</script>

<svelte:head>
	<title>{m.meta_terms_title()}</title>
	<meta name="description" content={m.meta_terms_description()} />
	<meta property="og:title" content={m.meta_terms_title()} />
	<meta property="og:description" content={m.meta_terms_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_terms_title()} />
	<meta name="twitter:description" content={m.meta_terms_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.legal_terms_title()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_terms_h1()}
		</h1>
		<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
			{m.legal_terms_effective({ date: effective })}
		</p>

		<div class="mt-8 space-y-4 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			<p>{m.legal_terms_intro()}</p>
			<p>{m.legal_terms_license()}</p>
			<p>{m.legal_terms_content()}</p>
			<p>{m.legal_terms_disclaimer()}</p>
			<p>{m.legal_terms_law()}</p>
			<p>{m.legal_terms_contact()}</p>
		</div>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
