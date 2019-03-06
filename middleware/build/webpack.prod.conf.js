const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin') // 提前载入 webpack 加载代码
const CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

module.exports = {
  plugins: [
    new PurifyCSS({
      paths: glob.sync([ // 传入多文件路径
        path.join(__dirname, './*.html'), // 处理根目录下的html文件
        path.join(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    }),
  
    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),    
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // 打包时，在库中没有用到的代码移除
    new webpack.optimize.UglifyJsPlugin(),

    // 指定剔除的目录
    new CleanWebpackPlugin(['dist']),
  ]
}