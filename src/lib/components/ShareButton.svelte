<script lang="ts">
	let copied = $state(false);

	function share() {
		navigator.clipboard.writeText(window.location.href).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
</script>

<button class="share-btn" onclick={share}>
	{copied ? 'Copied!' : 'Share Map'}
</button>

<style>
	.share-btn {
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

	.share-btn:hover {
		background: #f0f0f0;
	}
</style>
