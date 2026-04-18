import type { StyleSpecification } from 'maplibre-gl';

/**
 * Dark raster basemap (Carto Dark Matter, OSM data).
 * No vendor API key; include CARTO + OSM attribution.
 */
export function darkMapStyle(): StyleSpecification {
	return {
		version: 8,
		sources: {
			dark: {
				type: 'raster',
				tiles: [
					'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
					'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
					'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
					'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
				],
				tileSize: 256,
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors · <a href="https://carto.com/attribution" target="_blank" rel="noopener">© CARTO</a>'
			}
		},
		layers: [
			{
				id: 'dark-basemap',
				type: 'raster',
				source: 'dark',
				minzoom: 0,
				maxzoom: 20,
				paint: {
					'raster-brightness-min': 0.08,
					'raster-brightness-max': 0.92,
					'raster-saturation': -0.15,
					'raster-contrast': 0.08,
					'raster-fade-duration': 0
				}
			}
		]
	};
}
