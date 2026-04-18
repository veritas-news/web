import type { MapBBox, MapClusterItem, MapItem, MapPinItem } from '$lib/types/map';

/** Zoom threshold: at z <= PIN_MIN_ZOOM no pins rendered, only clusters + heatmap. */
export const PIN_MIN_ZOOM = 6;
export const HEATMAP_AUTO_ZOOM = 6;
export const VIEWPORT_DEBOUNCE_MS = 400;

export function isPinItem(it: MapItem): it is MapPinItem {
	return it.kind === 'pin';
}

export function isClusterItem(it: MapItem): it is MapClusterItem {
	return it.kind === 'cluster';
}

export function visiblePins(items: MapItem[], zoom: number): MapPinItem[] {
	if (zoom < PIN_MIN_ZOOM) return [];
	return items.filter(isPinItem);
}

export function visibleClusters(items: MapItem[]): MapClusterItem[] {
	return items.filter(isClusterItem);
}

export function bboxFromBounds(
	south: number,
	north: number,
	west: number,
	east: number
): MapBBox {
	return {
		minLat: clamp(south, -90, 90),
		maxLat: clamp(north, -90, 90),
		minLng: clamp(west, -180, 180),
		maxLng: clamp(east, -180, 180)
	};
}

function clamp(v: number, lo: number, hi: number): number {
	return Math.min(hi, Math.max(lo, v));
}

export function roundZoom(zoom: number): number {
	const z = Math.round(zoom);
	if (z < 0) return 0;
	if (z > 22) return 22;
	return z;
}

export function makeDebouncer<T extends unknown[]>(ms: number, fn: (...args: T) => void) {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return {
		run(...args: T) {
			if (timer != null) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				fn(...args);
			}, ms);
		},
		cancel() {
			if (timer != null) {
				clearTimeout(timer);
				timer = null;
			}
		}
	};
}

export function impactFillOpacity(count: number, maxCount: number): number {
	if (maxCount <= 0) return 0;
	const ratio = count / maxCount;
	return Math.max(0.12, Math.min(0.7, 0.15 + ratio * 0.55));
}

export interface ViewportFetchKey {
	bbox: MapBBox;
	zoom: number;
}

export function keyFor(v: ViewportFetchKey): string {
	const r = (n: number) => n.toFixed(2);
	return `${r(v.bbox.minLat)}|${r(v.bbox.maxLat)}|${r(v.bbox.minLng)}|${r(v.bbox.maxLng)}|${v.zoom}`;
}
