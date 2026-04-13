import type { TerritoryFeature } from '../types';

import taiwan from './taiwan.json';
import kashmir from './kashmir.json';
import aksaiChin from './aksai-chin.json';
import crimea from './crimea.json';
import westernSahara from './western-sahara.json';
import golanHeights from './golan-heights.json';
import shebaaFarms from './shebaa-farms.json';
import spratly from './spratly.json';
import falklands from './falklands.json';
import northernCyprus from './northern-cyprus.json';
import abkhazia from './abkhazia.json';
import southOssetia from './south-ossetia.json';
import transnistria from './transnistria.json';
import kurilIslands from './kuril-islands.json';
import palestine from './palestine.json';

export const geodata: Record<string, TerritoryFeature> = {
	'taiwan': taiwan as TerritoryFeature,
	'kashmir': kashmir as TerritoryFeature,
	'aksai-chin': aksaiChin as TerritoryFeature,
	'crimea': crimea as TerritoryFeature,
	'western-sahara': westernSahara as TerritoryFeature,
	'golan-heights': golanHeights as TerritoryFeature,
	'shebaa-farms': shebaaFarms as TerritoryFeature,
	'spratly': spratly as TerritoryFeature,
	'falklands': falklands as TerritoryFeature,
	'northern-cyprus': northernCyprus as TerritoryFeature,
	'abkhazia': abkhazia as TerritoryFeature,
	'south-ossetia': southOssetia as TerritoryFeature,
	'transnistria': transnistria as TerritoryFeature,
	'kuril-islands': kurilIslands as TerritoryFeature,
	'palestine': palestine as TerritoryFeature
};
