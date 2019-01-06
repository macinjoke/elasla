import { Client, SearchResponse } from 'elasticsearch'
import { Action, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { CONFIG } from '../../constants'
import { State } from '../store'
import { Source } from './reducers'

export const updateText = (text: string): AnyAction => ({
  type: 'updateText',
  text,
})

export const searchSuccess = (sources: object): AnyAction => ({
  type: 'searchSuccess',
  sources,
})
