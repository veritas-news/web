<script lang="ts">
	import AppBadges from '$lib/components/AppBadges.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import ScreenshotScroller from '$lib/components/ScreenshotScroller.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	/** All image files under /static (png, jpg, webp, gif, svg), sorted by path. */
	const screenshotItems = $derived(
		data.screenshots.map((s) => ({
			src: s.src,
			alt: m.screenshots_alt_filename({ filename: s.basename })
		}))
	);

	const ldJson = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'MobileApplication',
			name: m.schema_app_name(),
			description: m.schema_app_description(),
			applicationCategory: `https://schema.org/${m.schema_app_category()}`,
			operatingSystem: 'iOS, Android',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			image: m.meta_og_image()
		}).replaceAll('<', '\\u003c')
	);
</script>

<svelte:head>
	<title>{m.meta_home_title()}</title>
	<meta name="description" content={m.meta_home_description()} />
	<meta property="og:title" content={m.meta_home_title()} />
	<meta property="og:description" content={m.meta_home_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_home_title()} />
	<meta name="twitter:description" content={m.meta_home_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
	<svelte:element this={'script'} type="application/ld+json">{ldJson}</svelte:element>
</svelte:head>

<main id="main-content">
	<section
		class="relative overflow-hidden border-b border-line/60 px-4 py-16 sm:px-6 sm:py-24 dark:border-line-dark/60"
		aria-labelledby="hero-heading"
	>
		<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<p
					class="font-rounded text-eyebrow text-veritas-verdigris uppercase dark:text-veritas-yellowGreen"
				>
					{m.meta_site_name()}
				</p>
				<h1
					id="hero-heading"
					class="mt-3 font-display text-title-lg font-semibold text-veritas-indigo dark:text-paper-lifted"
				>
					{m.hero_tagline()}
				</h1>
				<p class="mt-4 max-w-xl text-base leading-relaxed text-muted-ink dark:text-muted-ink-dark">
					{m.hero_description()}
				</p>
				<div class="mt-8 w-full max-w-xl min-w-0">
					<AppBadges />
				</div>
			</div>

			<div class="relative flex justify-center lg:justify-end">
				<div
					class="relative aspect-[9/19] w-[min(100%,280px)] rounded-panel border border-line/90 bg-paper-lifted shadow-panel motion-safe:animate-veritas-float motion-reduce:animate-none dark:border-line-dark/90 dark:bg-paper-lifted-dark dark:shadow-panel-dark"
					role="img"
					aria-label={m.hero_screenshot_alt()}
				>
					<!-- <div -->
					<!-- 	class="absolute inset-3 rounded-[1.25rem] bg-gradient-to-br from-veritas-verdigris/25 via-paper to-veritas-indigo/20 dark:from-veritas-verdigris/30 dark:via-paper-dark dark:to-veritas-flame/15" -->
					<!-- ></div> -->
					<img
						src="/a_onboarding_screenshot/onboard_1.png"
						alt={m.hero_screenshot_alt()}
						class="rounded-[1.25rem]"
					/>
					<div
						class="absolute right-4 bottom-4 left-4 rounded-panel-sm border border-line/80 bg-paper/90 p-3 text-xs font-medium text-ink shadow-panel dark:border-line-dark/80 dark:bg-paper-dark/90 dark:text-ink-dark dark:shadow-panel-dark"
					>
						{m.features_subtitle()}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="features-heading">
		<div class="mx-auto max-w-6xl">
			<h2
				id="features-heading"
				class="font-display text-title-md font-semibold text-veritas-indigo dark:text-paper-lifted"
			>
				{m.features_title()}
			</h2>
			<p class="mt-2 max-w-2xl text-muted-ink dark:text-muted-ink-dark">{m.features_subtitle()}</p>

			<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-verdigris/15 text-veritas-verdigris dark:bg-veritas-yellowGreen/15 dark:text-veritas-yellowGreen"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<path
								d="M4 6h16M4 12h10M4 18h16"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_timeline_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
						{m.feature_timeline_desc()}
					</p>
				</article>

				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-indigo/15 text-veritas-indigo dark:bg-veritas-flame/20 dark:text-veritas-flame"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 6v12M6 12h12"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_topics_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
						{m.feature_topics_desc()}
					</p>
				</article>

				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-flame/15 text-veritas-flame"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 3v18M5 10l7-5 7 5"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_stability_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
						{m.feature_stability_desc()}
					</p>
				</article>

				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-crimson/15 text-veritas-crimson"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<path
								d="M8 16l4-8 4 8M9.5 13h5"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<circle cx="12" cy="17" r="1" fill="currentColor" />
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_ai_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">{m.feature_ai_desc()}</p>
				</article>

				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-yellowGreen/25 text-veritas-indigo dark:text-veritas-yellowGreen"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
							<path d="M3 12h18M12 3a15 15 0 0 1 0 18" stroke="currentColor" stroke-width="2" />
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_lang_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
						{m.feature_lang_desc()}
					</p>
				</article>

				<article
					class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-panel-sm bg-veritas-verdigris/15 text-veritas-verdigris dark:bg-veritas-yellowGreen/15 dark:text-veritas-yellowGreen"
						aria-hidden="true"
					>
						<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none">
							<circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="2" />
							<path
								d="M6 20v-1a6 6 0 0 1 12 0v1"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<h3 class="font-display text-lg font-semibold text-ink dark:text-ink-dark">
						{m.feature_account_title()}
					</h3>
					<p class="mt-2 text-sm text-muted-ink dark:text-muted-ink-dark">
						{m.feature_account_desc()}
					</p>
				</article>
			</div>
		</div>
	</section>

	<section
		class="border-y border-line/60 bg-paper-lifted/60 px-4 py-16 sm:px-6 sm:py-20 dark:border-line-dark/60 dark:bg-paper-lifted-dark/40"
	>
		<div class="mx-auto max-w-6xl">
			<h2
				class="font-display text-title-md font-semibold text-veritas-indigo dark:text-paper-lifted"
			>
				{m.screenshots_title()}
			</h2>
			<p class="mt-2 text-muted-ink dark:text-muted-ink-dark">{m.screenshots_subtitle()}</p>
			<div class="mt-8">
				{#if screenshotItems.length === 0}
					<p
						class="rounded-panel border border-dashed border-line/80 bg-paper/80 px-5 py-8 text-sm text-muted-ink dark:border-line-dark/80 dark:bg-paper-dark/80 dark:text-muted-ink-dark"
					>
						{m.screenshots_empty()}
					</p>
				{:else}
					<ScreenshotScroller items={screenshotItems} />
				{/if}
			</div>
		</div>
	</section>

	<section class="px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="faq-heading">
		<div class="mx-auto max-w-3xl">
			<h2
				id="faq-heading"
				class="font-display text-title-md font-semibold text-veritas-indigo dark:text-paper-lifted"
			>
				{m.faq_title()}
			</h2>
			<p class="mt-2 text-muted-ink dark:text-muted-ink-dark">{m.faq_subtitle()}</p>
			<div class="mt-8">
				<FAQ />
			</div>
		</div>
	</section>

	<section
		class="border-t border-line/60 bg-linear-to-r from-veritas-indigo/90 to-veritas-verdigris/85 px-4 py-14 text-paper-lifted sm:px-6 dark:border-line-dark/60 dark:from-veritas-indigo dark:to-veritas-verdigris"
		aria-labelledby="cta-heading"
	>
		<div
			class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"
		>
			<div class="min-w-0 md:max-w-[min(100%,28rem)]">
				<h2 id="cta-heading" class="font-display text-title-md font-semibold">{m.cta_title()}</h2>
				<p class="mt-2 max-w-xl text-sm text-paper/90">{m.cta_subtitle()}</p>
			</div>
			<div class="w-full min-w-0 md:w-auto md:max-w-[min(100%,44rem)] md:flex-1">
				<AppBadges />
			</div>
		</div>
	</section>
</main>
