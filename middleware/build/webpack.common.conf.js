const webpack = require('webpack')
let path = require('path')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let prodConfig = require('./webpack.prod.conf')
let devConfig = require('./webpack.dev.conf')

const generateConfig = env => {

  const extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-bundle-[hash:5].css'
  })

  const scriptLoader  = ['babel-loader']
      .concat(env === 'production'
      ? []
      : [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }]
      )

  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: env === 'development'
      }
    },          
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [
          require('postcss-cssnext')()
        ].concat(
          env === 'production'
            ? require('postcss-sprites')({
              spritePath: 'dist/assets/imgs/sprites',
              retina: true
            })
            : []
        )
      }
    }, 
    {
      loader: 'less-loader',
      options: {
        sourceMap: env === 'development'
      }
    }    
  ]
 
  const styleLoader = env === 'production'
    ? extractLess.extract({
      fallback: 'style-loader',
      use: cssLoaders
    })
    : [{
      loader: 'style-loader'
    }].concat(cssLoaders)

  const fileLoader = env === 'development'
    ? [
        {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          outputPath: 'assets/imgs/',
          }
        }
      ]
    : [{
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        limit: 1000,
        // publicPath: '/assets/imgs/',
        // outputPath: '/assets/imgs/',
        useRelativePath: true
      }
    }]

  return {
    entry: {
      app: './src/app.js'
    },
  
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name]-bundle-[hash:5].js'
    },
  
    resolve: {
      alias: {
        jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
      }
    },
  
    module: {
      rules: [
        {
          test: /\.less$/,
          use: styleLoader
        },
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, '../src')],
          exclude: [path.resolve(__dirname, '../src/libs')],
          use: scriptLoader
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: fileLoader.concat(
            env === 'production'
              ? {
                  loader: 'img-loader',
                  options: {        
                    plugins: [
                      require('imagemin-pngquant')({
                        floyd: 0.5,
                        speed: 2
                      }),
                    ]
                  }
                }
              : []
          )
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: fileLoader
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'img:data-src']
              }
            }
          ]
        }
      ]
    },

    plugins: [
      extractLess,

      new HtmlWebpackPlugin({
        filename: 'index.html',  // 指定生成的文件路径
        template: './index.html',  // 模板文件
        minify: {
          collapseWhitespace: true       // 压缩html,借助html-minify包
        }
      }),

      // 使用npm加载
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}


module.exports = env => {
  let config = env === 'production'
    ? prodConfig
    : devConfig
  return merge(generateConfig(env), config)
}


