  // 同步加载lodash
  import * as _ from 'lodash'

  var page = 'subPageB'
  if (page === 'subPageA') {
    import(/* webpackChunkName:'subPageA' */'./sub_page_a')
      .then(function (subPageA) {
        console.log(subPageA)
      })
  } else if (page === 'subPageB') {
    import(/* webpackChunkName:'subPageB' */'./sub_page_b').
      then(function (subPageB) {
        console.log(subPageB)
      })
  }
  export default 'pageB'