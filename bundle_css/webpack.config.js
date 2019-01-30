var path = require('path')
module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertInto: '#app', // style插入到#app元素下
              singleton: true, // 仅显示一个style标签
              transform: './css.transform.js' // 根目录下有css.transform.js
            }
          },
          {
            loader: 'css-loader'
            // loader: 'file-loader'
          }
        ]
      }
    ]
  }
}