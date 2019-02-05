module.exports = function (css) {
  // 并不是打包的时候执行,而是在style嵌入到HTML的时候执行
  console.log(css)
  console.log(window.innerWidth)
  if (window.innerWidth >= 768) {
    return css.replace('red', 'green')
  } else {
    return css.replace('red', 'orange')
  }
}