import { authState } from '$lib/identity/auth-state.svelte';

/**
 * Wraps fetch to inject Authorization: Bearer <idToken> when the user is
 * signed in via Firebase.
 */
export async function authedFetch(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	const token = await authState.getIdToken();
	const headers = new Headers(init?.headers);
	if (token) {
		headers.set('authorization', `Bearer ${token}`);
	}
	return fetch(input, { ...init, headers });
}
