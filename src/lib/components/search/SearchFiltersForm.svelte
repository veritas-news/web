<script lang="ts">
	import { SEARCH_FILTER_CHOICES } from '$lib/services/searchFilters';
	import type { SearchFilters } from '$lib/types/search';

	interface Props {
		q: string;
		filters: SearchFilters;
	}

	let { q, filters }: Props = $props();

	const inputCls =
		'border border-outline-variant bg-surface-low px-sp-3 py-sp-2 font-sans text-body text-ink';
	const labelCls =
		'grid gap-sp-1 font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted';
</script>

<form class="grid gap-sp-3" method="get" action="/search">
	<div class="flex flex-wrap gap-sp-2">
		<label class="sr-only" for="q">Search query</label>
		<input
			id="q"
			name="q"
			type="search"
			class="min-w-0 flex-[1_1_16rem] {inputCls}"
			placeholder="e.g. election, climate, …"
			value={q}
			autocomplete="off"
			minlength="2"
			maxlength="200"
		/>
		<button
			type="submit"
			class="border border-outline-variant bg-ink px-sp-5 py-sp-3 font-sans text-label font-bold tracking-[0.06em] text-surface uppercase hover:opacity-92"
			>Search</button
		>
	</div>

	<fieldset
		class="grid gap-sp-3 border border-outline-variant bg-surface-low px-sp-3 py-sp-3 md:grid-cols-4"
	>
		<legend class="px-sp-1 font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted"
			>Filters (event hits)</legend
		>
		<label class={labelCls}>
			<span>Type</span>
			<select name="type" class={inputCls} value={filters.type ?? 'all'}>
				{#each SEARCH_FILTER_CHOICES.types as t (t)}
					<option value={t}>{t}</option>
				{/each}
			</select>
		</label>

		<label class={labelCls}>
			<span>Impact scope</span>
			<select name="impact_scope" class={inputCls} value={filters.impactScope ?? ''}>
				<option value="">any</option>
				{#each SEARCH_FILTER_CHOICES.impactScopes as s (s)}
					<option value={s}>{s}</option>
				{/each}
			</select>
		</label>

		<label class={labelCls}>
			<span>Event state</span>
			<select name="event_state" class={inputCls} value={filters.eventState ?? ''}>
				<option value="">any</option>
				{#each SEARCH_FILTER_CHOICES.eventStates as s (s)}
					<option value={s}>{s}</option>
				{/each}
			</select>
		</label>

		<label class={labelCls}>
			<span>Min conviction (0–100)</span>
			<input
				type="number"
				name="min_conviction"
				min="0"
				max="100"
				step="1"
				class={inputCls}
				value={filters.minConviction ?? ''}
				placeholder="e.g. 50"
			/>
		</label>

		<label class={labelCls}>
			<span>Max conviction</span>
			<input
				type="number"
				name="max_conviction"
				min="0"
				max="100"
				step="1"
				class={inputCls}
				value={filters.maxConviction ?? ''}
				placeholder="optional"
			/>
		</label>

		<label class={labelCls}>
			<span>Min impact</span>
			<input
				type="number"
				name="min_impact"
				min="0"
				max="100"
				step="1"
				class={inputCls}
				value={filters.minImpact ?? ''}
				placeholder="optional"
			/>
		</label>

		<label class={labelCls}>
			<span>Max impact</span>
			<input
				type="number"
				name="max_impact"
				min="0"
				max="100"
				step="1"
				class={inputCls}
				value={filters.maxImpact ?? ''}
				placeholder="optional"
			/>
		</label>

		<label class={labelCls}>
			<span>Happened after (RFC3339)</span>
			<input
				type="text"
				name="happened_after"
				class={inputCls}
				value={filters.happenedAfter ?? ''}
				placeholder="2026-01-01T00:00:00Z"
			/>
		</label>

		<label class={labelCls}>
			<span>Happened before</span>
			<input
				type="text"
				name="happened_before"
				class={inputCls}
				value={filters.happenedBefore ?? ''}
				placeholder="optional"
			/>
		</label>

		<label class={labelCls}>
			<span>Country (ISO-2)</span>
			<input
				type="text"
				name="country"
				maxlength="2"
				class={inputCls}
				value={filters.country ?? ''}
				placeholder="DE"
			/>
		</label>

		<label class={labelCls}>
			<span>Entity id</span>
			<input type="text" name="entity_id" class={inputCls} value={filters.entityId ?? ''} placeholder="optional" />
		</label>
	</fieldset>
</form>
