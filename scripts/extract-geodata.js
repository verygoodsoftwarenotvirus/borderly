import { readFileSync, writeFileSync } from 'fs';

const disputed = JSON.parse(readFileSync('/tmp/ne_50m_admin_0_breakaway_disputed_areas.geojson', 'utf8'));
const countries = JSON.parse(readFileSync('/tmp/ne_50m_admin_0_countries.geojson', 'utf8'));

const outDir = new URL('../src/lib/geodata/', import.meta.url).pathname;

function extract(features, matchFn, outFile) {
	const feature = features.find(matchFn);
	if (!feature) {
		console.error(`NOT FOUND: ${outFile}`);
		return;
	}
	const simplified = {
		type: 'Feature',
		properties: { name: feature.properties.NAME || feature.properties.BRK_NAME },
		geometry: feature.geometry
	};
	writeFileSync(`${outDir}/${outFile}`, JSON.stringify(simplified));
	const coords = JSON.stringify(simplified.geometry.coordinates);
	console.log(`${outFile}: ${(coords.length / 1024).toFixed(1)}KB`);
}

// From disputed areas dataset
extract(disputed.features, f => f.properties.BRK_NAME === 'Jammu and Kashmir', 'kashmir.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Aksai Chin', 'aksai-chin.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Golan Heights', 'golan-heights.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'W. Sahara' || f.properties.NAME === 'Morocco', 'western-sahara.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'N. Cyprus', 'northern-cyprus.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Kuril Is.', 'kuril-islands.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Abkhazia', 'abkhazia.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Transnistria', 'transnistria.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'South Ossetia', 'south-ossetia.json');
extract(disputed.features, f => f.properties.BRK_NAME === 'Crimea', 'crimea.json');

// From countries dataset
extract(countries.features, f => f.properties.NAME === 'Taiwan', 'taiwan.json');
extract(countries.features, f => f.properties.NAME === 'Falkland Is.', 'falklands.json');

console.log('\nDone extracting from Natural Earth.');
console.log('Still need manually: spratly.json, shebaa-farms.json');
