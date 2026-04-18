<script lang="ts">
	import PulseItemList from '$lib/components/pulse/PulseItemList.svelte';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function weatherLabel(code: number): string {
		const map: Record<number, string> = {
			0: 'Clear',
			1: 'Mostly clear',
			2: 'Partly cloudy',
			3: 'Overcast',
			45: 'Fog',
			48: 'Fog',
			51: 'Drizzle',
			61: 'Rain',
			71: 'Snow',
			95: 'Thunderstorm'
		};
		return map[code] ?? `Code ${code}`;
	}
</script>

<svelte:head>
	<title>Pulse — Veritas</title>
	<meta
		name="description"
		content="Veritas dashboard pulse plus live API status and Berlin weather (Open-Meteo)."
	/>
</svelte:head>

<div class="mx-auto grid max-w-[56rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-global uppercase">Field desk</p>
		<h1 class="mt-sp-1 mb-0 font-serif text-headline font-semibold">Pulse</h1>
		<p class="mt-sp-2 mb-0 max-w-[62ch] leading-[1.65] text-ink-soft">
			Veritas pulse plus API clock and Open-Meteo (Berlin)—a quick check that the browser can reach public JSON
			endpoints alongside <code class="text-[0.9em] text-event">/v1</code>.
		</p>
	</header>

	<section class="grid gap-sp-3 border border-outline-variant bg-surface-low p-sp-4">
		<header class="flex flex-wrap items-baseline justify-between gap-sp-2">
			<h2 class="m-0 font-serif text-[1.2rem]">Veritas pulse</h2>
			{#if data.pulse}
				<p class="m-0 font-mono text-[0.8rem] tabular-nums text-ink-muted">
					{data.pulse.window_start} → {data.pulse.window_end} · {data.pulse.mode}
				</p>
			{/if}
		</header>

		{#if data.pulseErr}
			<ErrorMessage title="Pulse" message={data.pulseErr} />
		{:else if data.pulse}
			<div class="grid gap-sp-4 lg:grid-cols-2">
				<div class="grid gap-sp-2">
					<h3 class="m-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-topic">
						Topics
					</h3>
					<PulseItemList items={data.pulse.topics} empty="No topic pulse." />
				</div>
				<div class="grid gap-sp-2">
					<h3 class="m-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-global">
						Globals
					</h3>
					<PulseItemList items={data.pulse.globals} empty="No global pulse." />
				</div>
			</div>
		{:else}
			<p class="m-0 font-sans text-body text-ink-muted">No pulse data.</p>
		{/if}
	</section>

	<div class="grid gap-sp-4 lg:grid-cols-2">
		<section class="grid content-start gap-sp-2 border border-outline-variant bg-surface-low p-sp-4">
			<h2 class="m-0 font-serif text-[1.2rem]">Veritas API</h2>
			{#if data.apiErr}
				<ErrorMessage title="API status" message={data.apiErr} />
			{:else if data.api}
				<p class="m-0 font-mono text-[0.95rem] tabular-nums break-all">{data.api.utcNow}</p>
				<p class="m-0 font-sans text-body text-ink-muted">{data.api.service}</p>
			{:else}
				<p class="m-0 font-sans text-body text-ink-muted">No data.</p>
			{/if}
		</section>

		<section class="grid content-start gap-sp-2 border border-outline-variant bg-surface-low p-sp-4">
			<h2 class="m-0 font-serif text-[1.2rem]">Berlin weather</h2>
			<p class="m-0 font-sans text-label tracking-[0.06em] text-ink-muted uppercase">Open-Meteo · current</p>
			{#if data.weatherErr}
				<ErrorMessage title="Weather" message={data.weatherErr} />
			{:else if data.weather}
				<p class="m-0 text-2xl font-bold tabular-nums">{data.weather.temperatureC.toFixed(1)}°C</p>
				<p class="m-0 font-sans text-body text-ink-muted">{weatherLabel(data.weather.weatherCode)}</p>
				<ul class="m-0 list-disc pl-[1.1rem] leading-relaxed text-ink-soft">
					<li>Humidity {data.weather.humidityPct}%</li>
					<li>Wind {data.weather.windKmh} km/h</li>
					<li class="font-mono tabular-nums">{data.weather.time}</li>
				</ul>
			{:else}
				<p class="m-0 font-sans text-body text-ink-muted">No data.</p>
			{/if}
		</section>

	</div>
</div>
