<template>
	<div>
		<div id="live-container"></div>
	</div>
</template>
<script>
import Player from 'xgplayer';

export default {
	mounted() {
		const { innerWidth, innerHeight } = window;
		const player = new Player({
			id: 'live-container',
			url: 'http://192.168.74.50:8081/test.mp4',
			width: innerWidth,
			height: innerHeight,
			autoplay: true,
			definitionActive: 'click'
		});

		player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]);
	}
}
</script>
<style lang="scss" scoped>

</style>