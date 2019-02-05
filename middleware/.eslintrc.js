module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html'
  ],
  env: {
    browser: true,
    node: true
  },
  globals: {
    $: true // 全局变量
  },
  rules: {
    indent: ['error', 2],
    'eol-last': ['error', 'never'] // 文件最后一行不空行
  }
}