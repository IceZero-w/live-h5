const path = require('path')

module.exports = {
	configureWebpack: {
    resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src/'),
			}
		},
		plugins: [
		]
	},
	devServer: {
    proxy: {
			'/test/':  {
        target: ' http://192.168.74.50:8082',
        ws: true,
        changeOrigin: true
      },
		}
  }
}