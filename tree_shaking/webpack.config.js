var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var PurifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js' // 动态输出文件名
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              // insertInto: '#app', // style插入到#app元素下
              singleton: true, // 仅显示一个style标签
            }            
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true, //压缩css代码, 默认false
                // modules: true, //开启css-modules模式, 默认值为flase
                // localIdentName: '[path][name]_[local]_[hash:base64:5]', //设置css-modules模式下local类名的命名
              }
            },
            {
              loader: 'less-loader'
            }
          ]

        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                'lodash',
                // 'dynamic-import-webpack'
              ]
            },
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', // 打包之后的名字
      allChunks: false // 提取指定范围 默认是false 提取初始化的, 异步加载不认为初始化的, true: 所有import的都提取
    }),

    new PurifyCSS({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    }),

    // 打包时，在库中没有用到的代码移除
    new webpack.optimize.UglifyJsPlugin()
  ]
}