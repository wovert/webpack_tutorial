const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify('http://www.wovert.com')
    }),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({  // Also generate a test.html
      title: 'Good morning BJ',
      filename: 'test.html',
      template: './src/assets/test.html'
    })

  ],
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
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
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
      },
      {
        test: /\.less$/,
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 必须与output.path 目录匹配
    compress: true,
    port: 8080
  }
}