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