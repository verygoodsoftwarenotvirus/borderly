import type { Dispute } from './types';
import { claimantColors } from './colors';

export const disputes: Dispute[] = [
	{
		id: 'taiwan',
		name: 'Taiwan',
		description: 'Sovereignty dispute between the PRC and ROC',
		claimants: [
			{ id: 'china', label: 'China (PRC)', flag: '\u{1F1E8}\u{1F1F3}', color: claimantColors.china },
			{ id: 'taiwan', label: 'Taiwan (ROC)', flag: '\u{1F1F9}\u{1F1FC}', color: claimantColors.taiwan }
		],
		center: [23.5, 121],
		zoom: 7
	},
	{
		id: 'kashmir',
		name: 'Kashmir',
		description: 'Disputed since the 1947 partition of British India',
		claimants: [
			{ id: 'india', label: 'India', flag: '\u{1F1EE}\u{1F1F3}', color: claimantColors.india },
			{ id: 'pakistan', label: 'Pakistan', flag: '\u{1F1F5}\u{1F1F0}', color: claimantColors.pakistan },
			{ id: 'china', label: 'China', flag: '\u{1F1E8}\u{1F1F3}', color: claimantColors.china }
		],
		center: [34.5, 76],
		zoom: 7
	},
	{
		id: 'aksai-chin',
		name: 'Aksai Chin',
		description: 'Administered by China, claimed by India',
		claimants: [
			{ id: 'india', label: 'India', flag: '\u{1F1EE}\u{1F1F3}', color: claimantColors.india },
			{ id: 'china', label: 'China', flag: '\u{1F1E8}\u{1F1F3}', color: claimantColors.china }
		],
		center: [35.5, 79],
		zoom: 7
	},
	{
		id: 'crimea',
		name: 'Crimea',
		description: 'Annexed by Russia in 2014, internationally recognized as Ukraine',
		claimants: [
			{ id: 'ukraine', label: 'Ukraine', flag: '\u{1F1FA}\u{1F1E6}', color: claimantColors.ukraine },
			{ id: 'russia', label: 'Russia', flag: '\u{1F1F7}\u{1F1FA}', color: claimantColors.russia }
		],
		center: [45, 34],
		zoom: 8
	},
	{
		id: 'western-sahara',
		name: 'Western Sahara',
		description: 'Claimed by Morocco and the Sahrawi Arab Democratic Republic',
		claimants: [
			{ id: 'morocco', label: 'Morocco', flag: '\u{1F1F2}\u{1F1E6}', color: claimantColors.morocco },
			{ id: 'sahrawi', label: 'Sahrawi Republic', flag: '\u{1F1EA}\u{1F1ED}', color: claimantColors.sahrawi }
		],
		center: [24.5, -13],
		zoom: 6
	},
	{
		id: 'golan-heights',
		name: 'Golan Heights',
		description: 'Occupied by Israel since 1967, claimed by Syria',
		claimants: [
			{ id: 'israel', label: 'Israel', flag: '\u{1F1EE}\u{1F1F1}', color: claimantColors.israel },
			{ id: 'syria', label: 'Syria', flag: '\u{1F1F8}\u{1F1FE}', color: claimantColors.syria }
		],
		center: [33.1, 35.8],
		zoom: 10
	},
	{
		id: 'shebaa-farms',
		name: 'Shebaa Farms',
		description: 'Small area at the junction of Lebanon, Syria, and Israel',
		claimants: [
			{ id: 'israel', label: 'Israel', flag: '\u{1F1EE}\u{1F1F1}', color: claimantColors.israel },
			{ id: 'lebanon', label: 'Lebanon', flag: '\u{1F1F1}\u{1F1E7}', color: claimantColors.lebanon }
		],
		center: [33.27, 35.68],
		zoom: 12
	},
	{
		id: 'spratly',
		name: 'Spratly Islands',
		description: 'Contested by multiple nations in the South China Sea',
		claimants: [
			{ id: 'china', label: 'China', flag: '\u{1F1E8}\u{1F1F3}', color: claimantColors.china },
			{ id: 'vietnam', label: 'Vietnam', flag: '\u{1F1FB}\u{1F1F3}', color: claimantColors.vietnam },
			{ id: 'philippines', label: 'Philippines', flag: '\u{1F1F5}\u{1F1ED}', color: claimantColors.philippines },
			{ id: 'malaysia', label: 'Malaysia', flag: '\u{1F1F2}\u{1F1FE}', color: claimantColors.malaysia },
			{ id: 'brunei', label: 'Brunei', flag: '\u{1F1E7}\u{1F1F3}', color: claimantColors.brunei }
		],
		center: [10, 114],
		zoom: 7
	},
	{
		id: 'falklands',
		name: 'Falkland Islands',
		description: 'British Overseas Territory, claimed by Argentina',
		claimants: [
			{ id: 'uk', label: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', color: claimantColors.uk },
			{ id: 'argentina', label: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', color: claimantColors.argentina }
		],
		center: [-51.75, -59],
		zoom: 8
	},
	{
		id: 'northern-cyprus',
		name: 'Northern Cyprus',
		description: 'Occupied by Turkey since 1974, recognized only by Turkey',
		claimants: [
			{ id: 'cyprus', label: 'Cyprus', flag: '\u{1F1E8}\u{1F1FE}', color: claimantColors.cyprus },
			{ id: 'turkey', label: 'Turkey / TRNC', flag: '\u{1F1F9}\u{1F1F7}', color: claimantColors.turkey }
		],
		center: [35.2, 33.4],
		zoom: 9
	},
	{
		id: 'abkhazia',
		name: 'Abkhazia',
		description: 'De facto independent, recognized by Georgia as occupied territory',
		claimants: [
			{ id: 'georgia', label: 'Georgia', flag: '\u{1F1EC}\u{1F1EA}', color: claimantColors.georgia },
			{ id: 'abkhazia', label: 'Abkhazia / Russia', flag: '\u{1F1F7}\u{1F1FA}', color: claimantColors.abkhazia }
		],
		center: [43, 41],
		zoom: 8
	},
	{
		id: 'south-ossetia',
		name: 'South Ossetia',
		description: 'De facto independent, recognized by Georgia as occupied territory',
		claimants: [
			{ id: 'georgia', label: 'Georgia', flag: '\u{1F1EC}\u{1F1EA}', color: claimantColors.georgia },
			{ id: 'south_ossetia', label: 'South Ossetia / Russia', flag: '\u{1F1F7}\u{1F1FA}', color: claimantColors.south_ossetia }
		],
		center: [42.3, 44],
		zoom: 9
	},
	{
		id: 'transnistria',
		name: 'Transnistria',
		description: 'Breakaway region of Moldova with Russian military presence',
		claimants: [
			{ id: 'moldova', label: 'Moldova', flag: '\u{1F1F2}\u{1F1E9}', color: claimantColors.moldova },
			{ id: 'transnistria', label: 'Transnistria / Russia', flag: '\u{1F1F7}\u{1F1FA}', color: claimantColors.transnistria }
		],
		center: [47, 29.5],
		zoom: 8
	},
	{
		id: 'kuril-islands',
		name: 'Kuril Islands',
		description: 'Southern Kurils administered by Russia, claimed by Japan',
		claimants: [
			{ id: 'japan', label: 'Japan', flag: '\u{1F1EF}\u{1F1F5}', color: claimantColors.japan },
			{ id: 'russia', label: 'Russia', flag: '\u{1F1F7}\u{1F1FA}', color: claimantColors.russia }
		],
		center: [44.5, 146.5],
		zoom: 7
	},
	{
		id: 'palestine',
		name: 'Palestine',
		description: 'Palestinian territories occupied by Israel since 1967',
		claimants: [
			{ id: 'israel', label: 'Israel', flag: '\u{1F1EE}\u{1F1F1}', color: claimantColors.israel },
			{ id: 'palestine', label: 'Palestine', flag: '\u{1F1F5}\u{1F1F8}', color: claimantColors.palestine }
		],
		center: [31.5, 35.1],
		zoom: 9
	}
];
