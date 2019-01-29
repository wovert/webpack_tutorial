# Webpack

## webpack 介绍

### webpack 的诞生

> I'ts funny story how I started with Webpack. Before getting addicted to JavaScript, I also developed in Java. I tried GWT(Google Web Toolkit) in that time. GWT is a Java-toJavaScript Compiler, which has a great feature: code-splitting. I liked this feature and missed it in existing JavaScript tooling. I made a pull reuqest to an existing moudle bundler, but it did not go through. Webpack was born.

- Tobias Koppers (github: @sokra)
- GWT (Google Web Toolkit) 代码分割
- Pull request
- Webpack
- Instagram团队维护

### 为什么需要构建

1. 开发分工变化
  + ![分工](./images/splitting.png)
2. 框架的变化
  + ![框架演变](./images/framework.png)
  + ![前段库的时代](./images/frontend-lib.png)
  + ![MVC的时代](./images/mvc.png)
  + ![MVVM的时代](./images/mvvm.png)
3. 语言的变化
  + ![html history](./images/html_history.png)
  + ![css history](./images/css_history.png)
  + ![JavaScript history](./images/javascript_history.png)
4. 环境的变化
  + ![C/S](./images/env.png)
5. 社区的变化
  + Github
  + npm
6. 工具变化
  + ![工具变化](./images/tools.png)

### 为什么前段需要构建

- 开发复杂化
- 框架去中心化
- 语言编译化
- 开发模块化

### 为什么 webpack

- 前段构建工具：Vue-cli / React-starter / Angular-cli 
- code-splitting 代码分割

### webpack 概述

> A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the paplication on demand. Through "loaers, " modules can be CommonJS, AMD, ES6 modules, CSS, Images, JSON, CoffeeScript, Less, .. and your custom stuff.

### webpack 版本变化

- v1.0.0 - 2014.2.20
  - 编译
  - 打包
  - HMR（模块热更新）
  - 代码分割
  - 文件处理(loader, plugin)
- v2.2.0 - 2017.1.18
  - Tree Shaking (仅打包需要的代码)
  - ES module
  - 动态 Import
  - 新的文档
- v3.0.0 - 2017.6.19
  - Scope Hoisting(作用域提升)
  - Magic Comments(配合动态import使用)
- v4.0.0 - ?

### 版本迁移

- v1 -> v2 
  - 迁移指南：https://webpack.js.org/guides/migrating/
  - 中文版：https://doc.webpack-china.org/guides/migrating/
- v2 -> v2

