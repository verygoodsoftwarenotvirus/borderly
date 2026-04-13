import type { Feature, Polygon, MultiPolygon } from 'geojson';

export interface Claimant {
	id: string;
	label: string;
	flag: string;
	color: string;
}

export interface Dispute {
	id: string;
	name: string;
	description: string;
	claimants: Claimant[];
	center: [number, number];
	zoom: number;
}

export type Selections = Record<string, number>;

export type TerritoryFeature = Feature<Polygon | MultiPolygon>;
