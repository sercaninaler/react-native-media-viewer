/* eslint-disable */
import React  from 'react'
import WebFont from 'webfontloader'
import App from './src/App'

window.oncontextmenu = (event) => {
  event.preventDefault()
  event.stopPropagation()
  return false
}

WebFont.load({google: {families: ['Ubuntu Mono']}});

export default App