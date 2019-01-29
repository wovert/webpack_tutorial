module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   // 给babel-loader 指定presets
          //   presets: [
          //     ['@babel/preset-env', {
          //       targets: {
          //         browsers: ['> 1%', 'last 2 versions']
          //         //chrome: '52'
          //       }
          //     }]
          //   ]
          // }
        },
        exclude: '/node_module/'
      }
    ]
  }
}