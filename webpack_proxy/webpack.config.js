var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var PurifyCSS = require('purifycss-webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin') // 提前载入 webpack 加载代码
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist/',
    publicPath: '/',
    filename: 'js/[name].bundle.[hash:5].js',
    chunkFilename: '[name].bundle.js' // 动态输出文件名
  },

  devServer: {
    port: 9001,
    // inline: true, // 默认 true，false: 页面顶部显示打包状态
    // historyApiFallback: true, // 不存在页面重定向到入口页面
    proxy: {
      '/': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug', // 查看接口信息
        pathRewrite: {
          '^/list': '/api/config/list'
        },
        // /msg/index接口提示登录；需要cookie
        headers: {
          'Cookie': '_T_WM=38eac7ad57aa8e1a09f31d501361ba81; WEIBOCN_FROM=1110006030; SUB=_2A25xU8KMDeRhGeBN7FYS8S_Owz2IHXVSv-7ErDV6PUJbkdAKLXP4kW1NRC6B-R19Vyec-ZtFvf4uiRTGO_bIZmvT; SUHB=0tKqRAVnkzFzq7; MLOGIN=1; XSRF-TOKEN=8aaf35; M_WEIBOCN_PARAMS=lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174'
        }
      }
    },
    historyApiFallback: {
      rewrites: [
        {
          // from: '/pages/a',
          // to: '/pages/a.html'
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function (context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    }
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
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // postcss-cssnext 已经包含autoprefixer所以要注释
                  // require('autoprefixer')(),
                  require('postcss-sprites')({
                    //spritePath: 'dist/assets/imgs/sprites'
                  }),
                  require('postcss-cssnext')()
                ]
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // 'url-loader?limit=1000',
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[name]-[hash:5].[ext][hash:4]',
              // publicPath: '/assets/imgs/',
              // outputPath: '/assets/imgs/',
              useRelativePath: true
            }
          },
          {
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
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name]-[hash:5].[ext]?[hash:4]',
              // publicPath: '/assets/fonts/',
              // outputPath: '/assets/fonts/',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: path.resolve(__dirname, 'src/app.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              $: 'jquery'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // 默认使用img:src
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      },     
    ]
  },

  // 自定义JS库
  resolve: {
    alias: {
      // jquery必须与 下面的webpack.ProvidePlugin 名称一致
      // 告诉webpack 在哪里找到 jquery
      jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
    }
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name]-bundle.[hash:5].css', // 打包之后的名字
      allChunks: false // 提取指定范围 默认是false 提取初始化的, 异步加载不认为初始化的, true: 所有import的都提取
    }),

    new PurifyCSS({
      paths: glob.sync([ // 传入多文件路径
        path.join(__dirname, './*.html'), // 处理根目录下的html文件
        path.join(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    }),

    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',  // 指定生成的文件路径
      template: './index.html',  // 模板文件
      // inject: false // 只有手动载入的资源，不会自动插入打包的资源
      // chunks: [
      //   'app'
      // ],
      minify: {
        collapseWhitespace: true       // 压缩html,借助html-minify包
      }
    }),


    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // 使用npm加载
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),

    // 打包时，在库中没有用到的代码移除
    new webpack.optimize.UglifyJsPlugin(),
    
    // 指定剔除的目录
    new CleanWebpackPlugin(['dist'])
  ]
}

