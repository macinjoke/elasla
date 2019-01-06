import { AnyAction } from 'redux'
import { Source } from './reducers'

// TODO これいらんかも
export const UPDATE_TEXT = 'UPDATE_TEXT'
export interface UpdateTextAction {
  type: typeof UPDATE_TEXT
  text: string
}
export const updateText = (text: string): UpdateTextAction => ({
  type: UPDATE_TEXT,
  text,
})

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS
  sources: Source[]
}
export const searchSuccess = (sources: Source[]): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  sources,
})

export type Action = UpdateTextAction | SearchSuccessAction
