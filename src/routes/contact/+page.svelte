<script lang="ts">
	import StaticDocPage from '$lib/components/layout/StaticDocPage.svelte';
</script>

<StaticDocPage
	title="Contact"
	metaDescription="Reach Veritas by email: veritas@thinis.de — product, partnerships, press, and privacy requests."
	eyebrow="Company"
>
	<p class="m-0">
		We read every message. For the fastest path to help with using the product, see
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="/support">Support</a> first.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Email</h2>
	<p class="m-0">
		<a
			class="break-all font-semibold text-event underline-offset-2 hover:underline"
			href="mailto:veritas@thinis.de">veritas@thinis.de</a
		>
	</p>
	<p class="m-0 text-[0.95em] text-ink-muted">
		Please include a clear subject line (e.g. “Privacy request”, “Bug report”, “Partnership”). For privacy or
		deletion requests, see also
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="/data-deletion"
			>Data deletion</a
		>.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">What to send</h2>
	<ul class="m-0 list-disc space-y-sp-2 pl-sp-6 text-ink-soft">
		<li><strong class="font-semibold text-ink">Product feedback &amp; bugs:</strong> what you expected, what happened, browser or app version, and approximate time (UTC).</li>
		<li><strong class="font-semibold text-ink">Press &amp; media:</strong> outlet, deadline, and whether the request is on or off the record.</li>
		<li><strong class="font-semibold text-ink">Partnerships &amp; integrations:</strong> a short description of your organisation and the collaboration you have in mind.</li>
		<li><strong class="font-semibold text-ink">Legal &amp; privacy:</strong> reference
			<a class="font-semibold text-event underline-offset-2 hover:underline" href="/privacy-policy">Privacy policy</a>
			or
			<a class="font-semibold text-event underline-offset-2 hover:underline" href="/terms-of-service">Terms of service</a>
			if applicable.</li>
	</ul>

	<p class="m-0">
		We do not guarantee a fixed response time for general email, but we aim to reply to substantive messages
		within a few business days where a reply is needed.
	</p>
</StaticDocPage>
