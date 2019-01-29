import 'babel-polyfill'

let func = () => {}
const NUM = 46
let arr = [1,2,3]
let arr2 = arr.map(item => item * 2)

// 低版本浏览器不支持
arr.includes(8)
console.log('new Set(arr2)', new Set(arr2))

function* func() {}