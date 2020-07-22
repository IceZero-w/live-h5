<template>
	<div>
		<div id="live-container"></div>
		<!-- 直播间信息模块 -->
		<div class="live-top layout-top">
			<div class="live-room-info">
				<img :src="liveRoomDetail.logo" alt="">
				<div class="room-name-id">
					<p>{{ liveRoomDetail.roomNick }}</p>
					<p>ID:{{ liveRoomDetail.id }}</p>
				</div>
				<div class="attention-btn">关注</div>
			</div>
			<div class="live-room">
				<template v-if="liveRoomDetail.livePersonList && liveRoomDetail.livePersonList.length"></template>
				<img v-for="(item, index) in liveRoomDetail.livePersonList" class="visit-person-img" :key="index" :src="item.userAvatar" alt="">
				<div class="live-num">{{ liveRoomDetail.liveNum }}</div>
			</div>
		</div>
		<!-- 头部社群模块 -->
		<div class="live-room-middle layout-top">
			<div class="community-box">
				<img src="../assets/community.png" alt="">
				<span>进入他的社群</span>
			</div>
			<div class="more-live">
				<img src="../assets/more-live.png" alt="">
			</div>
		</div>
		<!-- 商品模块 -->
		<div class="good-item layout-top">
			<div class="good-top">
				<img src="../assets/buy-daizi.png" alt="">
				<span>宝贝上架了，快来抢哟~</span>
				<img src="../assets/close-circle.png" alt="">	
			</div>
			<div class="good-bottom">
				<img :src="goodInfo.goodMainPic" alt="">
				<div class="good-name-price">
					<p class="good-name">{{ goodInfo.goodName }}</p>
					<p class="good-price">{{ getPrice(goodInfo.goodPrice) }}</p>
				</div>
			</div>
		</div>

		<!-- 直播间操作模块 -->
		<div class="live-operator-box layout-top">
			<div class="coment-box">说点什么...</div>
			<div class="live-operator-btn">
				<img src="../assets/daizi.png" alt="">
				<img src="../assets/gift.png" alt="">
			</div>
		</div>

		<div class="app-download-dialog layout-top">
			<img src="../assets/app-logo.png" alt="">
			<div class="app-download-text">
				<p class="text-download">下载聚圈APP</p>
				<p class="text-waiting">APP内打开，更多精彩在等你～</p>
			</div>
			<div class="download-btn">下载</div>
			<img src="../assets/close-app.png" alt="">
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
			// 直播房间信息
			liveRoomDetail: {},
			// 直播间推荐的商品数据
			goodInfo: {},
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
			this.getGoodInfo();
		},
		// 初始化视频插件
		initPlayer() {
			const { innerWidth, innerHeight } = window;
			const player = new Player({
				id: 'live-container',
				url: '../../test/index.m3u8',
				useHls: true,
				width: innerWidth,
				height: innerHeight,
				// volume: 0.6, // 音量
				fitVideoSize: 'auto',
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
		async getLiveRoomInfo() {
			const data = {
				logo: '../assets/logo.png',
				roomName: '沐沐的直播间',
				id: 66666,
				roomNick: '沐沐木木木',
				livePersonList: [
					{
						userAvatar: '../assets/logo.png',
					},
					{
						userAvatar: '../assets/logo.png',
					},
					{
						userAvatar: '../assets/logo.png',
					},
					{
						userAvatar: '../assets/logo.png',
					},
				],
				liveNum: 100,
			};
			this.liveRoomDetail = data;
		},
		// 获取直播间 商品的信息
		async getGoodInfo() {
			const data = {
				goodMainPic: '../assets/app-logo.png',
				goodName: 'IWC/万国官方正品飞行员系列 男士手表精钢机械腕表',
				goodPrice: 100000,
			};
			this.goodInfo = data;
		},
	},
}
</script>
<style lang="scss">
// 隐藏视频开始按钮
.xgplayer-start {
	opacity: 0;
}

.layout-top {
	position: fixed;
	z-index: 99;
	box-sizing: border-box;
}

.live-top {
	top: 20px;
	left: 0;
	right: 0;
	padding: 0px 30px;
}

.live-room-middle {
	top: 112px;
	padding-left: 30px;
}

.good-item {
	bottom: 106px;
	left: 0;
	width: 480px;
	height: 180px;
}

.live-operator-box {
	bottom: 20px;
	left: 0;
	right: 0;
	padding: 0px 30px;
}

.app-download-dialog {
	z-index: 999;
	left: 0;
	right: 0;
	bottom: 0;
	height: 170px;
	background:rgba(0, 0, 0, 0.8);
}
</style>