import '../css/components/a.less'

export function renderA () {
  let a = document.getElementById('one')
  a.innerHTML = `
    <ul>
      <li>1-one</li>
      <li>2-two</li>
      <li>3</li>
    </ul>
  `
}
export function componentA () {
  let ul = document.createElement('ul')
  ul.innerHTML = `
    <ul>
      <li>one-1111</li>
      <li>two</li>
      <li>three</li>
    </ul>
  `
  return ul
}