import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import { API_REQUEST_TIMEOUT_MS } from '$lib/config/api';
import type {
	APIEnvelope,
	APIErrorPayload,
	PagedEnvelope,
	PagedResult,
	QueryParams
} from '$lib/types/api';

const DEFAULT_API_ORIGIN = 'https://veritas-sv.thinis.de';
const API_ORIGIN = normalizeOrigin(env.PUBLIC_API_BASE_URL || DEFAULT_API_ORIGIN);
const BASE_PATH = '/v1';

export class APIError extends Error {
	code: string;
	status: number;

	constructor(code: string, message: string, status: number) {
		super(message);
		this.name = 'APIError';
		this.code = code;
		this.status = status;
	}
}

interface ErrorLabels {
	notFound?: string;
	fallback?: string;
}

export async function get<T>(
	fetcher: typeof fetch,
	path: string,
	params?: QueryParams
): Promise<T> {
	const payload = await request<APIEnvelope<T>>(fetcher, path, params);
	return payload.data;
}

export async function getPaged<T>(
	fetcher: typeof fetch,
	path: string,
	params?: QueryParams
): Promise<PagedResult<T>> {
	const payload = await request<PagedEnvelope<T>>(fetcher, path, params);

	return {
		items: payload.data.items,
		nextCursor: payload.data.next_cursor ?? null,
		meta: {
			count: payload.meta.count,
			limit: payload.meta.limit,
			cursor: payload.meta.cursor ?? null
		}
	};
}

/** Full `{ data, meta }` envelope (e.g. search). */
export async function readEnvelope<
	Data,
	Meta extends Record<string, unknown> = Record<string, unknown>
>(fetcher: typeof fetch, path: string, params?: QueryParams): Promise<{ data: Data; meta?: Meta }> {
	return request<{ data: Data; meta?: Meta }>(fetcher, path, params);
}

export function describeAPIError(error: unknown, labels: ErrorLabels = {}): string {
	if (error instanceof APIError) {
		switch (error.status) {
			case 404:
				return labels.notFound ?? 'Requested item not found.';
			case 429:
				return 'Rate limited. Retry in a moment.';
			case 503:
			case 504:
				return 'Server unavailable. Retrying...';
			default:
				return error.message || labels.fallback || 'Unexpected API error.';
		}
	}

	if (error instanceof Error && error.name === 'AbortError') {
		return 'Request timed out.';
	}

	if (error instanceof TypeError) {
		return 'Connection error.';
	}

	return labels.fallback ?? 'Unexpected error.';
}

async function request<T>(fetcher: typeof fetch, path: string, params?: QueryParams): Promise<T> {
	const response = await fetcher(buildPath(path, params), {
		headers: {
			accept: 'application/json'
		},
		signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS)
	});

	const payload = await parseJSON(response);

	if (!response.ok) {
		const errorPayload = payload as APIErrorPayload;
		throw new APIError(
			errorPayload.error?.code ?? 'request_failed',
			errorPayload.error?.message ?? response.statusText ?? 'Request failed',
			response.status
		);
	}

	return payload as T;
}

function buildPath(path: string, params?: QueryParams): string {
	const url = browser
		? new URL(`${BASE_PATH}${path}`, 'http://local.veritas')
		: new URL(`${BASE_PATH}${path}`, API_ORIGIN);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value == null || value === '') continue;
			url.searchParams.set(key, String(value));
		}
	}

	return browser ? `${url.pathname}${url.search}` : url.toString();
}

async function parseJSON(response: Response): Promise<unknown> {
	const raw = await response.text();
	if (!raw) return {};

	try {
		return JSON.parse(raw) as unknown;
	} catch {
		if (!response.ok) {
			throw new APIError('invalid_json', 'Server returned invalid JSON.', response.status);
		}

		return {};
	}
}

function normalizeOrigin(value: string): string {
	const trimmed = value.trim();
	if (!trimmed) return DEFAULT_API_ORIGIN;

	try {
		const url = new URL(trimmed);
		return url.origin;
	} catch {
		return DEFAULT_API_ORIGIN;
	}
}
