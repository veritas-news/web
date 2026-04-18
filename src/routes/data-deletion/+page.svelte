<script lang="ts">
	import StaticDocPage from '$lib/components/layout/StaticDocPage.svelte';
</script>

<StaticDocPage
	title="Data deletion"
	metaDescription="How to request deletion of personal data processed in connection with Veritas."
	eyebrow="Legal"
>
	<p class="m-0">
		You may have the right to request deletion of personal data we hold about you, subject to applicable law (for
		example the GDPR “right to erasure” in the EU/UK). Some data must be kept for legal, security, or accounting
		reasons; we will explain if that applies to your request.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">How to request deletion</h2>
	<p class="m-0">
		Send an email to
		<a class="break-all font-semibold text-event underline-offset-2 hover:underline" href="mailto:veritas@thinis.de"
			>veritas@thinis.de</a
		>
		with the subject line <strong class="text-ink">Data deletion request</strong>.
	</p>
	<p class="m-0">Include:</p>
	<ul class="m-0 list-disc space-y-sp-2 pl-sp-6 text-ink-soft">
		<li>Your name (and account identifier if you have one).</li>
		<li>A description of the data you want deleted (e.g. support emails, account profile).</li>
		<li>Confirmation that you are requesting erasure under applicable privacy law (if you want us to treat it as a formal GDPR request).</li>
	</ul>
	<p class="m-0">
		We may need to verify your identity before processing the request. We will not ask for unnecessary sensitive
		information; we may use a confirmation link or a reply from the same email address for low-risk cases.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">What we cannot delete</h2>
	<p class="m-0">
		Data stored only on your device (for example browser-only bookmarks) is under your control—use your browser’s
		site data controls to clear it. We cannot delete third-party publisher content at source. Aggregated or
		anonymised data that does not identify you may be retained.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Timeline</h2>
	<p class="m-0">
		Where the GDPR applies, we aim to respond within one month and may extend by up to two further months if
		complex, with an explanation. Other jurisdictions may have different timelines.
	</p>

	<h2 class="m-0 pt-sp-2 font-display text-[1.15rem] font-bold text-ink">Further rights</h2>
	<p class="m-0">
		See the
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="/privacy-policy">Privacy policy</a>
		for access, correction, and other rights. Questions:
		<a class="font-semibold text-event underline-offset-2 hover:underline" href="mailto:veritas@thinis.de"
			>veritas@thinis.de</a
		>.
	</p>
</StaticDocPage>
