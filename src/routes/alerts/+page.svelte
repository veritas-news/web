<script lang="ts">
	import AlertCard from '$lib/components/alerts/AlertCard.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Alerts — Veritas</title>
	<meta name="description" content="Recent event signal fingerprint changes (GET /v1/alerts)." />
</svelte:head>

<div class="mx-auto grid max-w-[72rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="grid gap-sp-2 border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-event">Signals</p>
		<h1 class="m-0 font-serif text-headline font-semibold">Alerts</h1>
		<p class="m-0 max-w-[62ch] leading-[1.65] text-ink-soft">
			Recent event signal fingerprint changes. Cards enrich with title, description, date, and
			location when the backend provides preview fields on
			<code class="text-[0.9em] text-event">GET /v1/alerts</code>.
		</p>
	</header>

	{#if data.result.kind === 'unavailable'}
		<p class="m-0 font-sans text-body text-ink-muted">{data.result.message}</p>
	{:else if data.result.kind === 'error'}
		<ErrorMessage title="Alerts" message={data.result.message} />
	{:else if data.result.data.items.length === 0}
		<p class="m-0 font-sans text-body text-ink-muted">No recent fingerprint changes.</p>
	{:else}
		<ul class="m-0 grid list-none gap-sp-4 p-0">
			{#each data.result.data.items as item (item.eventId + item.currentFingerprint)}
				<li>
					<AlertCard {item} />
				</li>
			{/each}
		</ul>
	{/if}
</div>
