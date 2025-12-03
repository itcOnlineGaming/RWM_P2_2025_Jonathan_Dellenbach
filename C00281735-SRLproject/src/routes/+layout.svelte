<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	let { children } = $props();
</script>

<a href={`${base}/visualOptions`}>Go to visual</a>
<a href={`${base}/timerOptions`}>Go to timer</a>
<a href={`${base}/lavaLampVisual`}>Go to lava-lamp</a>
<a href={`${base}/flowingGooVisual`}>Go to flowing-goo</a>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
