<script lang="ts">
	import StaticDocPage from '$lib/components/layout/StaticDocPage.svelte';

	const sections = [
		{
			title: 'Getting started',
			items: [
				'Open the timeline to scan current developments.',
				'Read the daily briefing when you want a short reset.',
				'Save articles you want to revisit later.'
			]
		},
		{
			title: 'Useful checks',
			items: [
				'Confirm your device has a stable network connection.',
				'Check whether notifications are enabled both in the app and in system settings.',
				'Sign in if you expect saved reading or preferences to sync across devices.'
			]
		},
		{
			title: 'Contact',
			items: [
				'For support, privacy, or deletion requests, email veritas@thinis.de.',
				'Include the screen, device, and short description of what happened.',
				'Do not send passwords, tokens, private keys, or other secrets.'
			]
		}
	];
</script>

<StaticDocPage
	title="Support"
	metaDescription="Help using Veritas News: timeline, briefing, saved reading, notifications, and contact details."
	eyebrow="Help"
>
	<div class="space-y-sp-5 text-sm leading-7 text-ink-soft">
		<p>
			Veritas News is built to stay calm and understandable. If something looks outdated, incomplete, or unavailable, first refresh the app or page and check whether the issue is limited to one screen.
		</p>
		<p>
			For account, privacy, or deletion requests, include the email address you used to contact us. Do not send passwords, tokens, private keys, or other secrets.
		</p>
	</div>

	<div class="mt-sp-8 grid gap-sp-4 md:grid-cols-3">
		{#each sections as section (section.title)}
			<section class="rounded-3xl border border-outline-variant bg-surface-high p-sp-5">
				<h2 class="text-xl font-semibold tracking-[-0.03em] text-ink">{section.title}</h2>
				<ul class="mt-sp-4 list-disc space-y-sp-2 pl-sp-5 text-sm leading-6 text-ink-soft">
					{#each section.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</StaticDocPage>
