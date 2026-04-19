/** GET /v1/briefing/daily — aligned with backend briefingDailyResponse */
export interface BriefingLine {
	title: string;
	description?: string;
	blurb: string;
	itemRef: string;
	/** topic | global | event */
	itemType: string;
	timeStart?: string;
	timeEnd?: string;
	/** Present when backend includes velocity on briefing lines */
	velocity_score_v1?: number;
}

export interface BriefingDailyData {
	generatedAt: string;
	windowHours: number;
	lines: BriefingLine[];
	pulseHeadline: string;
	metricVersions: Record<string, string>;
}

export interface BriefingQuery {
	windowHours?: number;
}
