<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	function onsubmit(e: Event) {
		e.preventDefault();
		const body = `${message}\n\n—\n${name}\n${email}`;
		const href = `mailto:${m.legal_support_email_value()}?subject=${encodeURIComponent(m.legal_contact_mailto_subject())}&body=${encodeURIComponent(body)}`;
		window.location.href = href;
	}
</script>

<svelte:head>
	<title>{m.meta_contact_title()}</title>
	<meta name="description" content={m.meta_contact_description()} />
	<meta property="og:title" content={m.meta_contact_title()} />
	<meta property="og:description" content={m.meta_contact_description()} />
	<meta property="og:image" content={m.meta_og_image()} />
	<meta property="og:url" content={m.meta_site_url()} />
	<meta name="twitter:card" content={m.meta_twitter_card()} />
	<meta name="twitter:title" content={m.meta_contact_title()} />
	<meta name="twitter:description" content={m.meta_contact_description()} />
	<meta name="twitter:image" content={m.meta_og_image()} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
	<article
		class="rounded-panel border border-line/90 bg-paper-lifted/90 p-6 shadow-panel sm:p-10 dark:border-line-dark/90 dark:bg-paper-lifted-dark/90 dark:shadow-panel-dark"
	>
		<p class="font-rounded text-eyebrow text-veritas-verdigris dark:text-veritas-yellowGreen">
			{m.legal_contact_title()}
		</p>
		<h1 class="mt-2 font-display text-title-md font-semibold text-ink dark:text-ink-dark">
			{m.page_contact_h1()}
		</h1>

		<p class="mt-6 text-sm leading-relaxed text-muted-ink dark:text-muted-ink-dark">
			{m.legal_contact_intro()}
		</p>

		<form class="mt-8 space-y-5" {onsubmit}>
			<div>
				<label class="block text-sm font-semibold text-ink dark:text-ink-dark" for="contact-name"
					>{m.legal_contact_name()}</label
				>
				<input
					id="contact-name"
					name="name"
					type="text"
					autocomplete="name"
					required
					bind:value={name}
					class="mt-2 w-full rounded-panel-sm border border-line/90 bg-paper px-3 py-2 text-sm text-ink dark:border-line-dark/90 dark:bg-paper-dark dark:text-ink-dark"
				/>
			</div>
			<div>
				<label class="block text-sm font-semibold text-ink dark:text-ink-dark" for="contact-email"
					>{m.legal_contact_email()}</label
				>
				<input
					id="contact-email"
					name="email"
					type="email"
					autocomplete="email"
					required
					bind:value={email}
					class="mt-2 w-full rounded-panel-sm border border-line/90 bg-paper px-3 py-2 text-sm text-ink dark:border-line-dark/90 dark:bg-paper-dark dark:text-ink-dark"
				/>
			</div>
			<div>
				<label class="block text-sm font-semibold text-ink dark:text-ink-dark" for="contact-message"
					>{m.legal_contact_message()}</label
				>
				<textarea
					id="contact-message"
					name="message"
					rows="6"
					required
					bind:value={message}
					class="mt-2 w-full rounded-panel-sm border border-line/90 bg-paper px-3 py-2 text-sm text-ink dark:border-line-dark/90 dark:bg-paper-dark dark:text-ink-dark"
				></textarea>
			</div>
			<button
				type="submit"
				class="rounded-panel-sm bg-veritas-indigo px-5 py-2.5 font-rounded text-sm font-semibold text-paper-lifted hover:bg-veritas-verdigris dark:bg-veritas-verdigris dark:text-ink dark:hover:bg-veritas-yellowGreen"
			>
				{m.legal_contact_submit()}
			</button>
		</form>

		<p class="mt-10">
			<a
				class="font-rounded text-sm font-semibold text-veritas-verdigris hover:text-veritas-indigo dark:text-veritas-yellowGreen dark:hover:text-paper-lifted"
				href={localizeHref('/')}>{m.legal_back_home()}</a
			>
		</p>
	</article>
</main>
