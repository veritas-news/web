<script lang="ts">
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import TagChip from '$lib/components/ui/TagChip.svelte';
	import { formatDateTime } from '$lib/utils/format';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data.sources;
		return data.sources.filter(
			(s) =>
				s.title.toLowerCase().includes(q) ||
				s.url.toLowerCase().includes(q) ||
				s.lang.toLowerCase().includes(q) ||
				s.id.toLowerCase().includes(q)
		);
	});

	const activeCount = $derived(data.sources.filter((s) => s.active).length);
</script>

<svelte:head>
	<title>Sources — Veritas</title>
	<meta name="description" content="RSS and feed sources ingested by the Veritas crawler." />
</svelte:head>

<div class="mx-auto grid max-w-[72rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="grid gap-sp-3 border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-global uppercase">Ingest</p>
		<h1 class="m-0 font-serif text-headline font-semibold">Sources</h1>
		<p class="m-0 max-w-[62ch] leading-[1.65] text-ink-soft">
			Crawler feed endpoints from <code class="text-[0.9em] text-event">GET /v1/sources</code>. Filter client-side by
			title, URL, or language.
		</p>
		<p class="m-0 flex flex-wrap gap-sp-2">
			<TagChip label="{data.sources.length} total" variant="neutral" />
			<TagChip label="{activeCount} active" variant="event" />
		</p>
		<label class="mt-sp-2 block">
			<span class="sr-only">Filter sources</span>
			<input
				class="w-full max-w-80 border border-outline-variant bg-surface-low px-sp-3 py-sp-3 text-ink"
				type="search"
				placeholder="Filter…"
				bind:value={query}
				autocomplete="off"
			/>
		</label>
	</header>

	{#if data.error}
		<ErrorMessage title="Sources error" message={data.error} />
	{:else if filtered.length === 0}
		<p class="m-0 text-ink-muted">No sources match this filter.</p>
	{:else}
		<div class="overflow-x-auto border border-outline-variant" role="region" aria-label="Sources table">
			<table class="w-full border-collapse font-sans text-body">
				<thead>
					<tr>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Title
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Lang
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Priority
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Poll (min)
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Status
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							Last fetch
						</th>
						<th
							class="bg-surface-low px-sp-3 py-sp-3 text-left align-top font-sans text-label font-bold tracking-[0.06em] text-ink-muted uppercase"
							scope="col"
						>
							HTTP
						</th>
					</tr>
				</thead>
				<tbody>
					{#each filtered as s (s.id)}
						<tr class="align-top {s.active ? '' : 'opacity-[0.65]'}">
							<td class="min-w-[14rem] border-b border-outline-variant px-sp-3 py-sp-3">
								<span class="mb-sp-1 block font-semibold text-ink">{s.title || '—'}</span>
								<a
									href={s.url}
									class="block break-all font-sans text-label text-event no-underline hover:bg-transparent hover:underline"
									target="_blank"
									rel="noopener noreferrer">{s.url}</a
								>
							</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3">{s.lang || '—'}</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3">{s.priority || '—'}</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3">{s.pollIntervalMin}</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3">
								{#if s.active}
									<TagChip label="Active" variant="event" />
								{:else}
									<TagChip label="Off" variant="neutral" />
								{/if}
							</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3 font-mono text-[0.8rem] tabular-nums">
								{s.lastFetchedAt ? formatDateTime(s.lastFetchedAt) : '—'}
							</td>
							<td class="border-b border-outline-variant px-sp-3 py-sp-3 font-mono text-[0.8rem] tabular-nums">
								{#if s.lastStatusCode}{s.lastStatusCode}{:else}—{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
