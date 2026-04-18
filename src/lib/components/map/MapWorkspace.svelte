<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import '$lib/components/map/mapPopup.css';
	import { onMount } from 'svelte';
	import type { GeoJSONSource, Map as MLMap, LngLatBoundsLike } from 'maplibre-gl';
	import { fetchMapEvents, fetchMapHeatmap } from '$lib/api/map';
	import { darkMapStyle } from '$lib/components/map/mapStyle';
	import {
		attachHoverPopups,
		showClickPopup,
		type HoverPopupController
	} from '$lib/components/map/mapPopup';
	import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
	import { describeAPIError } from '$lib/api/client';
	import {
		PIN_MIN_ZOOM,
		VIEWPORT_DEBOUNCE_MS,
		bboxFromBounds,
		keyFor,
		makeDebouncer,
		roundZoom,
		visibleClusters,
		visiblePins
	} from '$lib/services/map';
	import type {
		HeatmapCell,
		MapEventsData,
		MapHeatmapData,
		MapPinItem,
		MapClusterItem,
		MapBBox
	} from '$lib/types/map';

	const INITIAL_CENTER: [number, number] = [13.41, 52.52];
	const INITIAL_ZOOM = 3;
	const MAX_BOUNDS: LngLatBoundsLike = [
		[-179.9, -85],
		[179.9, 85]
	];

	const PIN_LAYER = 'veritas-pin-circle';
	const CLUSTER_LAYER = 'veritas-cluster-circle';

	let mapEl: HTMLDivElement | null = $state(null);
	let mapInstance: MLMap | null = null;
	let hoverCtrl: HoverPopupController | null = null;
	let PopupCtor: typeof import('maplibre-gl').Popup | null = null;
	let ready = $state(false);
	let loading = $state(false);
	let showHeatmap = $state(true);
	let lastKey = '';
	let errorMsg = $state<string | null>(null);
	let pins = $state<MapPinItem[]>([]);
	let clusters = $state<MapClusterItem[]>([]);
	let currentZoom = $state(INITIAL_ZOOM);

	async function loadData(bbox: MapBBox, zoom: number) {
		const key = keyFor({ bbox, zoom });
		if (key === lastKey) return;
		lastKey = key;
		loading = true;
		errorMsg = null;
		try {
			const [evData, heatData] = await Promise.all([
				fetchMapEvents(fetch, { bbox, zoom }),
				showHeatmap ? fetchMapHeatmap(fetch, { bbox, zoom, grid: 16 }) : Promise.resolve(null)
			]);
			applyEvents(evData, zoom);
			if (heatData) applyHeatmap(heatData);
			else setHeatmapSource([]);
		} catch (err) {
			errorMsg = describeAPIError(err, { fallback: 'Map fetch failed.' });
		} finally {
			loading = false;
		}
	}

	function applyEvents(data: MapEventsData, zoom: number) {
		pins = visiblePins(data.items, zoom);
		clusters = visibleClusters(data.items);
		setPinsSource(pins);
		setClustersSource(clusters);
	}

	function applyHeatmap(data: MapHeatmapData) {
		setHeatmapSource(data.cells ?? []);
	}

	function setPinsSource(list: MapPinItem[]) {
		if (!mapInstance) return;
		const src = mapInstance.getSource('veritas-pins') as GeoJSONSource | undefined;
		if (!src) return;
		src.setData({
			type: 'FeatureCollection',
			features: list.map((p) => ({
				type: 'Feature',
				id: p.id,
				geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
				properties: {
					id: p.id,
					title: p.title,
					type: p.type,
					locationName: p.locationName ?? '',
					description: p.description ?? '',
					happenedAt: p.happenedAt ?? '',
					imageUrl: p.imageUrl ?? '',
					impactScore: p.impactScore,
					articleDensity: p.articleDensity,
					analystConviction: p.analystConviction
				}
			}))
		});
	}

	function setClustersSource(list: MapClusterItem[]) {
		if (!mapInstance) return;
		const src = mapInstance.getSource('veritas-clusters') as GeoJSONSource | undefined;
		if (!src) return;
		src.setData({
			type: 'FeatureCollection',
			features: list.map((c) => ({
				type: 'Feature',
				id: c.id,
				geometry: { type: 'Point', coordinates: [c.lng, c.lat] },
				properties: { id: c.id, count: c.count, label: c.label }
			}))
		});
	}

	function setHeatmapSource(list: HeatmapCell[]) {
		if (!mapInstance) return;
		const src = mapInstance.getSource('veritas-heatmap') as GeoJSONSource | undefined;
		if (!src) return;
		const max = list.reduce((m, c) => Math.max(m, c.count), 0);
		src.setData({
			type: 'FeatureCollection',
			features: list.map((cell) => ({
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[cell.minLng, cell.minLat],
							[cell.maxLng, cell.minLat],
							[cell.maxLng, cell.maxLat],
							[cell.minLng, cell.maxLat],
							[cell.minLng, cell.minLat]
						]
					]
				},
				properties: { count: cell.count, sumImpact: cell.sumImpact, max }
			}))
		});
	}

	function addSourcesAndLayers(m: MLMap) {
		m.addSource('veritas-pins', {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: [] }
		});
		m.addSource('veritas-clusters', {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: [] }
		});
		m.addSource('veritas-heatmap', {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: [] }
		});

		m.addLayer({
			id: 'veritas-heatmap-fill',
			type: 'fill',
			source: 'veritas-heatmap',
			paint: {
				'fill-color': '#ec91ff',
				'fill-opacity': [
					'case',
					['<=', ['get', 'max'], 0],
					0,
					[
						'min',
						0.7,
						[
							'max',
							0.12,
							['+', 0.15, ['*', 0.55, ['/', ['get', 'count'], ['max', 1, ['get', 'max']]]]]
						]
					]
				]
			},
			layout: { visibility: 'none' }
		});

		m.addLayer({
			id: CLUSTER_LAYER,
			type: 'circle',
			source: 'veritas-clusters',
			paint: {
				'circle-radius': ['min', 28, ['+', 10, ['/', ['get', 'count'], 3]]],
				'circle-color': '#feb300',
				'circle-opacity': 0.72,
				'circle-stroke-color': '#ec91ff',
				'circle-stroke-width': 1.5
			}
		});

		m.addLayer({
			id: PIN_LAYER,
			type: 'circle',
			source: 'veritas-pins',
			paint: {
				'circle-radius': 6,
				'circle-color': '#ec91ff',
				'circle-stroke-color': '#0b0b0c',
				'circle-stroke-width': 1
			}
		});

		m.on('click', PIN_LAYER, (ev) => {
			const feat = ev.features?.[0];
			if (!feat || !PopupCtor) return;
			showClickPopup(m, PopupCtor, feat);
		});
	}

	function updateHeatmapVisibility() {
		if (!mapInstance) return;
		mapInstance.setLayoutProperty(
			'veritas-heatmap-fill',
			'visibility',
			showHeatmap ? 'visible' : 'none'
		);
	}

	function onShowHeatmap(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		showHeatmap = target.checked;
		updateHeatmapVisibility();
		if (mapInstance) {
			lastKey = '';
			const b = mapInstance.getBounds();
			const bbox = bboxFromBounds(
				b.getSouth(),
				b.getNorth(),
				b.getWest(),
				b.getEast()
			);
			loadData(bbox, currentZoom);
		}
	}

	onMount(() => {
		if (!mapEl) return;
		let disposed = false;
		const debouncer = makeDebouncer<[MapBBox, number]>(VIEWPORT_DEBOUNCE_MS, (bbox, zoom) => {
			if (!disposed) void loadData(bbox, zoom);
		});

		void import('maplibre-gl').then(({ Map, Popup }) => {
			if (disposed || !mapEl) return;
			PopupCtor = Popup;
			mapInstance = new Map({
				container: mapEl,
				style: darkMapStyle(),
				center: INITIAL_CENTER,
				zoom: INITIAL_ZOOM,
				minZoom: 1,
				maxBounds: MAX_BOUNDS,
				attributionControl: { compact: true }
			});

			mapInstance.on('load', () => {
				if (!mapInstance) return;
				addSourcesAndLayers(mapInstance);
				updateHeatmapVisibility();
				hoverCtrl = attachHoverPopups(mapInstance, Popup, {
					pinLayer: PIN_LAYER,
					clusterLayer: CLUSTER_LAYER
				});
				mapInstance.on('click', CLUSTER_LAYER, (ev) => {
					if (!mapInstance) return;
					const feat = ev.features?.[0];
					if (!feat) return;
					const c = clusters.find((cc) => cc.id === feat.properties?.id);
					if (!c) return;
					mapInstance.fitBounds(
						[
							[c.bounds.minLng, c.bounds.minLat],
							[c.bounds.maxLng, c.bounds.maxLat]
						],
						{ padding: 40, maxZoom: 10, duration: 400 }
					);
				});
				ready = true;
				const b = mapInstance.getBounds();
				currentZoom = roundZoom(mapInstance.getZoom());
				loadData(
					bboxFromBounds(b.getSouth(), b.getNorth(), b.getWest(), b.getEast()),
					currentZoom
				);
			});

			mapInstance.on('moveend', () => {
				if (!mapInstance) return;
				const b = mapInstance.getBounds();
				currentZoom = roundZoom(mapInstance.getZoom());
				debouncer.run(
					bboxFromBounds(b.getSouth(), b.getNorth(), b.getWest(), b.getEast()),
					currentZoom
				);
			});
		});

		return () => {
			disposed = true;
			debouncer.cancel();
			if (hoverCtrl) {
				hoverCtrl.dispose();
				hoverCtrl = null;
			}
			if (mapInstance) {
				mapInstance.remove();
				mapInstance = null;
			}
		};
	});
