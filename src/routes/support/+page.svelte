<script lang="ts">
	import StaticDocPage from '$lib/components/layout/StaticDocPage.svelte';
</script>

<StaticDocPage
	title="Support"
	metaDescription="Help using Veritas: timelines, bookmarks, search, and how to get in touch."
	eyebrow="Help"
>
	<p class="m-0">
		<strong class="font-semibold text-ink">Veritas</strong> is an intelligence timeline: events, topics, and
		global arcs, backed by the Veritas API. This page explains common issues and where to go next.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Before you write</h2>
	<ul class="m-0 list-disc space-y-sp-2 pl-sp-6 text-ink-soft">
		<li><strong class="font-semibold text-ink">Refresh the page</strong> — timelines and lists are server-ranked; a stale tab can show old ordering until reload.</li>
		<li><strong class="font-semibold text-ink">Check your connection</strong> — detail views and search need a working network path to the API.</li>
		<li><strong class="font-semibold text-ink">Bookmarks (Saved)</strong> are stored in <strong class="text-ink">your browser only</strong>. Clearing site data or using another device will not show the same saved items.</li>
	</ul>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Contact us</h2>
	<p class="m-0">
		For bugs, confusing behaviour, or account-related questions (when offered), email
		<a class="break-all font-semibold text-event underline-offset-2 hover:underline" href="mailto:veritas@thinis.de"
			>veritas@thinis.de</a
		>. Include what you were doing, what you expected, and what you saw instead. Screenshots help.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Privacy &amp; your data</h2>
	<p class="m-0">
		How we handle personal data is described in the
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="/privacy-policy">Privacy policy</a>.
		To request deletion of data we hold about you, see
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="/data-deletion">Data deletion</a>.
	</p>
</StaticDocPage>
