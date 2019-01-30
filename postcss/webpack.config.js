var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
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
              transform: './css.transform.js' // 根目录下有css.transform.js
            }            
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true, //压缩css代码, 默认false
                modules: true, //开启css-modules模式, 默认值为flase
                localIdentName: '[path][name]_[local]_[hash:base64:5]', //设置css-modules模式下local类名的命名
                // camelCase: false, //导出以驼峰化命名的类名, 默认false
                // import: true, //禁止或启用@import, 默认true
                // url: true, //禁止或启用url, 默认true
                // sourceMap: false, //禁止或启用sourceMap, 默认false
                // importLoaders: 0, //在css-loader前应用的loader的数目, 默认为0
                // alias: {} //起别名, 默认{}
              }
              // loader: 'file-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // postcss-cssnext 已经包含autoprefixer所以要注释
                  // require('autoprefixer')(),
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]

        })
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', // 打包之后的名字
      allChunks: false // 提取指定范围 默认是false 提取初始化的, 异步加载不认为初始化的, true: 所有import的都提取
    })
  ]
}