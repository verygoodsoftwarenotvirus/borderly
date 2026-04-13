<script lang="ts">
	import L from 'leaflet';
	import { untrack } from 'svelte';
	import { disputes } from '../disputes';
	import { geodata } from '../geodata';
	import { UNDECIDED_COLOR } from '../colors';
	import type { Selections } from '../types';

	let {
		selections = $bindable(),
		onselectionchange
	}: {
		selections: Selections;
		onselectionchange?: () => void;
	} = $props();

	let mapContainer: HTMLDivElement;
	let map: L.Map;
	let geoLayers: Record<string, L.GeoJSON> = {};
	let flagMarkers: Record<string, L.Marker[]> = {};
	let centroids: Record<string, [number, number]> = {};

	function getPolygonStyle(disputeId: string, sels: Selections): L.PathOptions {
		const selection = sels[disputeId] ?? 0;
		const dispute = disputes.find((d) => d.id === disputeId);
		if (!dispute || selection === 0) {
			return {
				fillColor: UNDECIDED_COLOR,
				fillOpacity: 0.25,
				color: UNDECIDED_COLOR,
				weight: 2,
				dashArray: '6 4'
			};
		}
		const claimant = dispute.claimants[selection - 1];
		return {
			fillColor: claimant.color,
			fillOpacity: 0.45,
			color: claimant.color,
			weight: 2,
			dashArray: undefined
		};
	}

	function computeCentroid(feature: GeoJSON.Feature): [number, number] {
		const coords: number[][] = [];
		function collect(c: unknown) {
			if (typeof (c as number[])[0] === 'number') {
				coords.push(c as number[]);
			} else {
				for (const sub of c as unknown[]) {
					collect(sub);
				}
			}
		}
		collect((feature.geometry as GeoJSON.Polygon).coordinates);
		let lat = 0,
			lng = 0;
		for (const c of coords) {
			lng += c[0];
			lat += c[1];
		}
		return [lat / coords.length, lng / coords.length];
	}

	function rebuildFlagMarkers(sels: Selections) {
		for (const dispute of disputes) {
			// Remove old flag markers
			if (flagMarkers[dispute.id]) {
				for (const m of flagMarkers[dispute.id]) {
					m.remove();
				}
			}

			const feature = geodata[dispute.id];
			if (!feature) continue;

			const center = centroids[dispute.id];
			if (!center) continue;

			const markers: L.Marker[] = [];
			const count = dispute.claimants.length;
			const spacing = 30;
			const totalWidth = (count - 1) * spacing;

			dispute.claimants.forEach((claimant, i) => {
				const offsetX = -totalWidth / 2 + i * spacing;
				const selection = sels[dispute.id] ?? 0;
				const isSelected = selection === i + 1;
				const hasSelection = selection > 0;
				const opacity = hasSelection && !isSelected ? 0.4 : 1;

				const icon = L.divIcon({
					className: 'flag-marker',
					html: `<div class="flag-btn ${isSelected ? 'selected' : ''}" style="opacity: ${opacity}; font-size: 24px; cursor: pointer; text-align: center; filter: ${hasSelection && !isSelected ? 'grayscale(0.5)' : 'none'};" title="${claimant.label}">${claimant.flag}</div>`,
					iconSize: [32, 32],
					iconAnchor: [16, 16]
				});

				const marker = L.marker(center as L.LatLngExpression, {
					icon,
					zIndexOffset: isSelected ? 1000 : 0
				});

				marker.on('click', () => {
					if (selections[dispute.id] === i + 1) {
						selections[dispute.id] = 0;
					} else {
						selections[dispute.id] = i + 1;
					}
					onselectionchange?.();
				});

				marker.on('add', () => {
					const el = marker.getElement();
					if (el) {
						el.style.marginLeft = `${offsetX}px`;
					}
				});

				markers.push(marker);
			});

			flagMarkers[dispute.id] = markers;
			for (const m of markers) {
				m.addTo(map);
			}
		}
	}

	// Initialize map once
	$effect(() => {
		if (!mapContainer) return;

		map = L.map(mapContainer, {
			center: [20, 0],
			zoom: 3,
			minZoom: 2,
			maxZoom: 18,
			zoomControl: true,
			worldCopyJump: true
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		// Add GeoJSON layers for each dispute (style is set in the reactive effect)
		for (const dispute of disputes) {
			const feature = geodata[dispute.id];
			if (!feature) continue;

			centroids[dispute.id] = computeCentroid(feature);

			const layer = L.geoJSON(feature, {
				style: () => ({
					fillColor: UNDECIDED_COLOR,
					fillOpacity: 0.25,
					color: UNDECIDED_COLOR,
					weight: 2,
					dashArray: '6 4'
				}),
				onEachFeature: (_feature, layer) => {
					layer.bindTooltip(dispute.name, {
						sticky: true,
						className: 'territory-tooltip'
					});
				}
			});

			layer.addTo(map);
			geoLayers[dispute.id] = layer;
		}

		// Initial marker + style update
		untrack(() => {
			const sels = { ...selections };
			for (const dispute of disputes) {
				const layer = geoLayers[dispute.id];
				if (layer) {
					layer.setStyle(getPolygonStyle(dispute.id, sels));
				}
			}
			rebuildFlagMarkers(sels);
		});

		return () => {
			map.remove();
		};
	});

	// Reactive update when selections change
	$effect(() => {
		// Create dependency on selections by reading them
		const sels: Selections = {};
		for (const d of disputes) {
			sels[d.id] = selections[d.id];
		}
		if (!map) return;
		for (const dispute of disputes) {
			const layer = geoLayers[dispute.id];
			if (layer) {
				layer.setStyle(getPolygonStyle(dispute.id, sels));
			}
		}
		rebuildFlagMarkers(sels);
	});
</script>

<div class="map-wrapper">
	<div bind:this={mapContainer} class="map-container"></div>
</div>

<style>
	.map-wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.map-container {
		width: 100%;
		height: 100%;
	}

	:global(.flag-marker) {
		background: none !important;
		border: none !important;
	}

	:global(.flag-btn) {
		transition: opacity 0.2s, transform 0.2s;
		user-select: none;
		-webkit-user-select: none;
	}

	:global(.flag-btn:hover) {
		transform: scale(1.3);
	}

	:global(.flag-btn.selected) {
		transform: scale(1.2);
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
	}

	:global(.territory-tooltip) {
		font-size: 14px;
		font-weight: 600;
		padding: 4px 8px;
	}
</style>
