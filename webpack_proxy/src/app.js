import base from './css/base.less'

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)

$('div').addClass('new')

import { a } from './common/utils'
console.log(a())

import { chunk } from 'lodash-es'
console.log(chunk([1,2,3,4,5,6,7,8,9], 2))

// var url = 'https://weibo.com/aj/v6/comment/big'
var url = '/aj/v6/comment/big'
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
