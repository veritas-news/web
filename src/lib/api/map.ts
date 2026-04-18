import { get } from '$lib/api/client';
import type { QueryParams } from '$lib/types/api';
import type { MapEventsData, MapHeatmapData, MapQuery } from '$lib/types/map';

function buildBBoxParams(opts: MapQuery, includeGrid: boolean): QueryParams {
	const params: QueryParams = {
		minLat: opts.bbox.minLat,
		maxLat: opts.bbox.maxLat,
		minLng: opts.bbox.minLng,
		maxLng: opts.bbox.maxLng,
		zoom: opts.zoom
	};
	if (opts.type) params.type = opts.type;
	if (opts.limit != null) params.limit = opts.limit;
	if (opts.minImpact != null) params.min_impact = opts.minImpact;
	if (opts.maxImpact != null) params.max_impact = opts.maxImpact;
	if (opts.topic) params.topic = opts.topic;
	if (opts.category) params.category = opts.category;
	if (includeGrid && opts.grid != null) params.grid = opts.grid;
	return params;
}

export function fetchMapEvents(
	fetcher: typeof fetch,
	opts: MapQuery
): Promise<MapEventsData> {
	return get<MapEventsData>(fetcher, '/map/events', buildBBoxParams(opts, false));
}

export function fetchMapHeatmap(
	fetcher: typeof fetch,
	opts: MapQuery
): Promise<MapHeatmapData> {
	return get<MapHeatmapData>(fetcher, '/map/heatmap', buildBBoxParams(opts, true));
}
