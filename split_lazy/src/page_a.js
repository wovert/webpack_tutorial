// 同步加载
import * as _ from 'lodash'

// sub_page_a和sub_page_b的公用模块提取到父模块中
// require.include('./module_common')

var page = 'subPageA'
// 根据页面不同动态加载不同模块
if (page === 'subPageA') {
  // require.ensure([], function () {
  //   var subPageA = require('./sub_page_a')
  // }, 'subPageA')
  import(/* webpackChunkName:'subPageA' */'./sub_page_a')
    .then(function (subPageA) {
      console.log(subPageA)
    })
  
} else if (page === 'subPageB') {
  // require.ensure([], function () {
  //   var subPageB = require('./sub_page_b')
  // }, 'subPageB')
  import(/* webpackChunkName:'subPageB' */'./sub_page_b').
    then(function (subPageB) {
      console.log(subPageB)
    })
}


// 动态加载模块
// require.ensure只会加载代码并不会执行, []异步加载， commonjs加载['lodash']
// require.ensure([], function () {
//   var _ = require('lodash') // 这行代码会执行lodash
//   _.join(['1', '2'], '3')
// }, 'vendor') // chunk名称vendor

export default 'pageA'