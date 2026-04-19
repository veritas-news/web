import { describe, expect, it } from 'vitest';

import {
	bandFromImpactScore,
	bandFromRelevanceGap,
	bandFromSentiment,
	bandFromVelocity,
	labelImpactBand,
	formatImpactLine,
	formatRelevanceGapLine,
	formatArticlesPerDay
} from './displayBands';

describe('displayBands', () => {
	it('maps impact to backend-aligned bands', () => {
		expect(bandFromImpactScore(0)).toBe('low');
		expect(bandFromImpactScore(39)).toBe('low');
		expect(bandFromImpactScore(40)).toBe('moderate');
		expect(bandFromImpactScore(74)).toBe('moderate');
		expect(bandFromImpactScore(75)).toBe('high');
		expect(labelImpactBand(bandFromImpactScore(60))).toBe('Moderate');
		expect(formatImpactLine(60)).toBe('Impact: Moderate');
	});

	it('classifies relevance gap around zero', () => {
		expect(bandFromRelevanceGap(0)).toBe('balanced');
		expect(bandFromRelevanceGap(30)).toBe('underreported');
		expect(bandFromRelevanceGap(-30)).toBe('overhyped');
		expect(formatRelevanceGapLine(2)).toContain('Balanced');
	});

	it('maps sentiment to five tones', () => {
		expect(bandFromSentiment(-80)).toBe('strongly_negative');
		expect(bandFromSentiment(0)).toBe('neutral');
		expect(bandFromSentiment(50)).toBe('positive');
	});

	it('maps velocity to steady band near zero', () => {
		expect(bandFromVelocity(0)).toBe('steady');
		expect(bandFromVelocity(-50)).toBe('declining');
		expect(bandFromVelocity(50)).toBe('accelerating');
	});

	it('formats articles/day', () => {
		expect(formatArticlesPerDay(2.4)).toBe('2.4 articles/day');
	});
});