</script>

<div class="relative h-full min-h-0 w-full overflow-hidden bg-[#0e0e10]">
	<div bind:this={mapEl} class="absolute inset-0 h-full w-full" aria-label="Interactive map"></div>

	<label
		class="pointer-events-auto absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 flex cursor-pointer items-center gap-sp-2 rounded-sm border border-white/12 bg-[#141418]/95 px-sp-3 py-sp-2 font-sans text-label font-semibold uppercase tracking-wide text-ink shadow-[0_4px_24px_rgb(0_0_0/0.45)] backdrop-blur-md"
	>
		<input
			type="checkbox"
			class="h-4 w-4 accent-event"
			checked={showHeatmap}
			onchange={onShowHeatmap}
			aria-label="Toggle density heatmap"
		/>
		<span>Density heatmap</span>
	</label>

	{#if loading}
		<div
			class="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 border border-white/10 bg-[#141418]/92 px-sp-2 py-sp-1 font-sans text-label text-ink-muted backdrop-blur-sm"
			role="status"
		>
			Loading…
		</div>
	{/if}

	{#if ready && currentZoom < PIN_MIN_ZOOM}
		<div
			class="pointer-events-none absolute bottom-[max(2.75rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] z-20 max-w-[min(100%,24rem)] border border-white/10 bg-[#141418]/92 px-sp-2 py-sp-1 font-sans text-label text-ink-muted backdrop-blur-sm"
		>
			Zoom in to z ≥ {PIN_MIN_ZOOM} for pins · {pins.length} pin · {clusters.length} cluster
		</div>
	{/if}

	{#if errorMsg}
		<div
			class="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] z-30 max-h-[40%] overflow-auto"
		>
			<ErrorMessage title="Map" message={errorMsg} />
		</div>
	{/if}
</div>
