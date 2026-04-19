/**
 * Human-readable bands for Veritas measurement fields (presentation only; API stays numeric).
 *
 * Keep in sync with: `mobile/lib/metrics/displayBands.ts`
 *
 * Impact tiers match backend `impactBandV1` in
 * `backend/internal/analytics/event_explanation_v1.go` and
 * `backend/docs/ANALYTIC.md` (event explanation `impactBand`).
 *
 * Conviction uses the same 0–100 cutpoints as impact (product choice; no separate Go helper).
 *
 * Sentiment, relevance gap, velocity, and pulse activity thresholds are documented below
 * and are client-only (tunable).
 */

export type ImpactBand = 'low' | 'moderate' | 'high';
export type ConvictionBand = ImpactBand;

/** Five-level sentiment on −100..+100 */
export type SentimentTone =
	| 'strongly_negative'
	| 'negative'
	| 'neutral'
	| 'positive'
	| 'strongly_positive';

export type RelevanceGapTone = 'underreported' | 'balanced' | 'overhyped';

export type VelocityTrend = 'declining' | 'steady' | 'accelerating';

/** Windowed article density (articles/day); see `WindowedArticleDensityV1` in backend */
export type PulseActivityBand = 'quiet' | 'light' | 'moderate' | 'busy';

const IMPACT_HIGH = 75;
const IMPACT_MODERATE = 40;

/** Relevance gap: symmetric around 0 (int −100..100) */
const GAP_BALANCED = 25;

/** Velocity: symmetric tiers on −100..100 */
const VELOCITY_STEADY = 33;

/** Pulse density (articles/day): tunable activity ladder */
const PULSE_LIGHT = 0.5;
const PULSE_MODERATE = 2;
const PULSE_BUSY = 6;

function clamp0100(n: number): number {
	return Math.min(100, Math.max(0, Math.round(n)));
}

function clampSigned100(n: number): number {
	return Math.min(100, Math.max(-100, Math.round(n)));
}

export function bandFromImpactScore(score: number): ImpactBand {
	const x = clamp0100(score);
	if (x >= IMPACT_HIGH) return 'high';
	if (x >= IMPACT_MODERATE) return 'moderate';
	return 'low';
}

export function labelImpactBand(b: ImpactBand): string {
	switch (b) {
		case 'high':
			return 'High';
		case 'moderate':
			return 'Moderate';
		default:
			return 'Low';
	}
}

export function bandFromConvictionScore(score: number): ConvictionBand {
	return bandFromImpactScore(score);
}

export function labelConvictionBand(b: ConvictionBand): string {
	return labelImpactBand(b);
}

export function bandFromSentiment(raw: number): SentimentTone {
	const s = clampSigned100(raw);
	if (s <= -60) return 'strongly_negative';
	if (s <= -20) return 'negative';
	if (s < 20) return 'neutral';
	if (s < 60) return 'positive';
	return 'strongly_positive';
}

export function labelSentimentTone(t: SentimentTone): string {
	switch (t) {
		case 'strongly_negative':
			return 'Strongly negative';
		case 'negative':
			return 'Negative';
		case 'neutral':
			return 'Neutral';
		case 'positive':
			return 'Positive';
		default:
			return 'Strongly positive';
	}
}

export function sentimentDisplay(raw: number): string {
	return labelSentimentTone(bandFromSentiment(raw));
}

export function bandFromRelevanceGap(gap: number): RelevanceGapTone {
	const g = clampSigned100(gap);
	if (g > GAP_BALANCED) return 'underreported';
	if (g < -GAP_BALANCED) return 'overhyped';
	return 'balanced';
}

export function labelRelevanceGapTone(t: RelevanceGapTone): string {
	switch (t) {
		case 'underreported':
			return 'Underreported';
		case 'overhyped':
			return 'Overhyped';
		default:
			return 'Balanced';
	}
}

export function bandFromVelocity(v: number): VelocityTrend {
	const x = clampSigned100(v);
	if (x < -VELOCITY_STEADY) return 'declining';
	if (x > VELOCITY_STEADY) return 'accelerating';
	return 'steady';
}

export function labelVelocityTrend(t: VelocityTrend): string {
	switch (t) {
		case 'declining':
			return 'Declining';
		case 'accelerating':
			return 'Accelerating';
		default:
			return 'Steady';
	}
}

export function bandFromPulseDensity(articlesPerDay: number): PulseActivityBand {
	if (!Number.isFinite(articlesPerDay) || articlesPerDay <= 0) return 'quiet';
	if (articlesPerDay <= PULSE_LIGHT) return 'light';
	if (articlesPerDay <= PULSE_MODERATE) return 'moderate';
	if (articlesPerDay <= PULSE_BUSY) return 'busy';
	return 'busy';
}

export function formatArticlesPerDay(d: number): string {
	if (!Number.isFinite(d)) return '— articles/day';
	const rounded = Math.round(d * 10) / 10;
	return `${rounded} articles/day`;
}

export function labelPulseActivity(b: PulseActivityBand): string {
	switch (b) {
		case 'quiet':
			return 'Quiet';
		case 'light':
			return 'Light';
		case 'moderate':
			return 'Moderate';
		case 'busy':
			return 'Busy';
		default:
			return 'Moderate';
	}
}

export function formatPulseLine(pulseScoreV1: number): string {
	const d = pulseScoreV1;
	const band = bandFromPulseDensity(d);
	return `${formatArticlesPerDay(d)} · ${labelPulseActivity(band)}`;
}

export function formatImpactLine(score: number): string {
	return `Impact: ${labelImpactBand(bandFromImpactScore(score))}`;
}

export function formatConvictionLine(score: number): string {
	return `Conviction: ${labelConvictionBand(bandFromConvictionScore(score))}`;
}

export function formatRelevanceGapLine(gap: number): string {
	return `Coverage: ${labelRelevanceGapTone(bandFromRelevanceGap(gap))}`;
}

export function formatVelocityLine(velocity: number): string {
	return `Velocity: ${labelVelocityTrend(bandFromVelocity(velocity))}`;
}

/** Tooltip / title: expose raw numeric for power users */
export function titleImpactScore(score: number): string {
	return `impactScore: ${clamp0100(score)}`;
}

export function titleConvictionScore(score: number): string {
	return `analystConviction: ${clamp0100(score)}`;
}

export function titleVelocityScore(v: number): string {
	return `velocity_score_v1: ${clampSigned100(v)}`;
}

export function titlePulseScore(pulse: number): string {
	return `pulse_score_v1 (articles/day density): ${pulse}`;
}

export function titleRelevanceGap(g: number): string {
	return `relevance_gap_v1: ${clampSigned100(g)}`;
}
