export interface MapBBox {
	minLat: number;
	maxLat: number;
	minLng: number;
	maxLng: number;
}

export interface MapPinItem {
	kind: 'pin';
	type: 'event' | 'topic_event' | 'global_event' | string;
	id: string;
	title: string;
	lat: number;
	lng: number;
	locationName?: string;
	locationConfidence?: number;
	locationSource: string;
	impactScore: number;
	articleDensity: number;
	relevanceGap: number;
	analystConviction: number;
	velocityScoreV1?: number;
	scoreExplain?: Record<string, unknown>;
	metricVersions?: Record<string, string>;
	/**
	 * Optional preview fields; populated only when the backend enriches
	 * /v1/map/events pins. See `web/docs/BACKEND_API_GAPS.md` (map.pin.preview).
	 */
	description?: string;
	happenedAt?: string;
	imageUrl?: string;
}

export interface MapClusterItem {
	kind: 'cluster';
	id: string;
	count: number;
	lat: number;
	lng: number;
	bounds: MapBBox;
	label: string;
}

export type MapItem = MapPinItem | MapClusterItem;

export interface MapGlobal {
	type: string;
	id: string;
	title: string;
	impactScore: number;
}

export interface MapEventsData {
	schema_version: string;
	bbox: MapBBox;
	zoom?: number;
	metricVersions: Record<string, string>;
	items: MapItem[];
	global_events: MapGlobal[];
}

export interface HeatmapCell {
	row: number;
	col: number;
	count: number;
	sumImpact: number;
	minLat: number;
	maxLat: number;
	minLng: number;
	maxLng: number;
}

export interface MapHeatmapData {
	schema_version: string;
	bbox: MapBBox;
	grid: number;
	metricVersions: Record<string, string>;
	cells: HeatmapCell[];
}

export type MapTypeFilter = 'event' | 'topic_event' | 'global_event';

export interface MapQuery {
	bbox: MapBBox;
	zoom: number;
	type?: MapTypeFilter;
	limit?: number;
	grid?: number;
	minImpact?: number;
	maxImpact?: number;
	topic?: string;
	category?: string;
	/** RFC3339 */
	timeStart?: string;
	/** RFC3339 */
	timeEnd?: string;
	minConviction?: number;
	maxConviction?: number;
}
