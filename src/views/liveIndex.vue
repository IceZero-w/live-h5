<template>
	<div>
		<div id="live-container"></div>
		<div class="live-top">
			<div class="live-room-info">
				<img src="" alt="">
			</div>
		</div>
	</div>
</template>
<script>
import 'xgplayer';
import Player from 'xgplayer-hls';
import { Toast } from 'mint-ui';

export default {
	data() {
		return {
			roomId: undefined, // 直播房间号id
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.roomId = this.getUrlParams('roomId');
			this.initPlayer();
			if (!this.roomId) {
				Toast({
					message: '直播房间号获取异常',
					duration: 1500,
					className: 'my-toast',
				});
				return;
			}
			this.getLiveRoomInfo();
		},
		// 初始化视频插件
		initPlayer() {
			const { innerWidth, innerHeight } = window;
			const player = new Player({
				id: 'live-container',
				url: '@/../test/index.m3u8',
				useHls: true,
				width: innerWidth,
				height: innerHeight,
				// volume: 0.6, // 音量
				// fitVideoSize: 'auto',
				videoInit: true, // 视屏初始化使用首帧
				// poster: 'http://192.168.74.50:8081/test.jpeg', // 封面图
				autoplay: true,
				controls: false, // 关闭视频默认控件
				lang: 'en',
				playsinline: true, // 关闭ios默认全屏行为
				'x5-video-player-type': 'h5',
				'x5-video-player-fullscreen': false,
			});

			player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]);
		},
		// 获取直播房间信息
		getLiveRoomInfo() {
			
		},
	},
}
</script>
<style lang="scss">
// 隐藏视频开始按钮
.xgplayer-start {
	opacity: 0;
}
</style>