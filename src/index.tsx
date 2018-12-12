import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { CONFIG } from './constants'

const element = document.getElementById('app')

render(<App />, element)
