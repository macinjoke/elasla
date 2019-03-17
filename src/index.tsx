import amber from '@material-ui/core/colors/amber'
import teal from '@material-ui/core/colors/teal'
import {
  createGenerateClassName,
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import { create } from 'jss'
import React from 'react'
import { render } from 'react-dom'
import JssProvider from 'react-jss/lib/JssProvider'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './state/store'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
})

const element = document.getElementById('app')

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
  },
})

render(
  <Provider store={configureStore()}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  </Provider>,
  element,
)
