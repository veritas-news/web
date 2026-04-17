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

<div class="pulse">
  <header class="hero">
    <p class="eyebrow">Field desk</p>
    <h1 class="title">Pulse</h1>
    <p class="lede">
      Veritas API clock plus free public feeds: Open-Meteo (Berlin) and NASA APOD. Useful sanity check that the
      browser can reach third-party JSON endpoints.
    </p>
  </header>

  <div class="grid">
    <section class="panel">
      <h2 class="panel-title">Veritas API</h2>
      {#if data.apiErr}
        <ErrorMessage title="API status" message={data.apiErr} />
      {:else if data.api}
        <p class="mono">{data.api.utcNow}</p>
        <p class="muted">{data.api.service}</p>
      {:else}
        <p class="muted">No data.</p>
      {/if}
    </section>

    <section class="panel">
      <h2 class="panel-title">Berlin weather</h2>
      <p class="sub">Open-Meteo · current</p>
      {#if data.weatherErr}
        <ErrorMessage title="Weather" message={data.weatherErr} />
      {:else if data.weather}
        <p class="big">{data.weather.temperatureC.toFixed(1)}°C</p>
        <p class="muted">{weatherLabel(data.weather.weatherCode)}</p>
        <ul class="stats">
          <li>Humidity {data.weather.humidityPct}%</li>
          <li>Wind {data.weather.windKmh} km/h</li>
          <li class="mono">{data.weather.time}</li>
        </ul>
      {:else}
        <p class="muted">No data.</p>
      {/if}
    </section>

    <section class="panel wide">
      <h2 class="panel-title">NASA APOD</h2>
      <p class="sub">Planetary APOD · demo key</p>
      {#if data.apodErr}
        <ErrorMessage title="APOD" message={data.apodErr} />
      {:else if data.apod}
        <h3 class="apod-title">{data.apod.title}</h3>
        <p class="muted mono">{data.apod.date}{#if data.apod.copyright} · {data.apod.copyright}{/if}</p>
        <img class="apod-img" src={data.apod.imageUrl} alt="" loading="lazy" />
        <p class="apod-explain">{data.apod.explanation}</p>
      {:else}
        <p class="muted">No data.</p>
      {/if}
    </section>
  </div>
</div>

<style>
  .pulse {
    max-width: 56rem;
    margin: 0 auto;
    padding: var(--sp-6) var(--sp-6) var(--sp-10);
    display: grid;
    gap: var(--sp-6);
  }

  .hero {
    border-bottom: 1px solid var(--outline-variant);
    padding-bottom: var(--sp-4);
  }

  .eyebrow {
    margin: 0;
    font-size: var(--text-label);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--clr-global);
  }

  .title {
    margin: var(--sp-1) 0 0;
    font-family: var(--font-serif);
    font-size: var(--text-headline);
    font-weight: 600;
  }

  .lede {
    margin: var(--sp-2) 0 0;
    max-width: 62ch;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-4);
  }

  @media (max-width: 800px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .panel {
    padding: var(--sp-4);
    border: 1px solid var(--outline-variant);
    background: var(--surface-low);
    display: grid;
    gap: var(--sp-2);
    align-content: start;
  }

  .panel.wide {
    grid-column: 1 / -1;
  }

  .panel-title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 1.2rem;
  }

  .sub {
    margin: 0;
    font-size: var(--text-label);
    color: var(--ink-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .mono {
    font-variant-numeric: tabular-nums;
    font-family: ui-monospace, monospace;
    font-size: 0.95rem;
    margin: 0;
    word-break: break-all;
  }

  .muted {
    margin: 0;
    color: var(--ink-muted);
    font-size: var(--text-body);
  }

  .big {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .stats {
    margin: 0;
    padding-left: 1.1rem;
    color: var(--ink-soft);
    line-height: 1.6;
  }

  .apod-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .apod-img {
    width: 100%;
    max-height: 22rem;
    object-fit: cover;
    border: 1px solid var(--outline-variant);
  }

  .apod-explain {
    margin: 0;
    line-height: 1.65;
    color: var(--ink-soft);
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
