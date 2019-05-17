
const path = require('path')

// module.exports = {
//   mode: 'development',
//   entry: path.resolve(__dirname, './src/index.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'output.bundle.js'
//   }
// }

module.exports = {
  mode: 'production',
  entry: {
    home: path.resolve(__dirname, './src/home.js'),
    about: path.resolve(__dirname, './src/about.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5400
            }
          }
        ]
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        }  
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}