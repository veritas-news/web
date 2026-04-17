import { API_REQUEST_TIMEOUT_MS } from '$lib/config/api';

const DEMO_KEY = 'DacoS9rlwNqBINQ8MaHTX1Do5dBVDBicAszhMuGb';

export interface NasaApod {
	title: string;
	date: string;
	explanation: string;
	imageUrl: string;
	copyright?: string;
}

interface ApodJson {
	title: string;
	date: string;
	explanation: string;
	url: string;
	hdurl?: string;
	copyright?: string;
}

/** NASA APOD demo key: https://api.nasa.gov/ */
export async function fetchNasaApod(fetcher: typeof fetch): Promise<NasaApod> {
	const url = new URL('https://api.nasa.gov/planetary/apod');
	url.searchParams.set('api_key', DEMO_KEY);
	url.searchParams.set('thumbs', 'true');

	const res = await fetcher(url.toString(), {
		headers: { accept: 'application/json' },
		signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS)
	});

	if (!res.ok) {
		throw new Error(`NASA APOD HTTP ${res.status}`);
	}

	const j = JSON.parse(await res.text()) as ApodJson;
	return {
		title: j.title,
		date: j.date,
		explanation: j.explanation,
		imageUrl: j.hdurl || j.url,
		copyright: j.copyright
	};
}
