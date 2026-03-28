<script lang="ts">
	import { localizeHref } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages.js";

	const updated = "2026-03-28";
	const supportEmail = m.legal_support_email_value();
	const mail = `mailto:${supportEmail}?subject=${encodeURIComponent(m.meta_eu_safety_title())}`;
</script>

<svelte:head>
	<title>{m.meta_eu_safety_title()}</title>
	<meta name="description" content={m.meta_eu_safety_description()} />
	<meta property="og:title" content={m.meta_eu_safety_title()} />
	<meta property="og:description" content={m.meta_eu_safety_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_eu_safety_title()} />
	<meta name="twitter:description" content={m.meta_eu_safety_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p
			class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen"
		>
			{m.legal_eu_safety_title()}
		</p>
		<h1
			class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark"
		>
			{m.page_eu_safety_h1()}
		</h1>
		<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
			{m.legal_eu_safety_updated({ date: updated })}
		</p>

		<p
			class="mt-6 max-w-3xl text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
		>
			{m.legal_eu_safety_intro()}
		</p>

		<dl class="mt-8 border-y border-line/80 dark:border-line-dark/80">
			<div class="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
				<dt class="font-semibold text-ink dark:text-ink-dark">
					{m.legal_eu_safety_product_label()}
				</dt>
				<dd
					class="text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
				>
					{m.legal_eu_safety_product_value()}
				</dd>
			</div>
			<div
				class="grid gap-2 border-t border-line/80 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4 dark:border-line-dark/80"
			>
				<dt class="font-semibold text-ink dark:text-ink-dark">
					{m.legal_eu_safety_distribution_label()}
				</dt>
				<dd
					class="text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
				>
					{m.legal_eu_safety_distribution_value()}
				</dd>
			</div>
			<div
				class="grid gap-2 border-t border-line/80 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4 dark:border-line-dark/80"
			>
				<dt class="font-semibold text-ink dark:text-ink-dark">
					{m.legal_eu_safety_markings_label()}
				</dt>
				<dd
					class="text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
				>
					{m.legal_eu_safety_markings_value()}
				</dd>
			</div>
			<div
				class="grid gap-2 border-t border-line/80 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4 dark:border-line-dark/80"
			>
				<dt class="font-semibold text-ink dark:text-ink-dark">
					{m.legal_eu_safety_device_label()}
				</dt>
				<dd
					class="text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
				>
					{m.legal_eu_safety_device_value()}
				</dd>
			</div>
			<div
				class="grid gap-2 border-t border-line/80 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4 dark:border-line-dark/80"
			>
				<dt class="font-semibold text-ink dark:text-ink-dark">
					{m.legal_eu_safety_contact_label()}
				</dt>
				<dd>
					<a
						class="text-sm font-medium text-veritas-verdigris underline decoration-veritas-verdigris/40 underline-offset-2 hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
						href={mail}>{supportEmail}</a
					>
				</dd>
			</div>
		</dl>

		<p
			class="mt-6 max-w-3xl text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark"
		>
			{m.legal_eu_safety_note()}
		</p>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref("/")}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
