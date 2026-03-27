<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const effective = '2026-03-20';
</script>

<svelte:head>
	<title>{m.meta_privacy_title()}</title>
	<meta name="description" content={m.meta_privacy_description()} />
	<meta property="og:title" content={m.meta_privacy_title()} />
	<meta property="og:description" content={m.meta_privacy_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_privacy_title()} />
	<meta name="twitter:description" content={m.meta_privacy_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.legal_privacy_title()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_privacy_h1()}
		</h1>
		<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
			{m.legal_privacy_effective({ date: effective })}
		</p>

		<div class="mt-8 space-y-4 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			<p>{m.legal_privacy_intro()}</p>
			<p>{m.legal_privacy_controller()}</p>
			<p>{m.legal_privacy_data_collect()}</p>
			<p>{m.legal_privacy_purposes()}</p>
			<p>{m.legal_privacy_legal_basis()}</p>
			<p>{m.legal_privacy_sharing()}</p>
			<p>{m.legal_privacy_retention()}</p>
			<p>{m.legal_privacy_transfers()}</p>
			<p>{m.legal_privacy_rights()}</p>
			<p>{m.legal_privacy_children()}</p>
			<p>{m.legal_privacy_updates()}</p>
		</div>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
