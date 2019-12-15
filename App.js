import React  from 'react'
import App from './src/App'

window.oncontextmenu = (event) => {
  event.preventDefault()
  event.stopPropagation()
  return false
}

export default App