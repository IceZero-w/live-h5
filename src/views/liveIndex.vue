<template>
	<div>
		<div id="live-container"></div>
		<!-- 直播间信息模块 -->
		<div class="live-top layout-top" @click="goDownload()">
			<div class="live-room-info">
				<img class="room-logo" :src="liveRoomDetail.logo" alt="">
				<div class="room-name-id">
					<span class="room-nick">{{ liveRoomDetail.roomNick }}</span>
					<span class="room-id">ID:{{ liveRoomDetail.id }}</span>
				</div>
				<div class="attention-btn">关注</div>
			</div>
			<div class="live-room-visit">
				<template v-if="liveRoomDetail.livePersonList && liveRoomDetail.livePersonList.length && liveRoomDetail.livePersonList.length <= 4">
					<img v-for="(item, index) in liveRoomDetail.livePersonList" class="room-logo visit-person-img" :key="index" :src="item.userAvatar" alt="">
				</template>
				<div class="room-logo live-num">{{ formatPersonNum(liveRoomDetail.liveNum) }}</div>
			</div>
		</div>
		<!-- 头部社群模块 -->
		<div class="community-box layout-top" @click="goDownload()">
			<img class="community-img" src="../assets/community.png" alt="">
			<div class="community-text">进入他的社群</div>
			<img class="community-img" src="../assets/arrow-right.png" alt="">
		</div>
		<div class="more-live layout-top" @click="goDownload()">
			<img class="more-live-img" src="../assets/more-live.png" alt="">
		</div>
		<!-- 商品模块 -->
		<div class="good-item layout-top" @click="goDownload()">
			<div class="good-top">
				<div class="good-top-left">
					<img class="good-top-icon1" src="../assets/buy-daizi.png" alt="">
					<span>宝贝上架了，快来抢哟~</span>
				</div>
				<img class="good-top-right" src="../assets/close-circle.png" alt="">	
			</div>
			<div class="good-bottom">
				<img class="good-pic" :src="goodInfo.goodMainPic" alt="">
				<div class="good-name-price">
					<div class="good-name">{{ goodInfo.goodName }}</div>
					<div class="good-price">
						<span>¥</span>
						<span class="good-price-num">{{ getPrice(goodInfo.goodPrice) }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 直播间操作模块 -->
		<div class="live-operator-box layout-top" @click="goDownload()">
			<div class="coment-box">说点什么...</div>
			<div class="live-operator-btn">
				<img class="live-operator-btn-icon" src="../assets/daizi.png" alt="">
				<img class="live-operator-btn-icon" src="../assets/gift.png" alt="">
			</div>
		</div>

		<div class="app-download-dialog layout-top" v-if="downloadDialog === true">
			<div class="app-info">
				<img class="app-logo" src="../assets/app-logo.png" alt="">
				<div class="app-download-text">
					<div class="text-download">下载聚圈APP</div>
					<div class="text-waiting">APP内打开，更多精彩在等你～</div>
				</div>
			</div>
			<div class="app-operator-btn">
				<div class="download-btn" @click="goDownload()">下载</div>
				<img class="download-close" @click="closeDialog" src="../assets/close-app.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
import 'xgplayer';
import Player from 'xgplayer-hls';
import { Toast } from 'mint-ui';
import { getLiveData, getLiveRoomInfo, getGoodInfo } from '@/api/live';
// import { iconAsset } from '@/assets'
let Timer;
export default {
	data() {
		return {
			roomId: undefined, // 直播房间号id
			// 直播房间信息
			liveRoomDetail: {},
			// 直播间推荐的商品数据
			goodInfo: {},

			downloadDialog: false, // 控制下载弹窗
		};
	},
	mounted() {
		this.init();
		Timer = setTimeout(() => {
			this.downloadDialog = true;
			clearTimeout(Timer);
			Timer = null;
		}, 5000)
	},
	destroyed() {
		clearTimeout(Timer);
		Timer = null;
	},
	methods: {
		init() {
			this.roomId = this.getUrlParams('roomId');
			if (!this.roomId) {
				Toast({
					message: '直播房间号获取异常',
					duration: 1500,
					className: 'my-toast',
				});
				return;
			}
			this.getLiveDataFn();
			this.getLiveRoomInfoFn();
			this.getGoodInfoFn();
		},
		// 获取直播数据
		async getLiveDataFn() {
			const params = {
				roomId: this.roomId,
			};
			const data = await getLiveData(params);
			console.log(data, 'koskodks')
			const { url } = data || {};
			this.initPlayer(url);
		},
		// 初始化视频插件
		initPlayer(url) {
			const { innerWidth, innerHeight } = window;
			const player = new Player({
				id: 'live-container',
				url,
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
		async getLiveRoomInfoFn() {
			const params = {
				roomId: this.roomId,
			};
			const data = await getLiveRoomInfo(params);
			// const data = {
			// 	logo: require('../assets/logo.png'),
			// 	roomName: '沐沐的直播间',
			// 	id: 66666,
			// 	roomNick: '沐沐木木木',
			// 	livePersonList: [
			// 		{
			// 			userAvatar: require('../assets/logo.png'),
			// 		},
			// 		{
			// 			userAvatar: require('../assets/logo.png'),
			// 		},
			// 		{
			// 			userAvatar: require('../assets/logo.png'),
			// 		},
			// 		{
			// 			userAvatar: require('../assets/logo.png'),
			// 		},
			// 	],
			// 	liveNum: 900,
			// };
			this.liveRoomDetail = data;
		},
		// 获取直播间 商品的信息
		async getGoodInfoFn() {
			const params = {
				roomId: this.roomId,
			};
			const data = await getGoodInfo(params);
			// const data = {
			// 	goodMainPic: require('../assets/app-logo.png'),
			// 	goodName: 'IWC/万国官方正品飞行员系列 男士手表精钢机械腕表',
			// 	goodPrice: 100000,
			// };
			this.goodInfo = data;
		},

		// 关闭弹窗
		closeDialog() {
			this.downloadDialog = false;
		},

		// 前往下载页面
		goDownload() {
			if (this.isIOS()) {
				window.open(`https://itunes.apple.com/cn/app/id1502999426?mt=${this.$route.query.roomId}`)
			} else {
				if (!this.isWeixin() && !this.isIOS()) {
					window.open(`https://shouji.baidu.com/software/27111703.html?roomId=${this.$route.query.roomId}`)
				} else {
					this.$router.push({
						path: 'liveDownload',
						query: {
							roomId: this.roomId,
						},
					});
				}
			}
		},
	},
}
</script>
<style lang="scss">
// 隐藏视频开始按钮
.xgplayer-start {
	opacity: 0;
}

.room-logo {
	width: 62px;
	height: 62px;
}

.layout-top {
	position: fixed;
	z-index: 998;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.live-top {
	top: 20px;
	left: 0;
	right: 0;
	padding: 0px 30px;

	.live-room-info {
		width: 330px;
		height: 76px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background:rgba(0,0,0, .2);
		border-radius:38px;

		.room-name-id {
			width: 140px;
			height: 60px;
			color: #fff;
			font-size: 22px;
			text-align: left;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.room-nick {
				font-size: 28px;
				width: 160px;
				height: 26px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

			}

		}

		.attention-btn {
			width: 96px;
			height: 64px;
			// background: url('');
			background: #fff;
			background-size: 100%;
			color: #AB3DF4;
			font-size: 28px;
			text-align: center;
			border-radius: 32px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.live-room-visit {
		display: flex;

		.visit-person-img {
			margin-right: 10px;
		}

		.live-num {
			background: rgba(0, 0, 0, .3);
			text-align: center;
			line-height: 62px;
			border-radius: 50%;
			color: #fff;
			font-size: 12px;
		}
	}
}

	

.community-box {
	top: 112px;
	left: 30px;
	width: 250px;
	height: 44px;
	color: #fff;
	font-size: 24px;
	border-radius:14px;
	background:rgba(0, 0, 0, .2);
	display: flex;
	align-items: center;
	justify-content: space-around;

	.community-text {
		height: 44px;
		line-height: 44px;
		display: inline-block;
	}

	.community-img {
		width: 44px;
		height: 44px;
	}
}

.more-live {
	top: 112px;
	right: 0px;

	.more-live-img {
		width: 216px;
		height: 44px;
	}
}


.good-item {
	bottom: 106px;
	left: 30px;
	width: 480px;
	height: 180px;
	display: block;
	background: #fff;
	border-radius: 14px;

	.good-top {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		background: url('../assets/good-top.png');
		background-size: 100%;
		color: #fff;
		font-size: 24px;

		.good-top-left {
			display: flex;
			align-items: center;

			.good-top-icon1 {
				width: 32px;
				height: 32px;
				margin-left: 30px;
				margin-right: 20px;
			}
		}

		.good-top-right {
			width: 42px;
			height: 42px;
			margin-right: 10px;
		}
		
	}

	.good-bottom {
		width: 100%;
		height: 130px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 24px;
		color: #333333;

		.good-pic {
			width: 100px;
			height: 100px;
			margin: 0px 20px;
		}

		.good-name {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.good-name-price {
			width: 317px;
			height: 100px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;

			.good-price {
				font-size: 18px;
				color: #F64054;

				.good-price-num {
					font-size: 30px;
					font-weight: bold;
				}
			}
		}
	}
}

.live-operator-box {
	bottom: 20px;
	left: 0;
	right: 0;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.coment-box {
		width: 440px;
		height: 76px;
		line-height: 76px;
		font-size: 30px;
		color: #fff;
		box-sizing: border-box;
		padding-left: 20px;
		background:rgba(0, 0, 0, .2);
		border-radius: 14px;
		text-align: left;
		margin-left: 30px;
	}

	.live-operator-btn {
		margin-right: 10px;
		.live-operator-btn-icon {
			width: 76px;
			height: 76px;
			margin-right: 20px;
		}
	}
}

.app-download-dialog {
	z-index: 999;
	left: 0;
	right: 0;
	bottom: 0;
	height: 170px;
	background:rgba(0, 0, 0, 0.8);
	box-sizing: border-box;
	padding: 20px 30px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	.app-info {
		// height: 80px;
		display: flex;
		// flex-direction: column;
		// justify-content: space-between;
		color: #fff;
		font-size: 28px;

		.app-logo {
			width: 80px;
			height: 80px;
			margin-right: 20px;
		}

		.app-download-text {
			display: flex;
			height: 80px;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 6px 0;
		}

		.text-waiting {
			font-size: 12px;
		}
	}

	.app-operator-btn {
		display: flex;
		height: 80px;
		align-items: center;

		.download-btn {
			width: 128px;
			height: 56px;
			text-align: center;
			background: #fff;
			line-height: 58px;
			font-size: 28px;
			border: 1px solid #826ec9;
			border-radius: 10px;
			margin-right: 20px;
		}

		.download-close {
			width: 44px;
			height: 44px;
		}
	}
}
</style>