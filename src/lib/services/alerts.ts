import type { AlertSignalsV1 } from '$lib/types/alerts';

export type ChipVariant = 'event' | 'topic' | 'global' | 'neutral';

export function scopeVariant(scope: string | undefined): ChipVariant {
	if (scope === 'global') return 'global';
	if (scope === 'regional') return 'topic';
	if (scope === 'local') return 'event';
	return 'neutral';
}

export function stateVariant(state: string | undefined): ChipVariant {
	if (state === 'breaking') return 'event';
	if (state === 'developing') return 'topic';
	if (state === 'stable') return 'neutral';
	return 'neutral';
}

export function shortFingerprint(fp: string | undefined, max = 16): string {
	if (!fp) return '—';
	if (fp.length <= max) return fp;
	return `${fp.slice(0, max)}…`;
}

/**
 * Normalize a fingerprint to its first useful segment if the server returns
 * algorithm-prefixed values (e.g. `sha256:abcdef…`). Safe no-op otherwise.
 */
export function fingerprintBody(fp: string | undefined): string {
	if (!fp) return '';
	const colon = fp.indexOf(':');
	return colon >= 0 ? fp.slice(colon + 1) : fp;
}

export function formatAlertDate(iso: string | undefined): string {
	if (!iso) return '';
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';
	return d.toISOString().slice(0, 16).replace('T', ' ') + 'Z';
}

export function clamp(n: number, lo: number, hi: number): number {
	if (Number.isNaN(n)) return lo;
	return Math.max(lo, Math.min(hi, n));
}

export function impactPct(signals: AlertSignalsV1): number {
	return Math.round(clamp(signals.impactScore, 0, 100));
}

export function convictionPct(signals: AlertSignalsV1): number {
	return Math.round(clamp(signals.analystConviction, 0, 100));
}
