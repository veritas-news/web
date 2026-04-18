import { browser } from '$app/environment';

import { postIdentitySession } from '$lib/api/identity';
import { getOrCreateDeviceKey, getStoredUserId, setStoredUserId } from '$lib/identity/storage';

let sessionPromise: Promise<string> | null = null;

/**
 * Ensures an anonymous AppUser exists and caches id for timeline personalization.
 */
export function ensureAnonymousSession(): Promise<string> {
	if (!browser) {
		return Promise.resolve('');
	}
	if (!sessionPromise) {
		sessionPromise = runSession();
	}
	return sessionPromise;
}

async function runSession(): Promise<string> {
	const deviceKey = getOrCreateDeviceKey();
	const existing = getStoredUserId();
	const res = await postIdentitySession(fetch, {
		userId: existing ?? undefined,
		deviceKey,
		platform: 'web'
	});
	setStoredUserId(res.userId);
	return res.userId;
}

/** Clears in-flight session promise (e.g. after logout if added later). */
export function resetSessionCache(): void {
	sessionPromise = null;
}
