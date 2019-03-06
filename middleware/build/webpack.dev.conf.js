const webpack = require('webpack')
const proxy = require('./proxy')
const historyApiFallback = require('./historyfallback')

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9001,
    overlay: true,
    hot: true,
    hotOnly: true,

    proxy: proxy,
    historyApiFallback: historyApiFallback
  },

  plugins: [
    // 模块热更新效果
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}