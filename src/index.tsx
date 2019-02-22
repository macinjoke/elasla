import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './state/store'

import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
})

const element = document.getElementById('app')

render(
  <Provider store={configureStore()}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>
  </Provider>,
  element,
)
