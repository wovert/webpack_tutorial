const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9001,
    overlay: true,
    // inline: true, // 默认 true，false: 页面顶部显示打包状态
    // historyApiFallback: true, // 不存在页面重定向到入口页面
    proxy: {
      '/': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug', // 查看接口信息
        pathRewrite: {
          '^/list': '/api/config/list'
        },
        // /msg/index接口提示登录；需要cookie
        headers: {
          'Cookie': '_T_WM=38eac7ad57aa8e1a09f31d501361ba81; WEIBOCN_FROM=1110006030; SUB=_2A25xU8KMDeRhGeBN7FYS8S_Owz2IHXVSv-7ErDV6PUJbkdAKLXP4kW1NRC6B-R19Vyec-ZtFvf4uiRTGO_bIZmvT; SUHB=0tKqRAVnkzFzq7; MLOGIN=1; XSRF-TOKEN=8aaf35; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174'
        }
      }
    },
    hot: true,
    hotOnly: true,
    historyApiFallback: {
      rewrites: [
        {
          // from: '/pages/a',
          // to: '/pages/a.html'
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function (context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    }
  },

  plugins: [
    // 模块热更新效果
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}