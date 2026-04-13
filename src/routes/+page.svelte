<script lang="ts">
	import '../app.css';
	import MapView from '$lib/components/MapView.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import { readSelectionsFromHash, writeSelectionsToHash } from '$lib/hash';
	import { onMount } from 'svelte';

	let selections = $state(readSelectionsFromHash());

	let hasAnySelection = $derived(Object.values(selections).some((v) => v > 0));

	function handleSelectionChange() {
		writeSelectionsToHash(selections);
	}

	function resetAll() {
		for (const key of Object.keys(selections)) {
			selections[key] = 0;
		}
		writeSelectionsToHash(selections);
	}

	onMount(() => {
		function onHashChange() {
			const newSelections = readSelectionsFromHash();
			for (const key of Object.keys(newSelections)) {
				selections[key] = newSelections[key];
			}
		}

		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	});
</script>

<svelte:head>
	<title>Borderly - Territorial Disputes Map</title>
</svelte:head>

<MapView bind:selections onselectionchange={handleSelectionChange} />
<div class="controls">
	{#if hasAnySelection}
		<button class="reset-btn" onclick={resetAll}>Reset All</button>
	{/if}
	<ShareButton />
</div>

<style>
	.controls {
		position: fixed;
		top: 12px;
		right: 12px;
		z-index: 1000;
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.reset-btn {
		background: white;
		border: 2px solid #333;
		border-radius: 6px;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		transition: background 0.15s;
	}

	.reset-btn:hover {
		background: #f0f0f0;
	}
</style>
