import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello.jsx'
import file from './assets/imgs/file.png'
import fileFolder from './assets/imgs/file-folder.png'
import './about.scss'

const about = function () {
  async function getInfo() {
    // const result = await fetch('https://www.baidu.com')
    const result = await fetch(SERVICE_URL)
    console.log(result)
  }
  getInfo()
  console.log('about.js file')
}
// about()

ReactDOM.render(<Hello />, document.getElementById('root'))