<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.meta_cookie_title()}</title>
	<meta name="description" content={m.meta_cookie_description()} />
	<meta property="og:title" content={m.meta_cookie_title()} />
	<meta property="og:description" content={m.meta_cookie_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_cookie_title()} />
	<meta name="twitter:description" content={m.meta_cookie_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.legal_cookie_title()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_cookie_h1()}
		</h1>

		<p class="mt-6 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			{m.legal_cookie_intro()}
		</p>

		<div class="mt-8 overflow-x-auto">
			<table
				class="w-full min-w-[36rem] border-collapse text-left text-sm text-ink dark:text-ink-dark"
			>
				<thead>
					<tr class="border-b border-line/90 dark:border-line-dark/90">
						<th class="py-3 pr-4 font-semibold">{m.legal_cookie_table_category()}</th>
						<th class="py-3 pr-4 font-semibold">{m.legal_cookie_table_name()}</th>
						<th class="py-3 pr-4 font-semibold">{m.legal_cookie_table_purpose()}</th>
						<th class="py-3 font-semibold">{m.legal_cookie_table_lifespan()}</th>
					</tr>
				</thead>
				<tbody class="text-muted-ink dark:text-muted-ink-dark">
					<tr class="border-b border-line/70 dark:border-line-dark/70">
						<td class="py-3 pr-4 font-medium text-ink dark:text-ink-dark">
							{m.legal_cookie_row_necessary_cat()}
						</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_necessary_name()}</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_necessary_purpose()}</td>
						<td class="py-3">{m.legal_cookie_row_necessary_lifespan()}</td>
					</tr>
					<tr class="border-b border-line/70 dark:border-line-dark/70">
						<td class="py-3 pr-4 font-medium text-ink dark:text-ink-dark">
							{m.legal_cookie_row_prefs_cat()}
						</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_prefs_name()}</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_prefs_purpose()}</td>
						<td class="py-3">{m.legal_cookie_row_prefs_lifespan()}</td>
					</tr>
					<tr>
						<td class="py-3 pr-4 font-medium text-ink dark:text-ink-dark">
							{m.legal_cookie_row_analytics_cat()}
						</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_analytics_name()}</td>
						<td class="py-3 pr-4">{m.legal_cookie_row_analytics_purpose()}</td>
						<td class="py-3">{m.legal_cookie_row_analytics_lifespan()}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="mt-8 text-sm text-muted-ink dark:text-muted-ink-dark">{m.legal_cookie_optout()}</p>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
