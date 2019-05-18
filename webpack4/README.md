# Webpack 4

## 新特性

> Node.js 版本必须 >=8.9.4，因为webpack 4 使用很多JS新的语法，它们在新版本的 v8 里经过了优化

- mode 属性
  - 需要设置 mode 属性是 development或production。例如 `webpack --mode developent`

- webpack 针对开发模式提供的特性
  - 浏览器调试工具
  - 注释、开发阶段的信息错误日志和提示
  - 快速和优化的增量构建机制
- webpack 针对生产模式提供的特性
  - 开启所有的优化代码
  - 更小的 bundle 大小
  - 去掉只在开发阶段运行的代码
  - `Scope hoisting` 和 `Tree-shaking`

- 插件和优化
  - webpack 删除了 `CommonsChunkPlugin` 插件，它使用内置 `API optimization.splitChunks` 和 `optimization.runtimeChunk`，这意味着 webpack 会默认为你生成**共享的代码块**
  - `NoEmitOnErrorsPlugin` 废弃 -> 使用 `optimization.noEmitOnErrors` 替代
  - `ModuleConcatenationPlugin` 废弃 -> 使用 `optimization.concatenateModules` 替代
  - `NamedModulesPlugin` 废弃 -> 使用 `optimization.namedModules` 替代
  - `uglifyjs-webpack-plugin` 升级到了 v1.0 版本

- 开箱即用 `webAssembly`
  - WebAssembly(wasm)会带来运行时性能的大幅度提升，由于在社区的热度，webpack 4 对它做了开箱即用的支持。可以直接对本地的`wasm`模块进行 `import`或者`export`操作，也可以通过编写 `loaders` 来直接 `import` **C++**、**C** 或者 **Rust**

- 支持多种模块类型
  - `javascript/auto`: 在 webpack 3里，默认开启对所有模块系统的支持，包括 `CommonJS、ADM、ESM`
  - `javascript/esm`: 支持支 ESM 静态模块
  - `javascript/dynamic`: 只支持 `CommonJS` 和 `AMD` 动态模块
  - `json`: 支持支 JSON 数据，可以通过 `require` 和 `import` 来使用
  - `webassembly/experimental`: 只支持 wasm 模块，目前处于试验阶段

- 0C JS
  - 0配置，webpack 4 受  **Parcel** 打包工具启发，尽可能的让开发者运行项目的成本变低。为了做到0配置，webpack 4 不再强制需要 `webpack.config.js` 作为打包的入口配置文件，它默认的入口为 `./src/` 和默认出口`./dist`，对小项目而言是福音

- 新的插件系统： webpack 4 对插件系统进行了不少修改，提供了针对插件和钩子的新 API
  - 所有的 `hook` 由 `hooks` 对象统一管理，它将所有的 `hook` 作为可扩展的类属性
  - 当添加插件时，必须提供一个插件名称
  - 开发插件时，可以选择 `sync/callback/promise` 作为插件类型
  - 可以通过 `this.hooks = { myHook: new SyncHook(...) }` 来注册 hook

## webpack4 介绍

### 安装 webpack 4

```sh
npm i webpack-cli -g
webpack --mode development src/输入文件.js -o dist/输出文件.js
webpack --mode production src/输入文件.js -o dist/输出文件.js

# 默认输出文件 dist/main.js
webpack --mode development

# 输出的文件移除 console.log 代码
webpack --mode production
```

### webpack loaders

[全栈笔记](https://malun666.github.io/aicoder_vip_doc/#/)

```sh
yarn add file-loader url-loader -D

# babel-loader 8.x | babel 7.x
yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-react-jsx webpack -D

# babel-loader 7.x | babel 6.x
yarn add babel-loader@7 babel-core babel-preset-env webpack -D
yarn add react react-dom


# sass-loader
yarn add style-loader css-loader node-sass sass-loader -D
```

### webpack plugins

- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 插件对打包输出的文件中提取CSS内容输出到.css文件中

```sh
yarn add mini-css-extract-plugin -D
```

### definePlugin

```js
const webpack = require('webpack')
...
  plugins: [
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify('http://www.wovert.com')
    })
  ],
```

### [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

`yarn add html-webpack-plugin@next -D`

### 热替换

[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

```sh
yarn add webpack-dev-server -D

vim package.json
  "start": "webpack-dev-server"
```

`yarn start` 命令会查找 `node_modules` 目录下查找

### webpack 4 升级

1. 先升级 webpack `yarn add webpack@^4 webpack-dev-server@latest -D`
2. 安装 webpack-cli `yarn add webpack-cli@latest -D`
3. 升级 html-webpack-plugin `yarn add html-webpack-plugin@latest -D`
4. 升级 eslint-loader `yarn add eslint-loader@latest -D`
5. 升级 vue-loader `yarn add vue-loader@latest -D`
6. css 模块 `yarn add style-loader@latest  css-loader@latest postcss-loader@latest -D`
7. Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
升级 extract-text-webpack-plugin `yarn add extract-text-webpack-plugin@latest -D` 不好用
升级 extract-text-webpack-plugin 开发版本 `yarn add extract-text-webpack-plugin@next -D`

