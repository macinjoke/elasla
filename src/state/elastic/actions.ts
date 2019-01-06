import { AnyAction } from 'redux'
import { Source } from './reducers'

export interface UpdateTextAction {
  type: 'updateText'
  text: string
}
export const updateText = (text: string): UpdateTextAction => ({
  type: 'updateText',
  text,
})

export interface SearchSuccessAction {
  type: 'searchSuccess'
  sources: Source[]
}
export const searchSuccess = (sources: Source[]): SearchSuccessAction => ({
  type: 'searchSuccess',
  sources,
})
