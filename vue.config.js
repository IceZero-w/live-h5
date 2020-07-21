const path = require('path')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	configureWebpack: {
    resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src/'),
			}
		},
		plugins: [
			// 解决z-index解析异常问题
			new OptimizeCSSPlugin({
				cssProcessorOptions: {
					safe: true
				}
			})
		]
  }
}