const B64_PREFIX = 'b64.';

/**
 * Encode an arbitrary article id (e.g. full URL) as a single path segment.
 * Percent-encoding in paths breaks when `%2F` becomes `/` and splits the route.
 */
export function encodeArticleRouteSegment(id: string): string {
	const bytes = new TextEncoder().encode(id);
	let binary = '';
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]!);
	}
	const b64 = btoa(binary);
	const urlish = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	return `${B64_PREFIX}${urlish}`;
}

/** Reverse {@link encodeArticleRouteSegment}. */
export function decodeArticleRouteSegment(segment: string): string {
	const s = segment.trim();
	if (!s) throw new Error('Missing article id');

	if (s.startsWith(B64_PREFIX)) {
		const payload = s.slice(B64_PREFIX.length);
		const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
		const bin = atob(b64 + pad);
		const bytes = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
		return new TextDecoder().decode(bytes);
	}

	try {
		return decodeURIComponent(s);
	} catch {
		return s;
	}
}

export function articleDetailPath(id: string): string {
	return `/articles/${encodeArticleRouteSegment(id)}`;
}

/** Resolve `params.id` from `/articles/[id]` for API calls. */
export function resolveArticleIdFromParam(param: string): string {
	return decodeArticleRouteSegment(param);
}
