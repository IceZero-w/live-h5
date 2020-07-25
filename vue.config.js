const path = require('path')

module.exports = {
	lintOnSave: false,
	configureWebpack: {
    resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src/'),
			}
		},
		plugins: [
		]
	},
	// devServer: {
  //   proxy: {
	// 		'/test/':  {
  //       target: 'http://192.168.0.109:8081',
  //       ws: true,
  //       changeOrigin: true
  //     },
	// 	}
  // }
}