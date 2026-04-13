import { encode, decode } from './codec';
import type { Selections } from './types';

export function readSelectionsFromHash(): Selections {
	if (typeof window === 'undefined') return decode('');
	const raw = window.location.hash.slice(1);
	return decode(raw);
}

export function writeSelectionsToHash(selections: Selections): void {
	if (typeof window === 'undefined') return;
	const encoded = encode(selections);
	// Use native API; SvelteKit warning is harmless since we only touch the hash fragment
	window.history.replaceState(window.history.state, '', `#${encoded}`);
}
