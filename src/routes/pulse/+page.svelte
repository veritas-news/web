<script lang="ts">
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
		content="Live API status, Berlin weather (Open-Meteo), and NASA Astronomy Picture of the Day."
	/>
</svelte:head>

<div class="mx-auto grid max-w-[56rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-global uppercase">Field desk</p>
		<h1 class="mt-sp-1 mb-0 font-serif text-headline font-semibold">Pulse</h1>
		<p class="mt-sp-2 mb-0 max-w-[62ch] leading-[1.65] text-ink-soft">
			Veritas API clock plus free public feeds: Open-Meteo (Berlin) and NASA APOD. Useful sanity check that the
			browser can reach third-party JSON endpoints.
		</p>
	</header>

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

		<section class="grid content-start gap-sp-2 border border-outline-variant bg-surface-low p-sp-4 lg:col-span-2">
			<h2 class="m-0 font-serif text-[1.2rem]">NASA APOD</h2>
			<p class="m-0 font-sans text-label tracking-[0.06em] text-ink-muted uppercase">Planetary APOD · demo key</p>
			{#if data.apodErr}
				<ErrorMessage title="APOD" message={data.apodErr} />
			{:else if data.apod}
				<h3 class="m-0 text-[1.15rem] font-semibold">{data.apod.title}</h3>
				<p class="m-0 font-mono text-[0.95rem] text-ink-muted">
					{data.apod.date}{#if data.apod.copyright} · {data.apod.copyright}{/if}
				</p>
				<img
					class="max-h-[22rem] w-full border border-outline-variant object-cover"
					src={data.apod.imageUrl}
					alt=""
					loading="lazy"
				/>
				<p class="m-0 line-clamp-8 leading-[1.65] text-ink-soft">{data.apod.explanation}</p>
			{:else}
				<p class="m-0 font-sans text-body text-ink-muted">No data.</p>
			{/if}
		</section>
	</div>
</div>
