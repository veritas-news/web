import type { EventEvolution, InsightV1 } from '$lib/types/event';

/** Keeps the first few sentences so sections stay short. */
export function clipToSentences(text: string, maxSentences: number): string {
	const t = text.trim().replace(/\s+/g, ' ');
	if (!t || maxSentences <= 0) return '';
	const parts = t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0);
	if (parts.length <= maxSentences) {
		return parts.join(' ').trim();
	}
	return parts.slice(0, maxSentences).join(' ').trim();
}

/** Plain-language trust line (no x/100 in body copy). */
export function confidenceNarrative(insight: InsightV1): string {
	const s = Math.max(0, Math.min(100, Math.round(insight.confidenceScore)));
	const label = (insight.confidenceLabel || '').toLowerCase();

	if (label.includes('high') || s >= 78) {
		return 'Several outlets are lining up on the same facts, so this summary is a solid snapshot for now.';
	}
	if (label.includes('low') || s < 38) {
		return 'Coverage is still thin or split—use this as an early read that may shift as more reporting lands.';
	}
	if (label.includes('medium') || s >= 55) {
		return 'There is enough agreement to describe what is going on, but some details could still move.';
	}
	return 'Take this as a working picture: the main arc is visible, but finer points are still settling.';
}

export function evolutionNarrative(
	ev: Pick<EventEvolution, 'summary' | 'peerEventCount' | 'relationshipCount'>
): { summary: string; contextLine?: string } {
	let summary = clipToSentences(ev.summary, 2);
	const p = Math.max(0, ev.peerEventCount);
	const r = Math.max(0, ev.relationshipCount);

	let contextLine: string | undefined;
	if (p > 0 && r > 0) {
		contextLine = `You can open ${p} related stor${p === 1 ? 'y' : 'ies'} on the same topic and follow ${r} link${r === 1 ? '' : 's'} to see how this connects elsewhere.`;
	} else if (p > 0) {
		contextLine = `${p} related stor${p === 1 ? 'y sits' : 'ies sit'} on the same topic if you want side-by-side context.`;
	} else if (r > 0) {
		contextLine = `${r} link${r === 1 ? '' : 's'} show where this thread touches other angles worth a quick look.`;
	}

	if (!summary && contextLine) {
		summary = contextLine;
		return { summary, contextLine: undefined };
	}

	return { summary, contextLine };
}
