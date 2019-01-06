import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { CONFIG } from './constants'
import App from './containers/app'
import configureStore from './state/store'

const element = document.getElementById('app')

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  element,
)
