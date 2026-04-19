import { APIError } from '$lib/api/client';
import { API_REQUEST_TIMEOUT_MS } from '$lib/config/api';

const BASE_PATH = '/v1';

export type IdentitySessionResult = {
	userId: string;
	deviceId: string;
	kind: string;
};

export type IdentityLinkResult = {
	userId: string;
	kind: string;
	linked: boolean;
	merged: boolean;
};

interface IdentityEnvelope {
	data?: IdentitySessionResult;
	error?: { code?: string; message?: string };
}

interface LinkEnvelope {
	data?: IdentityLinkResult;
	error?: { code?: string; message?: string };
}

export async function postIdentityLink(
	fetcher: typeof fetch,
	body: { deviceKey: string; platform: string },
	idToken: string
): Promise<IdentityLinkResult> {
	const url = `${BASE_PATH}/identity/link`;
	const res = await fetcher(url, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${idToken}`
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS)
	});

	const raw = await res.text();
	const json: LinkEnvelope = raw ? (JSON.parse(raw) as LinkEnvelope) : {};

	if (!res.ok) {
		throw new APIError(
			json.error?.code ?? 'link_failed',
			json.error?.message ?? 'Account link failed',
			res.status
		);
	}

	const data = json.data;
	if (!data?.userId) {
		throw new APIError('link_invalid', 'Link response missing userId', res.status);
	}
	return data;
}

export async function postIdentitySession(
	fetcher: typeof fetch,
	body: { userId?: string; deviceKey: string; platform: string }
): Promise<IdentitySessionResult> {
	const url = `${BASE_PATH}/identity/session`;
	const res = await fetcher(url, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS)
	});

	const raw = await res.text();
	const json: IdentityEnvelope = raw ? (JSON.parse(raw) as IdentityEnvelope) : {};

	if (!res.ok) {
		throw new APIError(
			json.error?.code ?? 'identity_failed',
			json.error?.message ?? 'Identity session failed',
			res.status
		);
	}

	const data = json.data;
	if (!data?.userId) {
		throw new APIError('identity_invalid', 'Identity response missing userId', res.status);
	}
	return data;
}
