import { initializeIcons } from '@uifabric/icons'
import * as React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { App } from './components/App'

// Used in index.html
require('./assets/img/react_logo.svg')

initializeIcons()

render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'), () => {
})
