export type PulseMode = 'pulse' | 'relevance_gap' | 'impact';
export type PulseItemType = 'topic_event' | 'global_event';

export interface PulseItem {
	id: string;
	type: PulseItemType;
	title: string;
	impactScore: number;
	pulse_score_v1: number;
	relevance_gap_v1: number;
	velocity_score_v1?: number;
	impactScopeV1?: string;
	article_count_in_window: number;
	metricVersions?: Record<string, string>;
	/** Present when API includes explain maps (e.g. velocity) */
	scoreExplain?: Record<string, unknown>;
}

export interface PulseData {
	window_hours: number;
	window_start: string;
	window_end: string;
	metricVersions: Record<string, string>;
	mode: PulseMode;
	items: PulseItem[];
}

export interface DashboardPulseData {
	schema_version: string;
	window_hours: number;
	window_start: string;
	window_end: string;
	metricVersions: Record<string, string>;
	mode: PulseMode;
	topics: PulseItem[];
	globals: PulseItem[];
}

export interface PulseQuery {
	windowHours?: number;
	limit?: number;
	mode?: PulseMode;
}