- 参与社区投票
  - [webpack vote](https://webpack.js.org/vote/)
  
## 内容概要

- 基于 Webpack 3.10+
- 前段整体工作流
- 前段工程化

### webpack

- 基础知识
  - 前段发展历史
  - 模块化开发
- 开发环境
  - 配置 SourceMap 调试
  - 配置远程接口代理
  - 配置动态 entry 更新
  - 配置模块热更新
  - 配置eslint检查代码格式
- 文件处理
  - 编译 ES6/7
  - 编译 TS
  - 编译 less/sass
  - postcss 处理浏览器前缀
  - css nano 压缩CSS
  - 自动生成HTML模板文件
  - 图片压缩和base64编码
  - 自动生成雪碧图
- 打包优化
  - 代码分割和懒加载
  - 提取公用代码
  - Tree-shaking
  - 长缓存配置
- 框架配合
  - vue-cli
  - angular-cli
  - react

## 模块化

- JS 模块化
  - 命名空间
    - 苦名.类别名.方法名
  - CommonJS(Node社区，Server)
  - AMD
  - CMD
  - UMD
  - ESM
    - EcmaScript Module 一个文件一个模块
    - export / import
- CSS 模块化
  - CSS 设计模式
    - ![OOCSS](./images/oocss.png) 内容和容器分离
    - ![SMACSS](./images/smacss.png) 可扩展模块化结构
    - ![MCSS](./images/mcss.png)
    - ![Atomic CSS](./images/automic_css.png)
    - ![AMCSS](./images/amcss.png)
    - ![BEM](./images/bem.png)
  - CSS Modules

### 环境准备

- 命令行工具
  - mac:
    - Terminal
    - [iTerm2](http://ww.iterm2.com)
    - [ohmyz](http://ohmyz.sh)
    - 知乎：mac 下有哪些好用的命令行工具
- node + npm
- webpack
  - `npm install webapck -g`
  - [权限错误解决方案](http://npm.github.io/installation-setup-docs/installing/a-note-on-permissions.html)

## webpack 核心概念

- Entry 打包入口
- Output 输出文件
- Loaders 其他资源文件处理
- Plugins 代码分割，压缩代码等

### Entry

- 代码的入口
- 打包的入口
- 单个或多个

``` js
module.exports = {
  entry: 'index.js'
}

module.exports = {
  entry: ['index.js', 'rendor.js']
}

module.exports = {
  entry: {
    index: ['index.js', 'app.js'],
    vendor: 'vendor.js'
  }
}
```

### Output

- 打包成的文件(bundle)
- 一个或多个
- 自定义规则
- 配合CDN

``` js
module.exports = {
  entry: 'index',
  output: {
    filename: 'index.min.js'
  }
}

module.exports = {
  entry: {
    index: 'index.js',
    vendor: 'vendor,js'
  },
  output: {
    filename: '[name].min.[hash:5].js'
  }
}
```

### Loaders

- 处理文件
- 转化为模块
- 常用 loader
  - 编译相关：babel-loader, ts-loader
  - 样式相关：style-loader, css-loader, less-loader, postcss-loader
  - 文件相关：file-loader, url-loader

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  }
}
```

### Plugins

- 参与打包整个过程
- 打包优化和压缩
- 配置编译时的变量

- 常用 plugins
  - 优化相关
    - CommonsChunkPlugin 相同代码提取一个代码
    - UglifyjsWebpackPlugin 混淆压缩代码
  - 功能相关
    - ExtractTextWebpackPlugin css文件单独提取文件
    - HtmlWebpackPlugin
    - HotModuleReplacementPlugin 热莫名快热更新
    - CopyWebpackPlugin

- 名词
  - Chunk: 代码块
    - 两个页面使用相同的代码，提取一个Chunk
  - Bundle
  - Module

```js
const webpack = requrie('webpack')
module.exports = {
  plugins: [
    // js代码压缩
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

## 使用 webpack 方式

1. webpack 命令
2. webpack 配置
3. 第三方脚手架(vue-cli)

``` sh
$ webpack -h
$ webpack -v
$ webpack <entry> [<entry>] <output>
```

### webpack 配置

```sh
$ webpack
$ webpack --config webpack.config.js
```

### webpack-cli

- 交互式的初始化一个项目
- 迁移项目 v1->v2
- 不推荐使用

```sh
$ webapck-cli init webpack-addons-demo
```

### 打包JS

[打包JS源码](./bundle_js)

1. 命令打包

```sh
$ webpack app.js bundle.js
```
AMD 异步生成单独的 0.bundle.js

2. 配置文件打包

```sh
$ webpack --config webpack.conf.js
```

3. 配置文件打包 - webpack.conf.js 文件修改为 webpack.config.js

```sh
# webpack 自动查找webpacki.config.js 文件作为配置文件执行打包
$ webpack
```

## ES6 打包

### babel

> Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

``` js
// 转码前
input.map(item => item + 1)

// 转码后
input.map(function (item) {
  return item + 1;
});
```

- babel-loader
- babeljs.io

```sh
$ cd bundle_es6
$ npm init
$ npm i babel-loader@8.0.0-beta.0 @babel/core -D

或者不追求最新的babel
$ npm install --save-dev babel-loader babel-core

$ vim app.js
$ vim index.html
$ vim webpack.config.js
```

### babl-presets

- es2015
- es2016
- es2017
- env包括es2016-es2017和最新的latest
  - babel-preset-react
  - babel-preset-stage 0-3 没有正式发布的

```sh
与 $ npm i babel-loader@8.0.0-beta.0 @babel/core -D 匹配
$ npm i @babel/preset-env --save-dev

普通的babel-loader
$ npm i babel-preset-env --save-dev
```

起始preset是loader的参数

```js
use: {
  loader: 'babel-loader',
  options: {
    // 给babel-loader 指定presets
    presets: [
      '@babel/preset-env'
    ]
  }
}
```

`targets`选项可以设置哪些语法可以编译，哪些语法不想编译

- targets
- targets.browsers
  - targets.browers: "last 2 versions" 主流浏览器的最后两个版本支持
  - targets.browers: ">1%" 大于全球1%的浏览器支持
- browerslist 列表（数据来源于Can I use）
- Can I use

```js
presets: [
  ['@babel/preset-env', {
    targets: {
      browsers: ['> 1%', 'last 2 versions']
    }
  }]
]
```

### 配置 .babelrc

> Babel的配置文件`.babelrc`存放在**项目的根目录**下。使用Babel的第一步，就是配置这个文件。用来设置**转码规则**和**插件**

```json
{
  "presets": [],
  "plugins": []
}
```

presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

``` sh
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ],
  "plugins": []
}
```

babel-preset：针对语法编译

函数和方法？babel-polyfill 和 babel-runtime-transform

### 函数和方法

- Generator
- Set
- Map
- Array.from
- Array.prototype.includes

- **Babel polyfill** 垫片（在各种浏览器保持同样的APi）
  - 全局垫片
  - 为应用准备，不是为框架准备
  - 使用方法
    - `npm install babel-polyfill --save`
    - `import "babel-polyfill"`
- **Babel Runtime Transform**
  - 局部垫片
  - 为开发框架准备
  - 使用方法
    - `npm i babel-plugin-transform-runtime --save-dev` 或者 `npm i @babel/plugin-transform-runtime --save-dev`
    - `npm i babel-runtime --save` 或者 `npm i @babel/runtime --save` 最新版本

``` sh
$ npm i babel-polyfill babel-runtime --save
$ npm i babel-plugin-transform-runtime --save-dev
$ vim app.js

  import 'babel-polyfill'

  let func = () => {}
  const NUM = 46
  let arr = [1,2,3]
  let arr2 = arr.map(item => item * 2)

  // 低版本浏览器不支持
  arr.includes(8)
  console.log('new Set(arr2)', new Set(arr2))

  function* func() {}

$ webpack
            Asset    Size  Chunks                    Chunk Names
  app.2efcebe9.js  291 kB       0  [emitted]  [big]  app
    [93] (webpack)/buildin/global.js 910 bytes {0} [built]
  [130] ./app.js 554 bytes {0} [built]
  [329] (webpack)/buildin/module.js 567 bytes {0} [built]
      + 330 hidden modules

  打包生成的文件比较大，因为文件中包含了polyfill（所有的polyfill都在全局作用域下）

```

使用runtime

``` sh
$ vim .babelrc
  {
    "presets": [
      ["@babel/preset-env", {
        "targets": {
          "browsers": ["> 1%", "last 2 versions"]
          //chrome: '52'
        }
      }]
    ],
    "plugins": ["transform-runtime"]
  }

注释options
$ vim webpack.config.js
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

$ webpack

Module build failed: TypeError: this.setDynamic is not a function

$ cnpm i @babel/runtime --save
$ cnpm i @babel/plugin-transform-runtime --save-dev

$ vim .babelrc
  "plugins": ["@babel/transform-runtime"]
$ webpack
```

### 总结: polyfill和runtime

- 应用开发
  - `.babelrc` 配置 `presets`
  - ES6方法和函数 `import babel-polyfill`
- 开发UI组件库
  - ES6的新方法，使用runtime
  - 开发框架给第三方使用，不希望污染全局变量

## 编译 TypeScript

> JS的超集

- 官网： typescriptlang.org/tslang.cn
- Microsoft

### typescript-loader

- 安装
  - 官方：`npm i typescript ts-loader --save-dev`
  - 第三方：`npm i typescript awesome-typescript-loader --save-dev` 缓存机制

- 配置
  - `tsconfig.json`

- `webpack.config.js` 配置

- 配置选项: 官网/docs/handbook/compiler-options.html
- 常用选项：
  - `compilerOptions`
  - `include`
  - `exclude`

``` sh
$ mkdir bundle_ts && cd bundle_ts
$ npm init
$ vim tsconfig.json
  {
    "compilerOptions": {
      "module": "commonjs", // 包含ES6/7 和 commonjs
      "target": "es5", // ts 编译成 es5
      "allowJs": true, // js语法是否可以在ts文件中
    },
    
    "include": [ // 编译哪些目录文件
      "./src/*"
    ],
    
    "exclude": [ // 不编译哪些目录
      "./node_module"
    ]
  }
$ npm i webpack typescript ts-loader awesome-typescript-loader --save-dev
$ mkdir src
$ vim webpack.config.js
  module.exports = {
    entry: {
      app: './src/app.ts'
    },

    output: {
      filename: '[name].bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader'
          }
        }
      ]
    }
  }

$ vim src/app.ts
  const num = 45
  interface Cat {
    name: String
    gender: String
  }
  function touchCat (cat: Cat) {
    console.log('miao~', cat.name)
  }
  touchCat({
    name: 'Tom',
    gender: 'male'
  })

$ webpack

ts中使用es函数
$ npm i lodash --save
$ vim app.ts
  import * as _ from 'lodash'
  console.log(_.chunk([1,2,3,4,5], 2))

```

`lodash`的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。类似immutable.js的理念去处理。
`lodash`是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数

### 声明文件

```sh
$ npm i @types/loadash --save
$ npm i @types/vue --save
```

出错的时候声明文件及时的反馈错误信息

例如：
``` sh
$ vim app.ts
  console.log(_.chunk(2))

编辑之后没有任何信息反馈

安装
$ npm i @types/loadsh --save
$ webpack

提示编译错误: [tsl] ERROR in E:\lingyima\development\webpack_tutorial\bundle_ts\src\app.ts(3,21)
      TS2345: Argument of type '2' is not assignable to parameter of type 'ArrayLike<{}>'.
```

### Typings

全局安装 `npm i typings -g`

项目中：`typings install lodash`

``` sh
$ npm uninstall @types/lodash --save
$ npm i typings -g
$ typings i lodash --save

项目根目录生成 typings.json 文件和 typings目录

$ vim app.ts
  console.log(_.chunk(2))
$ webpack
  没有报错提示

$ vim tsconfig.json
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "allowJs": true,
    "typeRoots": [
      "./node_modules/@type/",
      "./typings/modules"
    ]
  }
  ...
$ webpack
  提示类型错误

```

## 代码中提取公共的文件

