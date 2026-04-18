export interface AlertSignalsV1 {
	impactScore: number;
	analystConviction: number;
	eventStateV1: string;
	uncertaintyLevelV1: string;
	impactScopeV1: string;
	signalFingerprintV1: string;
}

/**
 * Optional peer-object preview attached to an alert item. Populated only when
 * the backend enriches `/v1/alerts`. See `web/docs/BACKEND_API_GAPS.md`
 * (alerts.preview) for the expected contract. UI degrades to id-only when
 * preview is absent.
 */
export interface AlertPreview {
	title?: string;
	subtitle?: string;
	description?: string;
	happenedAt?: string;
	lastUpdatedAt?: string;
	primaryCategory?: string;
	locationName?: string;
	imageUrl?: string;
}

export interface AlertItem {
	eventId: string;
	previousFingerprint?: string;
	currentFingerprint: string;
	signals: AlertSignalsV1;
	metricVersions?: Record<string, string>;
	preview?: AlertPreview;
}

export interface AlertsListPayload {
	schema_version: string;
	items: AlertItem[];
	metricVersions: Record<string, string>;
}

export type AlertsResult =
	| { kind: 'ok'; data: AlertsListPayload }
	| { kind: 'unavailable'; message: string }
	| { kind: 'error'; message: string };
