import type { Map as MLMap, MapGeoJSONFeature, Popup, PopupOptions } from 'maplibre-gl';

import { formatImpactLine, formatVelocityLine } from '$lib/metrics/displayBands';

/** Properties we surface as feature props for popup rendering (string-only for GeoJSON). */
export interface PinFeatureProps {
	id: string;
	type: string;
	title: string;
	locationName?: string;
	description?: string;
	happenedAt?: string;
	imageUrl?: string;
	impactScore?: number;
	articleDensity?: number;
	analystConviction?: number;
	velocityScoreV1?: number;
}

export interface ClusterFeatureProps {
	id: string;
	count: number;
	label: string;
}

type PopupCtor = new (opts?: PopupOptions) => Popup;

function escapeHTML(s: unknown): string {
	if (s == null) return '';
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function formatDateShort(iso?: string): string {
	if (!iso) return '';
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';
	return d.toISOString().slice(0, 16).replace('T', ' ') + 'Z';
}

function hrefFor(type: string, id: string): string {
	if (type === 'topic_event') return `/topics/${id}`;
	if (type === 'global_event') return `/global/${id}`;
	return `/events/${id}`;
}

export function renderPinPopupHTML(p: PinFeatureProps): string {
	const href = hrefFor(p.type, p.id);
	const meta: string[] = [];
	if (p.locationName) meta.push(escapeHTML(p.locationName));
	if (p.happenedAt) {
		const d = formatDateShort(p.happenedAt);
		if (d) meta.push(escapeHTML(d));
	}
	if (typeof p.impactScore === 'number') meta.push(escapeHTML(formatImpactLine(p.impactScore)));
	if (typeof p.velocityScoreV1 === 'number')
		meta.push(escapeHTML(formatVelocityLine(p.velocityScoreV1)));
	const img = p.imageUrl
		? `<img src="${escapeHTML(p.imageUrl)}" alt="" loading="lazy" style="display:block;width:100%;max-height:120px;object-fit:cover;margin-bottom:8px;border-radius:4px;border:1px solid rgba(255,255,255,0.08);" />`
		: '';
	const desc = p.description
		? `<p style="margin:4px 0 0;font-size:12px;line-height:1.45;color:#a8adb5;">${escapeHTML(p.description)}</p>`
		: '';
	return `
		<article style="min-width:200px;max-width:260px;font-family:inherit;color:#e5e7eb;">
			${img}
			<p style="margin:0 0 2px;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#8b919a;">${escapeHTML(p.type)}</p>
			<a href="${escapeHTML(href)}" style="display:block;margin:0;font-weight:600;font-size:13px;line-height:1.3;color:#f4f4f5;text-decoration:none;">${escapeHTML(p.title)}</a>
			${meta.length ? `<p style="margin:4px 0 0;font-size:11px;color:#a8adb5;">${meta.join(' · ')}</p>` : ''}
			${desc}
			<p style="margin:8px 0 0;font-size:11px;">
				<a href="${escapeHTML(href)}" style="color:#ec91ff;text-decoration:none;border-bottom:1px solid rgba(236,145,255,0.45);">Open detail →</a>
			</p>
		</article>
	`;
}

export function renderClusterPopupHTML(c: ClusterFeatureProps): string {
	return `
		<article style="min-width:160px;font-family:inherit;color:#e5e7eb;">
			<p style="margin:0 0 2px;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#8b919a;">cluster</p>
			<p style="margin:0;font-weight:600;font-size:13px;color:#f4f4f5;">${escapeHTML(c.label || `${c.count} items`)}</p>
			<p style="margin:4px 0 0;font-size:11px;color:#a8adb5;">Zoom in to see individual pins.</p>
		</article>
	`;
}

export interface HoverPopupController {
	dispose(): void;
}

export function attachHoverPopups(
	map: MLMap,
	PopupClass: PopupCtor,
	opts: {
		pinLayer: string;
		clusterLayer: string;
	}
): HoverPopupController {
	const hover = new PopupClass({
		closeButton: false,
		closeOnClick: false,
		closeOnMove: true,
		maxWidth: '280px',
		offset: 10,
		className: 'veritas-map-popup'
	});

	const onPinEnter = (ev: { features?: MapGeoJSONFeature[] }) => {
		const feat = ev.features?.[0];
		if (!feat) return;
		const coords = pointCoords(feat.geometry);
		if (!coords) return;
		map.getCanvas().style.cursor = 'pointer';
		const props = feat.properties as unknown as PinFeatureProps;
		hover.setLngLat(coords).setHTML(renderPinPopupHTML(props)).addTo(map);
	};
	const onPinLeave = () => {
		map.getCanvas().style.cursor = '';
		hover.remove();
	};
	const onClusterEnter = (ev: { features?: MapGeoJSONFeature[] }) => {
		const feat = ev.features?.[0];
		if (!feat) return;
		const coords = pointCoords(feat.geometry);
		if (!coords) return;
		map.getCanvas().style.cursor = 'pointer';
		const props = feat.properties as unknown as ClusterFeatureProps;
		hover.setLngLat(coords).setHTML(renderClusterPopupHTML(props)).addTo(map);
	};
	const onClusterLeave = () => {
		map.getCanvas().style.cursor = '';
		hover.remove();
	};

	map.on('mouseenter', opts.pinLayer, onPinEnter);
	map.on('mouseleave', opts.pinLayer, onPinLeave);
	map.on('mouseenter', opts.clusterLayer, onClusterEnter);
	map.on('mouseleave', opts.clusterLayer, onClusterLeave);

	return {
		dispose() {
			map.off('mouseenter', opts.pinLayer, onPinEnter);
			map.off('mouseleave', opts.pinLayer, onPinLeave);
			map.off('mouseenter', opts.clusterLayer, onClusterEnter);
			map.off('mouseleave', opts.clusterLayer, onClusterLeave);
			hover.remove();
		}
	};
}

export function showClickPopup(
	map: MLMap,
	PopupClass: PopupCtor,
	feat: MapGeoJSONFeature
): Popup | null {
	const props = feat.properties as unknown as PinFeatureProps;
	if (!props?.id || !props?.type) return null;
	const coords = pointCoords(feat.geometry);
	if (!coords) return null;
	const popup = new PopupClass({
		closeButton: true,
		closeOnClick: true,
		maxWidth: '300px',
		offset: 10,
		className: 'veritas-map-popup'
	});
	popup.setLngLat(coords).setHTML(renderPinPopupHTML(props)).addTo(map);
	return popup;
}

function pointCoords(geometry: MapGeoJSONFeature['geometry']): [number, number] | null {
	if (!geometry || geometry.type !== 'Point') return null;
	const c = (geometry as { coordinates: number[] }).coordinates;
	if (!Array.isArray(c) || c.length < 2) return null;
	const [lng, lat] = c;
	if (typeof lng !== 'number' || typeof lat !== 'number') return null;
	return [lng, lat];
}
