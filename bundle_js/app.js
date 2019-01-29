// ESM
import sum from './sum'

// CommoJS
var minus = require('./minus')

// AMD
require(['./multi'], function (multi) {
  console.log('multi(2, 3) = ', multi(2, 3))
})

console.log('sum(23, 24) = ', sum(23, 24))
console.log('minus(23, 10) = ', minus(23, 10))