var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'pageA': './src/page_a',
    'pageB': './src/page_b',
    'vendor': ['lodash']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/', // 动态加载的路径, 打包之后的应该是CDN地址
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  plugins: [

    // 异步加载
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common', // 公共部分提取出来
      children: true, // page_a和page_b的共同，而是两个页面子依赖
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
}