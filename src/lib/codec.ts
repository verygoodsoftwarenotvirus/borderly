import { disputes } from './disputes';
import type { Selections } from './types';

export function encode(selections: Selections): string {
	const bytes = new Uint8Array(disputes.length);
	for (let i = 0; i < disputes.length; i++) {
		bytes[i] = selections[disputes[i].id] ?? 0;
	}

	const binary = String.fromCharCode(...bytes);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decode(hash: string): Selections {
	const selections: Selections = {};

	if (!hash) {
		for (const d of disputes) {
			selections[d.id] = 0;
		}
		return selections;
	}

	let padded = hash.replace(/-/g, '+').replace(/_/g, '/');
	while (padded.length % 4 !== 0) {
		padded += '=';
	}

	let bytes: Uint8Array;
	try {
		const binary = atob(padded);
		bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
	} catch {
		for (const d of disputes) {
			selections[d.id] = 0;
		}
		return selections;
	}

	for (let i = 0; i < disputes.length; i++) {
		const value = i < bytes.length ? bytes[i] : 0;
		const maxIndex = disputes[i].claimants.length;
		selections[disputes[i].id] = value > 0 && value <= maxIndex ? value : 0;
	}

	return selections;
}
