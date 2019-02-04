import './css/base.less'
// import { renderA } from './components/a'
import { componentA } from './components/a'
import { a } from './common/utils'
import { chunk } from 'lodash-es'

var app = document.getElementById('app')
var one = document.getElementById('one')
var div = document.createElement('div')
div.className = 'littleBox'
app.appendChild(div)
var list = componentA()
one.appendChild(list)
$('div').addClass('new')
console.log(a())
console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 2))
// var url = 'https://weibo.com/aj/v6/comment/big'
// var url = '/aj/v6/comment/big'
var url = '/list'
$.get(url, {
  // ajwvr:6,
  // id: '4180778570984558',
  // from: 'singleWeiBo',
  // __rnd: '1549249279861'
}, function (data) {
  console.log(data)
})

$.get('/msg/index', {
  format: 'cards'
}, function (data) {
  console.log(data)
})

// renderA()

// 强制js热更新
if (module.hot) {
  // module.hot.accept()
  module.hot.accept('./components/a', function () {
    one.removeChild(list)
    let ComponentA = require('./components/a').componentA
    let newList = ComponentA()
    one.appendChild(newList)
    list = newList
  })
}