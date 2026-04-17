import { API_REQUEST_TIMEOUT_MS } from '$lib/config/api';

export interface OpenMeteoCurrent {
	time: string;
	temperatureC: number;
	humidityPct: number;
	windKmh: number;
	weatherCode: number;
}

interface OpenMeteoJson {
	current: {
		time: string;
		temperature_2m: number;
		relative_humidity_2m: number;
		weather_code: number;
		wind_speed_10m: number;
	};
}

/** Free tier, no API key: https://open-meteo.com/ */
export async function fetchOpenMeteoCurrent(
	fetcher: typeof fetch,
	coords: { lat: number; lon: number }
): Promise<OpenMeteoCurrent> {
	const url = new URL('https://api.open-meteo.com/v1/forecast');
	url.searchParams.set('latitude', String(coords.lat));
	url.searchParams.set('longitude', String(coords.lon));
	url.searchParams.set(
		'current',
		'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
	);

	const res = await fetcher(url.toString(), {
		headers: { accept: 'application/json' },
		signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS)
	});

	if (!res.ok) {
		throw new Error(`Open-Meteo HTTP ${res.status}`);
	}

	const raw = await res.text();
	const j = JSON.parse(raw) as OpenMeteoJson;
	const c = j.current;
	return {
		time: c.time,
		temperatureC: c.temperature_2m,
		humidityPct: c.relative_humidity_2m,
		windKmh: c.wind_speed_10m,
		weatherCode: c.weather_code
	};
}
