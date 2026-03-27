<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const mail = `mailto:${m.legal_support_email_value()}?subject=${encodeURIComponent(m.meta_support_title())}`;
</script>

<svelte:head>
	<title>{m.meta_support_title()}</title>
	<meta name="description" content={m.meta_support_description()} />
	<meta property="og:title" content={m.meta_support_title()} />
	<meta property="og:description" content={m.meta_support_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_support_title()} />
	<meta name="twitter:description" content={m.meta_support_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.legal_support_title()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_support_h1()}
		</h1>

		<p class="mt-6 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			{m.legal_support_intro()}
		</p>

		<dl class="mt-8 space-y-2 text-sm">
			<dt class="font-semibold text-ink dark:text-ink-dark">{m.legal_support_email_label()}</dt>
			<dd>
				<a
					class="text-veritas-verdigris underline hover:text-veritas-indigo dark:text-veritas-yellowGreen"
					href={mail}>{m.legal_support_email_value()}</a
				>
			</dd>
		</dl>

		<p class="mt-6 text-sm text-muted-ink dark:text-muted-ink-dark">{m.legal_support_hours()}</p>

		<p class="mt-8">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen"
				href="{localizeHref('/')}#faq-heading">{m.legal_support_faq_link()}</a
			>
		</p>

		<p class="mt-6">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
